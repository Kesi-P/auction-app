"use client";
import Image from "next/image";
import React, { useState } from 'react';
import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import Login from './longin';

const client = new Client({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
});

export default function Home() {
    return (
        <Provider value={client}>
    <Login />
  </Provider>
    )
}
