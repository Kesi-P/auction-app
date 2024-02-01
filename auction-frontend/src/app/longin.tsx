"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Client, cacheExchange, fetchExchange,useMutation,gql } from 'urql';

// const client = new Client({
//   url: 'http://localhost:4000/graphql',
//   exchanges: [cacheExchange, fetchExchange],
// });
export default function Login() {
  const [formData, setFormData] = useState('');

  const handleChange = (e:any) => {
    const {  value } = e.target;
    setFormData(value);
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const response = await login_regis({name:formData})
    console.log('name',formData)
  }
  //fech data from graphql
  const [,login_regis] = useMutation(`
    mutation LoginRegis($name: String!) {
      login_regis(input:{name: $name}) {
          id
          name
        }
      }`)
  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Auction App
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <h1>Logout</h1>
         
        </div>
      </div>
      <h1>Welcome</h1>
      <div className="relative flex place-items-center" >
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
  <div className="flex items-center border-b border-teal-500 py-2">
    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
     name="username"
    value={formData}
     onChange={handleChange}
     type="text"
     />
    <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" 
    type="submit">
      Subscribe / Login
    </button>
    
  </div>
</form>
      </div>


    </main>
    </>
  );
}
