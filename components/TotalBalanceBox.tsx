import { formatAmount } from '@/lib/utils'
import React from 'react'


import AnimatedCounter from './AnimatedCounter'
import { Doughnut } from 'react-chartjs-2'
import DoughnutChart from './DoughnutChart'
// Total
export const TotalBalanceBox = ({accounts=[],totalBanks,totalCurrentBalance}:TotalBalanceBoxProps) => {
  return (
<section className='total-balance'>
<div className='total-balance-chart'>
  {/* Donut Chart */}
<DoughnutChart accounts={accounts}   />

</div>
<div className='flex flex-col gap 6'>
  <h2 className='header-2'>
  Bank Accounts : {totalBanks} 
  </h2>
  <div
  className='flex flex-col gap-2'>
<p className='total-balance-label'>
  Total Current Balance
</p>

<AnimatedCounter amount={totalCurrentBalance} />



{/* To make the total current balance to be shown as counting up when we open the web page,
  we will install npm reac-countup package */}


{/*
Hooks are always used in client components

Some NPM packages or external packages will use client side functionality within themselves (eg. Hooks)
Now we will create a new react component for them and declare use Client above the component

Components in Next.js can be either server or client components:
- Components in the pages directory are all server components by default.
- Use 'use client' to explicitly mark a component as a client component.

*/}



  </div>
</div>
</section>
  )
}



