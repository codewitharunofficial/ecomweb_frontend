import React from 'react'
import Header from './Header';
import Footer from './Footer'
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, author, keywords }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} >
      <Helmet>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ flex: '1 0 auto', 
      width: '100%', 
      background: 'linear-gradient(0deg, rgba(34,195,178,1) 13%, rgba(45,170,253,1) 71%)', 
      paddingTop: '80px', // Adjust as needed to match the height of the header
      marginTop: '80px', // Add this to push the main content below the fixed header
      overflowY: 'auto'}}>
        {children}
        <Toaster toastOptions={{duration: 3000, position: 'top-center'}} />
      </main>

      <Footer />

    </div>
  )
}

export default Layout