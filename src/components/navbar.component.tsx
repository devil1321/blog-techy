import React,{useRef,useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Link from 'gatsby-link'
import { useStaticQuery, graphql } from "gatsby"
import { SearchNode } from '../interfaces'

interface NavbarMatchesState {
    title:string;
    url:string;
}

const Navbar:React.FC = ():JSX.Element => {
  const [matches,setMatches] = useState<NavbarMatchesState[]>([])

  const data:SearchNode = useStaticQuery(graphql`
  {
    allContentfulArticles(filter: {node_locale: {eq: "en-US"}}) {
      nodes {
        title
        url
      }
    }
  }
`)
  

  class Search {
    public searchRef:any;
    public searchItemsRef:any;
    public inputRef:any;
    constructor(){
      this.searchItemsRef = useRef()
      this.inputRef = useRef()
      this.searchRef = useRef()
    }
    isOpen = () =>{
      console.log('works')
      this.searchRef.current.style.visibility = 'visible'
      this.searchRef.current.style.opacity = 1
    }
    isClose = () =>{
      setMatches([])
      this.inputRef.current.value = ''
      this.searchRef.current.style.visibility = 'hidden'
      this.searchRef.current.style.opacity = 0

    }
    isMatch = (e) => {
      if(e.target.value.length > 0){
        const tempMatches = data.allContentfulArticles.nodes.filter(item => {
          const matchRegExp = new RegExp(`^${e.target.value}`,'gi')
          return item.title.match(matchRegExp)
        })
        setMatches(tempMatches)
      }else{
        setMatches([])
      }        
    }
  }
   
  
  const SearchUI = new Search
 
useEffect(()=>{
},[])
  return (
    <div className="navbar">
        <div className="navbar__menu">
          <Link className="navbar__link" to="/">About Us</Link>
          <Link className="navbar__link" to="/all">All</Link>
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
            <input ref={SearchUI.inputRef} type="text" placeholder="What are you searching for ?" onInput={(e)=>{
              SearchUI.isMatch(e)
            }
            }/>
          </div>
          <div className="navbar__close-btn --close" onClick={()=>{SearchUI.isClose()}}>
            <span></span>
            <span></span>
          </div>
        </div>
        {matches.length > 0 && 
        <div className="navbar__search-items" ref={SearchUI.searchItemsRef}>
          {matches.map((match:NavbarMatchesState)=>{
            return <Link to={match.url}>
                      <div className="navbar__match-result">{match.title}</div>
                   </Link>
          })}
        </div>}
    </div>
  )
}

export default Navbar