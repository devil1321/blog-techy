import React,{ useRef } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import '../styles/theme/theme.scss'

import Navbar from './navbar.component'
import Aside from './aside.component'
import Footer from './footer.component'

const Layout = ({children}) => {
  const contRef = useRef()
  return (
    <div className="main-wrapper">
        <Navbar />
        <div className="container" ref={contRef}>
          <div className="container-inner">
            {children}
          </div>
          <Aside ref = {contRef} />
        </div>
        <Footer />
    </div>
  )
}

export default Layout