import React, { Fragment } from 'react';
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
      <Fragment>
        {/* @TODO: SIdeNav will go here */}
        <main className="main">{children}</main>
      </Fragment>
    </div>
  );
};

export default MainHome;
