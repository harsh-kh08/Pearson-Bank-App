// Actions Function is a folder where we will define all the asynchronous server function or server action

"use server";

import { ID } from "node-appwrite";
import { createAdminClient, getLoggedInUser } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

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

    return parseStringify(session);
  } catch (error) {
    console.error("Error", error);
  }
};

/* The signUpWithEmail function is an async function that takes the form data as an argument. It uses the createAdminClient function to create an admin Appwrite client and then calls the createEmailPasswordSession method on the account object. 
This method takes the email and password as arguments and returns a session object. 
We then set the session secret in a cookie and redirect the user to the account page. */
export const signUp = async (userData: SignUpParams) => {
  try {
    // Here. we will choose open source backend tool Appwrite to create a user account
    const { email, password, firstName, lastName } = userData;
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    // We cannot send objects from the server action to the frontend so that's why we parse it into string
    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error", error);
  }
};
