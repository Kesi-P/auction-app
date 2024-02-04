"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Client, cacheExchange, fetchExchange,useMutation,gql } from 'urql';
import { useRouter } from "next/navigation";

// const client = new Client({
//   url: 'http://localhost:4000/graphql',
//   exchanges: [cacheExchange, fetchExchange],
// });
export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState('');
  const handleChange = (e:any) => {
    const {  value } = e.target;
    setFormData(value);
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    //const response = await login_regis({name:formData})
    login_regis({name:formData}).then(result => {
      
        console.error('Oh no!', result);
    
    });
    //console.log('res',response)
    localStorage.setItem('username', formData);
    window.dispatchEvent(new Event('storage'))
    router.push("/");
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


    </>
  );
}
