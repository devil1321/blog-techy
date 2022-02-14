import React from 'react'
import '../styles/theme/theme.scss'
import Navbar from './navbar.component'
import Aside from './aside.component'
import Footer from './footer.component'
const Layout = ({children}) => {
  return (
    <div className="main-wrapper">
        <Navbar />
        <div className="container">
          <div className="container-inner">
            {children}
          </div>
          <Aside />
        </div>
        <Footer />
    </div>
  )
}

export default Layout