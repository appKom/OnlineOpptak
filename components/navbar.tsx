import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="w-full p-5 text-white" style={{backgroundColor: "rgb(0,84,118)"}}>
        <img src="https://online.ntnu.no/img/online_logo.svg" className='h-[5rem]' />
        
        <nav style={{display: "flex", gap: 40, right: 0}}>
            <Link href="/form/">For søkere</Link>
            <Link href="/committee/">For komiteer</Link>
            <Link href="/applicantoverview/">Oversikt</Link>
        </nav>
    </div>
  )
}

export default Navbar