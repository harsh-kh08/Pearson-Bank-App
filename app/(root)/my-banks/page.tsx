import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/appwrite';
import React from 'react'

const MyBanks = async () => {
    const loggedIn = await getLoggedInUser();
    // console.log(loggedIn)

    // Here accounts array consist of account oject which contains actual bank account, information of loggedin user through pliad using access toekn
    const accounts = await getAccounts({ userId: loggedIn?.$id }); // this loggedIn.$id is database user table id


    return (
        <section className='flex'>
            <div className='my-banks'>
                <HeaderBox title='My Bank Accounts' subtext='Effortlessly manage your banking activities.' />

                <div className='space-y-4'>
                    <h2 className='header-2'>
                        Your cards
                    </h2>
                    <div className='flex flex-wrap gap-6'>
                        {accounts && accounts.data.map((account: Account) => (<BankCard key={account.id} account={account} userName={loggedIn?.firstName} showBalance={true} />))}
                    </div>
                </div>

            </div>


        </section>
    )
}

export default MyBanks