"use client"
import React, { createContext, useContext } from 'react';
// import type { Metadata } from "next";
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { ApolloProvider } from '@apollo/client';
import NavBar from "./components/navbar";
import "./globals.css";
import client from './apolloClient';

// Define your Apollo Client instance
// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache(),
// });

// // Define your metadata
// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// Create the AppContext with a default value
const AppContext = createContext({ client });

// Define a custom hook to consume the AppContext
export const useAppContext = () => useContext(AppContext);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ApolloProvider  client={client}>
      <html lang="en">
        <body>
          <NavBar />
          <main className="flex min-h-screen flex-col items-center  p-24">
            {children}
          </main>
        </body>
      </html>
    </ApolloProvider>
  );
}
