import React from 'react'
import Link from 'gatsby-link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faContactCard } from '@fortawesome/free-solid-svg-icons'
const Footer = () => {
  return (
    <div className="footer">

      <div className="footer__col-1">
        <h2>Techy</h2>
        <p>Everything About Tech</p>
      </div>

      <div className="footer__cols">

        <div className="footer__col-2">
          <h3>Pages</h3>
          <Link to="/">About Us</Link>
          <Link to="/all">All</Link>
          <Link to="/gaming">Gaming</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/ai">Ai</Link>
        </div>

        <div className="footer__col-3">
          <form action="">
            <div className="footer__field">
              <FontAwesomeIcon icon={faContactCard}/>
              <input type="text" placeholder="Enter Email"/>
            </div>
            <button>Contact With Us</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Footer