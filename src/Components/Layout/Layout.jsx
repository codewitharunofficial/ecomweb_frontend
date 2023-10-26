import React from 'react'
import Header from './Header';
import Footer from './Footer'
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, author, keywords }) => {
  return (
    <div>
      <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ width: '100%', height: 'auto', background: 'linear-gradient(0deg, rgba(34,195,178,1) 13%, rgba(45,170,253,1) 71%)', minHeight: '90vh', marginTop: '20px' }}>
        {children}
        <Toaster toastOptions={{duration: 3000, position: 'top-center'}} />
      </main>

      <Footer />

    </div>
  )
}

export default Layout