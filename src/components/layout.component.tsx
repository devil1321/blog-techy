import React from 'react'
import 'font-awesome/css/font-awesome.min.css';
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