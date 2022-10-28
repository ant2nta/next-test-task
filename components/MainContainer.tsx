import Head from 'next/head';
import React from 'react';
import A from './A';

export default function ({children}) {
  return (
    <>
      <Head>
        <title>Next test task</title>
      </Head>

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{paddingLeft: 20}}>
        <A href={'/'} text='Home' />
        <A href={'/users'} text='Users' />
      </nav>

      <div>
        {children}
      </div>
    </>
  );
};
