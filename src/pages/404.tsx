import { Link } from 'gatsby'
import React from 'react'
import LayoutWithAside from '../components/layout-with-aside.component'
const NotFound = () => {
  return (
    <LayoutWithAside>
        <div className="not-found">
          <div className="not-found__content">
            <h1>Page Not Found</h1>
            <p>We cannot find this page</p>
            <Link to="/">Back to home</Link>
          </div>
        </div>
    </LayoutWithAside>
  )
}

export default NotFound