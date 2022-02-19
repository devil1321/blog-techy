import React,{ useRef } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import '../styles/theme/theme.scss'

import Navbar from './navbar.component'
import Aside from './aside.component'
import Footer from './footer.component'

const LayoutWithoutAside = ({children}) => {
  return (
    <div className="main-wrapper">
        <Navbar />
        <div className="container-about">
              {children}
        </div>
        <Footer />
    </div>
  )
}

export default LayoutWithoutAside