// This component will render on client side after all other components get rendered on client side.
//  Componens using hooks becomes client react components as they will get directly rendered on browser instead of
// getting rendered on client side.


'use client';

import React from 'react'
import CountUp from 'react-countup'
const AnimatedCounter = ({amount}:{amount:number}) => {
  return (
    <div className='w-full'>
      <p className='total-balance-amount flex-center gap-2'>
<CountUp decimal='.' prefix='$'end={amount} decimals={2} />
</p>

    </div>
  )
}

export default AnimatedCounter