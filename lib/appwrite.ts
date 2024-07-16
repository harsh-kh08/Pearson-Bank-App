// src/lib/server/appwrite.js
"use server";
import { Client, Account, Users } from "node-appwrite";
import { cookies } from "next/headers";
import { Databases } from "node-appwrite";
import { parseStringify } from "./utils";
import { redirect } from "next/dist/server/api-utils";
import { getUserInfo } from "./actions/user.actions";

// This will return the the instance of Appwrite cliet and return a object of Account classwhich provides certain methods.
export async function createSessionClient() {
  /* Here what we are doing is that we are creating an Appwrite Client and
  setting up its endpoints and project so that client knows exactly which appwrite project it should modify
  */
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}
// CreateAdminClient will return a AppWrite Client Instance or current account of logged in Uer with settings of client configured
// This will return a account instance of the Account class by using which we can create new Account.
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!); // Use to create admin client with secret key

  return {
    get account() {
      return new Account(client);
    },

    get database() {
      return new Databases(client);
    },

    get user() {
      return new Users(client);
    },
  };
}

// We have created two server action which will fetch sessions both for the regular user and for admin
// which allows are api to do whatever it want with it.

// ... your initilization functions

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();
    // console.log("this is Appwrite User :", result);
    const user = await getUserInfo({ userId: result.$id });
    return parseStringify(user);

    // // New Code
    // const { account } = await createSessionClient();
    // const result = await account.get();
    // // console.log("this is Appwrite User :", result);

    return parseStringify(result);
  } catch (error) {
    return null;
  }
}

export const logoutAccount = async () => {
  const { account } = await createSessionClient();

  cookies().delete("appwrite-session");
  await account.deleteSession("current");
  // We create email-password unique session using account instance and we delete this session using account instance.
  return null;
};
