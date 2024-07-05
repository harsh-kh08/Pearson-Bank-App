// Route Page
import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import { TotalBalanceBox } from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
    const loggedIn = {
        firstName: "Harsh",
        lastName: "Khandelwal",
        email: "harshkhandelwal08052000@gmail.com",
    };
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
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1234.8}
                    />
                </header>
                TRANSACTION
            </div>



            < RightSidebar
                user={loggedIn}
                transactions={[]}
                banks={[{ currentBalance: 123.50 }, {}]}
            > </RightSidebar>
        </section>
    );
};

export default Home;
