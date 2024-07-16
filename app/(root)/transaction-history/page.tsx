import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination';
import TransactionTable from '@/components/TransactionTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/appwrite';
import { formatAmount } from '@/lib/utils';
import React from 'react'

const TransactionHistory = async ({ searchParams: { id, page } }: SearchParamProps) => {

    const currentPage = Number(page as string) || 1;
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
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

    const account = await getAccount({ appwriteItemId });


    const rowsPerPage = 10;
    const totalPages = Math.ceil(account?.transactions.length / 10);

    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

    const currentTransactions = account?.transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);





    return (
        <div className='transactions'>
            <div className='transactions-header'>
                <HeaderBox title='Transaction History' subtext='See your bank  and transactions' />
            </div>
            <div className='space-y-6'>
                <div className='transactions-account gradient-background'>
                    <div className=' flex flex-col gap-2'>
                        <h2 className='text-18 font-bold text-white'>{account?.data.name}</h2>
                        <p className='text-14 text-blue-25'>
                            {account?.data.officialName}
                        </p>
                        <p className='text-14 font-semibold tracking-[1.1px] text-white'>
                            ●●●● ●●●● ●●●●	 <span className='text-16'>{account?.data.mask}</span>
                        </p>
                    </div>

                    <div className='transactions-account-balance'>
                        <p className='text-14'>Currrent balance</p>
                        <p className='text-24 text-center font-bold'>
                            {formatAmount(account?.data.currentBalance)}
                        </p>
                    </div>

                </div>

                <section className='flex w-full flex-col gap-6'>
                    <TransactionTable transactions={currentTransactions} />
                    {totalPages > 1 && (<div className='my-4 w-full'>

                        <Pagination totalPages={totalPages} page={currentPage} />
                    </div>)}
                </section>

            </div>


        </div>
    )
}

export default TransactionHistory