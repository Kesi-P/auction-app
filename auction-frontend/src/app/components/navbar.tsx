"use client"
import React, { useEffect ,useState, useLayoutEffect} from "react";
import { useRouter } from "next/navigation";

export default function NavBar()  {
  const router = useRouter();
    const [logIn, setlogIn] = useState(false);

    useEffect(() => {
        // Perform localStorage action
        const item = localStorage.getItem('userId')
        if(item != null){
            setlogIn(true)
        }
      }, [])
      
      const userLoggout=() =>{
        localStorage.removeItem("userId");
        setlogIn(false)
      }
    return (
        <nav className="flex items-center justify-between flex-wrap bg-brown-500 p-6">
  <div className="flex items-center flex-shrink-0 text-black mr-6">
    <span className="font-semibold text-xl tracking-tight">Auction App</span>
  </div>
  <div className="block lg:hidden">
    <button className="flex items-center px-3 py-2 border rounded text-brown-200 border-brown-400  hover:border-white">
      <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  {logIn &&
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div className="text-sm lg:flex-grow">
      <a  className="block mt-4 lg:inline-block lg:mt-0 text-brown-200  mr-4" onClick={() => router.push('/buyer')}>
        Buyer
      </a>
      <a  className="block mt-4 lg:inline-block lg:mt-0 text-brown-200 mr-4" onClick={() => router.push('/seller')}>
        Seller
      </a>
      
    </div>
    <div>
      <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black  hover:bg-white mt-4 lg:mt-0" onClick={userLoggout}>Logout</a>
    </div>
  </div>
}
</nav>
    )
}