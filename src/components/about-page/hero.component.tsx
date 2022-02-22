import React ,{useRef,useEffect} from 'react'
import gsap from 'gsap'
import { GatsbyImage } from 'gatsby-plugin-image'

const Hero:React.FC<any> = ({getImgSrc}) => {


  const animEls = () =>{
    gsap.fromTo('.about-page__title',{x:-100,opacity:0},{x:0,opacity:1,duration:1})
    gsap.fromTo('.about-page__subtitle',
      {
        opacity:0,
        x:20
      },
      {
        x:0,
        delay:0.5,
        opacity:1,
        duration:0.5,
      })
    gsap.fromTo('.about-page__paragraph',
      {
        opacity:0,
        y:20
      },
      {
        y:0,
        delay:1,
        opacity:1,
        duration:0.5,
      })
  }
  
  useEffect(()=>{
    animEls()
  },[])

  return (
    <div className="about-page__hero">
        <GatsbyImage image={getImgSrc('hero-bg')} alt="hero-bg" />
        <div className="about-page__hero-text">
          <h1 className="about-page__title">Techy</h1>
          <h2 className="about-page__subtitle">Best Blog About Newest Technologies Around World</h2>
          <p  className="about-page__paragraph">Scroll down and explore our content. Be on time with newest products. Add amazing content to our website</p>
        </div>
        <div className="about-page__hero-item">
          <GatsbyImage image={getImgSrc('hero-item')} alt="hero-bg" />
        </div>
    </div>
  )
}

export default Hero