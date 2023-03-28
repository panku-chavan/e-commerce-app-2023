import React from 'react'
import Footer from './Footer'
import Header from './Header'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
//import { Toaster } from 'react-hot-toast';


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />


        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minBlockSize: "70vh" }}>
        {/* <Toaster /> */}
        <ToastContainer />
        {children}
      </main>
      <Footer />
    </div>
  )
};

Layout.defaultProps = {
  title: "E-Commerce app",
  description: "Mern Stack Project",
  keywords: "mern,react,node,mongodb",
  author: "panku-chavan"
}

export default Layout