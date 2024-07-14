import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
    PlaidLinkOnSuccessMetadata,
} from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';

/* 

- First we send the request to /link/token/create to create a link token
- Then this link token is passed to is paased to client side to intiliaze the Link
- FYI, Plaid Link is the client-side component that your users will interact with in order to link their accounts to Plaid and
allow you to access their accounts via the Plaid API.



In code, this flow is initiated by creating a link_token and using it to initialize Link. 
The link_token can be configured with the Plaid products you will be using and the countries you will need to support. 
Once the user has logged in via Link, Link will issue a callback containing a public_token, 
which can be exchanged for an access_token via /item/public_token/exchange.


*/

/*
Firstly we will create config for usePlaidLink, which is a hook to create Plaid Link
When using the React SDK, this method is called usePlaidLink and returns an object with four values, open, exit, ready, and error

*/
const PlaidLink = ({ user, variant }: PlaidLinkProps) => {

    const router = useRouter();
    const [token, setToken] = useState('') // It is a useState field which will help us to get token

    useEffect(() => { //This useEffect method is used to fetch token on time

        /* useEffect works in a way that you call callbackFunction and provide a dependency array on when you
         want to call that function */

        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            setToken(data?.linkToken)
        }

        getLinkToken();
    }, []) // No dependency it will be called for one time.



    // When user interacts with Plaid Link component to connect its account with plaid, then pliad returns
    // a public token value oin call back function 

    const onSuccess = useCallback(
        async (public_token: string) => {

            await exchangePublicToken(
                {
                    publicToken: public_token,
                    user // contains user id of user tanle database
                }
            )

            router.push('/')

        },
        [user],
    )






    // The usePlaidLink hook manages Plaid Link creation
    // It does not return a destroy function;
    // instead, on unmount it automatically destroys the Link instance
    const config: PlaidLinkOptions = {
        token,
        onSuccess
    };

    const { open, exit, ready } = usePlaidLink(config);



    return (
        <>

            {variant === 'primary' ? (<Button onClick={() => open()} disabled={!ready} className='plaidlink-primary gradient-background'>
                Connect Bank

            </Button>) : variant === 'ghost' ? (<Button>

                Connect Bank
            </Button>) : (
                <Button>
                    Connect Bank
                </Button>
            )}

        </>
    )
}

export default PlaidLink