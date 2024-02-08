"use client";
import Image from "next/image";
import React, { useState } from 'react';
//import { Client, cacheExchange, fetchExchange,useMutation,gql } from 'urql';
import { useMutation } from '@apollo/client';
import { useRouter } from "next/navigation";
import { useLoginRegisMutation,LoginRegisMutation,GatAllUseraDocument } from '../../generated/graphql'
// const client = new Client({
//   url: 'http://localhost:4000/graphql',
//   exchanges: [cacheExchange, fetchExchange],
// });
export default function LoginRegis() {
  const router = useRouter();
  const [formData, setFormData] = useState('');

  // Fetch data from GraphQL
  const [loginRegis] = useLoginRegisMutation();

  const handleChange = (e:any) => {
    const { value } = e.target;
    setFormData(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      const { data } = await loginRegis({
        variables: { name: formData },
        update: (store, { data }) => {
          const userData = store.readQuery<any>({
            query: GatAllUseraDocument
          });
  
          store.writeQuery({
            query: GatAllUseraDocument,
            data: {
              users: data!.login_regis.id
            }
          });
        }
      });
  
      console.log('Data from loginRegis mutation:', data);
  
      // Assuming data contains the login_regis.id you want to store
      localStorage.setItem('userId', data?.login_regis.id);
      router.push('/seller');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <h1>Welcome</h1>
      <div className="relative flex place-items-center">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              name="username"
              value={formData}
              onChange={handleChange}
              type="text"
              placeholder="Enter your username"
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
