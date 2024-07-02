import React from 'react'
// We can define types and interfaces in Typescript which are declared in 'types/index.d.ts'
// Here we have define interface for props which will get passed into the components
const HeaderBox = ({type="title" ,title, user,subtext}:HeaderBoxProps) => {
  return (

    <div className='header-box'>
      <h1 className='header-box-title'>{title}
        {type==='greeting'&&
        <span className='text-bankGradient'>
          &nbsp;{user}</span>}
      </h1>
      <p className='header-box-subtext'>{subtext}</p>


    </div>
  )
}

export default HeaderBox