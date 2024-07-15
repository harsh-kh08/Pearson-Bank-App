// Route Page
import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import { TotalBalanceBox } from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/appwrite";
import React from "react";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
    const currentPage = Number(page as string) || 1;
    const loggedIn = await getLoggedInUser();
    // console.log(loggedInUser)

    // Here accounts array consist of account oject which contains actual bank account, information of loggedin user through pliad using access toekn
    const accounts = await getAccounts({ userId: loggedIn.$id }); // this loggedIn.$id is database user table id

    if (!accounts) return;


    // Appwrite id is here itemId  which was generated along access token during exchnage of public token with Pliad
    const accountsData = accounts?.data;
    const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

    const account = await getAccount({ appwriteItemId });

    return (
        <section className="home" >
            <div className="home-content" >
                <header className="home-header" >
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.firstName || "guest"
                        }
                        subtext="Access your account an manage transactions efficiently."
                    />

                    <TotalBalanceBox
                        accounts={accountsData}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />
                </header>


                {/* Here, appwriteBankId is the id of the document in database collection */}
                <RecentTransactions accounts={accountsData} transactions={account?.transactions} appwriteItemId={appwriteItemId} page={currentPage} />


            </div>



            < RightSidebar
                user={loggedIn}
                transactions={accounts?.transactions}
                banks={accountsData?.slice(0, 2)}
            />
        </section>
    );
};

export default Home;
