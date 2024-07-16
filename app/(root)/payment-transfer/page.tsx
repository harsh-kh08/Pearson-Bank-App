import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/appwrite';
import React from 'react'

/* The reason why we don't want to start creating the form within here is because this page would't be 
 able to convert it into client side */
const Transfer = async () => {

    const loggedIn = await getLoggedInUser();
    // console.log(loggedIn)

    // Here accounts array consist of account oject which contains actual bank account, information of loggedin user through pliad using access toekn
    const accounts = await getAccounts({ userId: loggedIn?.$id }); // this loggedIn.$id is database user table id




    // New  Code
    // const currentPage = Number(page as string) || 1;
    // const usernew = await getLoggedInUser();
    // console.log(usernew)
    // const loggedIn = await getUserInfo({ userId: usernew.$id });
    // console.log(loggedIn)
    // // Here accounts array consist of account oject which contains actual bank account, information of loggedin user through pliad using access toekn
    // const accounts = await getAccounts({ userId: loggedIn?.$id });



    if (!accounts) return;






    // Appwrite id is here itemId  which was generated along access token during exchnage of public token with Pliad
    const accountsData = accounts?.data;

    console.log(accountsData);
    return (

        <section className='payment-transfer'>
            <HeaderBox title='Payment Transfer' subtext='Please provide any specific details or notes related to payment transfer' />
            <section className='size-full pt-5'>
                <PaymentTransferForm accounts={accountsData} />
            </section>
        </section>


    )
}

export default Transfer;