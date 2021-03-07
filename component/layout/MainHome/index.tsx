import React from 'react';
import Head from 'next/head';

interface Props {
  children: React.ReactNode;
  titile: string;
}

const MainHome = ({ children, titile }: Props) => {
  return (
    <div className="app">
      <Head>
        <title>My Online Shop | {titile}</title>
      </Head>
      {/* @TODO: MainNav will go here */}
      <div className="wrapper">
        {/* @TODO: SIdeNav will go here */}
        <main className="main">{children}</main>
      </div>
    </div>
  );
};

export default MainHome;
