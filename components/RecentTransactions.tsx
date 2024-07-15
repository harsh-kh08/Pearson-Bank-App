import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionTable from './TransactionTable'

// Here transactions props is a transaction of single account of the user.
//Accounts are all list of accounts associated with user
const RecentTransactions = ({ accounts, transactions, appwriteItemId, page }: RecentTransactionsProps) => {
    return (
        <section className='recent-transactions'>
            <header className='flex items-center justify-between'>
                <h2 className='recent-transactions-label'>
                    RECENT TRANSACTIONS
                </h2>
                <Link href={`/transaction-history/?id=${appwriteItemId}`} className='view-all-btn'>
                    View all
                </Link>
            </header>

            <Tabs defaultValue={appwriteItemId} className="w-full">
                <TabsList className='recent-transactions-tablist'>
                    {accounts.map((account: Account) => (<TabsTrigger key={account.id} value={account.appwriteItemId}><BankTabItem account={account} appwriteItemId={account.appwriteItemId} /></TabsTrigger>))}
                </TabsList>
                {accounts.map((account) => <TabsContent key={account.id} value={account.appwriteItemId}>
                    <BankInfo account={account} appwriteItemId={account.appwriteItemId} type="full" />
                </TabsContent>)}

                <TransactionTable transactions={transactions} />

            </Tabs>

        </section>
    )
}

export default RecentTransactions