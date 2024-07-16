// Actions Function is a folder where we will define all the asynchronous server function or server action

"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, getLoggedInUser } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { Languages } from "lucide-react";
import { pliadClient } from "../plaid";
import BankCard from "@/components/BankCard";
import { revalidatePath } from "next/cache";
import { parse } from "path";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";
import { stringify } from "querystring";
const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();
    const user = await database?.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (userData: signInProps) => {
  try {
    // Mutation / Database / Fetch
    const { email, password } = userData;
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    // Session created during login time contains userId of 'Apprite Users registered Account' not the 'users' collection of appwrite database

    const user = await getUserInfo({ userId: session.userId }); // This 'getUserInfo' will fetches real user
    // data from database using userId of registred account(Account.get()) in appwrite.

    return parseStringify(user);
  } catch (error) {
    console.error("Error", error);
  }
};

/* The signUpWithEmail function is an async function that takes the form data as an argument. It uses the createAdminClient function to create an admin Appwrite client and then calls the createEmailPasswordSession method on the account object. 
This method takes the email and password as arguments and returns a session object. 
We then set the session secret in a cookie and redirect the user to the account page. */

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;
  let newUserAccount;
  try {
    // Here. we will choose open source backend tool Appwrite to create a user account

    const { account, database } = await createAdminClient(); //returns object for Account Class and Database Class
    //This will create a new  appWrite login user in during SignUp using Account Class
    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    if (!newUserAccount) throw new Error("Error creating user");

    // Create Dwolla Platform Customer
    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
    });

    if (!dwollaCustomerUrl) throw new Error("Error creating Dwolla customer");

    // Fetch dwollaCustomerId from dwollaCustomerUrl
    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
    // Add this new user in databse user table
    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl,
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    // We cannot send objects from the server action to the frontend so that's why we parse it into string
    return parseStringify(newUser);
  } catch (error) {
    console.error("Error", error);
  }
};

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };
    const response = await pliadClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.log(error);
  }
};

// Here we are creating a bank account as document in databse
// Here document means an entry which is in form of json object - NoSQL
export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient(); // use to get the access of object of type Databases

    const bankAccount = database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }
    );

    return parseStringify(bankAccount);
  } catch (error) {
    console.log(error);
  }
};

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange Public Token for access Token and itemID
    const response = await pliadClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response?.data.access_token;
    const itemId = response?.data.item_id;

    // Get registered bank account information from Plaid using the access token
    const accountResponse = await pliadClient.accountsGet({
      access_token: accessToken,
    });

    // It is used to fetch data for the bank account connected to Plaid
    const accountData = accountResponse?.data.accounts[0];

    // When we get the account information using Plaid.accountsGet , the account data also contains shareable id or acount is in encrypted form
    // which is shareable to others and to which we can send our money.

    /* 
    
    Now using access token and account data , we can create a processor token for dwolla
Dwolla is a payment processor which is used for processing money betweeen diferent bank accounts

*/

    /*  Create a processor token for Dwolla using the access token and accout ID */

    // We will create a request for processor token
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await pliadClient.processorTokenCreate(
      request
    );
    const processorToken = processorTokenResponse.data.processor_token;

    /* 
    Create a funding source URL for the specific account using the Dwolla customer ID, 
    processor token and bank name

Creation of funding source URL of specific account is like - Connecting the payment processing functionality to specific
bank account so that it can send and receive funds.

Adding a funding source in Dwolla means linking a bank account to a user's profile within dwolla system. 
This allows users to send or receive payments via ACH transfers.

    */

    /*

In Dwolla, the creation of a funding source URL refers to the API end point used to add a bank account
or other funding sources to a customer's account. This allows the customers to initiate 
ACH transfers (Automated Clearing House Transactions) using the linked bank account.

*/
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user?.dwollaCustomerId,
      processorToken,
      bankName: accountData?.name,
    });

    // If the funding source url is not been created, throw an error

    if (!fundingSourceUrl) throw Error;

    // If a funding source exsist, we will create a bank account

    // Create a bank account using the user ID, item ID, account ID, access Token, funding source url, and sharable ID

    // We will create a bank account so that user can transfer money between different accounts

    // This createbankAccount is a server action

    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect changes
    revalidatePath("/");

    // Once the bank is created and changes get reflected return a success message

    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.log(error);
  }
};

// Databse query to get banks account with help of userId of registered SignUp User
export const getBanks = async ({ userId }: getBanksProps) => {
  try {
    const { database } = await createAdminClient();
    const banks = await database?.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(banks?.documents);
  } catch (error) {
    console.log(error);
  }
};

// Databse query to get a bank account with help of documentId of of the bank account document
export const getBank = async ({ documentId }: getBankProps) => {
  try {
    const { database } = await createAdminClient();
    const banks = await database?.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("$id", [documentId])]
    );

    return parseStringify(banks?.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getBankByAccountId = async ({
  accountId,
}: getBankByAccountIdProps) => {
  try {
    const { database } = await createAdminClient();
    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("accountId", [accountId])]
    );

    if (bank.total != 1) {
      return null;
    }
    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error);
  }
};
