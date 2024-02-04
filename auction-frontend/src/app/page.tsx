"use client";
import Image from "next/image";
import React, { useState,useEffect } from 'react';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import LoginRegis from './components/loginRegis'
import Buyer from "./components/buyer";
import { useRouter } from "next/navigation";

const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange], //refresh automatically
});

export default function Home() {
  const router = useRouter();
  const [logIn, setlogIn] = useState(false);
    useEffect(() => {
      //router.push('/')
        // Perform localStorage action
        const item = localStorage.getItem('userid')
        if(item != null){
            setlogIn(true)
        }
      }, [logIn])
    
      console.log('page',logIn)
   
      
    return (
      
        <Provider value={client}>
          {logIn ? <Buyer />: <LoginRegis />}
  </Provider>
    )
}
