"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useLoginRegisMutation, GatAllUseraDocument } from '../../generated/graphql';

export default function LoginRegis() {
  const router = useRouter();
  const [formData, setFormData] = useState('');

  // Fetch data from GraphQL using useMutation hook
  const [loginRegis] = useLoginRegisMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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


      // Store the user ID in local storage
      localStorage.setItem('userId', data?.login_regis.id);
      // Redirect to the seller page after successful login
      router.push('/seller');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // Render the LoginRegis component
  return (
    <>
      <h1 className='xl'>Welcome</h1>
      <div className="relative flex place-items-center">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="flex items-center border-b border-brown-500 py-2">
            <input
              className="shadow appearance-none border rounded w-full  text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              name="username"
              value={formData}
              onChange={handleChange}
              type="text"
              placeholder="Enter your username"
            />
            <button
              className="flex-shrink-0 bg-brown-500 hover:bg-brown-700 border-black-500 hover:border-brown-700 text-sm border-4 text-black py-1 px-2 rounded"
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
