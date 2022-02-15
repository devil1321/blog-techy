import React,{useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Link from 'gatsby-link'

const Navbar:React.FC = ():JSX.Element => {
    
  class Search {
    public searchRef:any;
    constructor(){
      this.searchRef = useRef()
    }
    isOpen = () =>{
      console.log('works')
      this.searchRef.current.style.visibility = 'visible'
      this.searchRef.current.style.opacity = 1
    }
    isClose = () =>{
      this.searchRef.current.style.visibility = 'hidden'
      this.searchRef.current.style.opacity = 0

    }
  }
  
  const SearchUI = new Search
 
  return (
    <div className="navbar">
        <div className="navbar__menu">
          <Link className="navbar__link" to="/">All</Link>
          <Link className="navbar__link" to="/gaming">Gaming</Link>
          <Link className="navbar__link" to="/movies">Movies</Link>
          <Link className="navbar__link" to="/ai">AI</Link>
        </div>
        <div className="navbar__social">
          <i className="fa fa-facebook-square fa-2x"></i>
          <i className="fa fa-twitter fa-2x"></i>
          <i className="fa fa-youtube fa-2x"></i>
          <div className="--search" onClick={()=>{SearchUI.isOpen()}}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </div>
        </div>
        <div className="navbar__search" ref={SearchUI.searchRef}>
          <div className="navbar__search-field">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <input type="text" placeholder="What are you searching for ?"/>
          </div>
          <div className="navbar__close-btn --close" onClick={()=>{SearchUI.isClose()}}>
            <span></span>
            <span></span>
          </div>
        </div>
    </div>
  )
}

export default Navbar