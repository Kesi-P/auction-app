"use client";
import Image from "next/image";
import React, { useState,useEffect } from 'react';
import LoginRegis from './components/loginRegis'
import Buyer from "./components/buyer";
import { useRouter } from "next/navigation";
import  RootLayout from './layout';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client'

// const client = new Client({
//   url: 'http://localhost:4000/graphql',
//   exchanges: [cacheExchange, fetchExchange], //refresh automatically
// });

// Create ApolloClient instance
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache(),
// });
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
       <>
       {/* <React.StrictMode>
    <RootLayout>
     <LoginRegis />
    </RootLayout>
  </React.StrictMode> */}
  <LoginRegis />
       </>
    )
}
