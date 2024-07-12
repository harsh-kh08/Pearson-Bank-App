import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

// Setting up the configuration for Plaid Client and creating a Plaid CLient
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

// Plaid Client was build to perform server action
export const pliadClient = new PlaidApi(configuration);
