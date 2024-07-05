// Route Page
import HeaderBox from "@/components/HeaderBox";
import { TotalBalanceBox } from "@/components/TotalBalanceBox";
import React from "react";

const Home = ()=>
{
    const loggedIn = {name:"Harsh"};
    return(

        <section className="home">
            <div className="home-content">
                <header className="home-header">
<HeaderBox 
type="greeting" title="Welcome" user={loggedIn?.name||"guest"}
subtext="Access your account an manage transactions efficiently." />
             
<TotalBalanceBox accounts={[]} totalBanks = {1} totalCurrentBalance={1234.8} />
</header>
            </div>

        </section>

        
   

    )
}

export default Home;
