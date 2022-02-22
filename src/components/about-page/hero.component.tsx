import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

const Hero:React.FC<any> = ({getImgSrc}) => {
  
  return (
    <div className="about-page__hero">
        <GatsbyImage image={getImgSrc('hero-bg')} alt="hero-bg" />
        <div className="about-page__hero-text">
          <h1>Techy</h1>
          <h2>Best Blog About Newest Technologies Around World</h2>
          <p>Scroll down and explore our content. Be on time with newest products. Add amazing content to our website</p>
        </div>
        <div className="about-page__hero-item">
          <GatsbyImage image={getImgSrc('hero-item')} alt="hero-bg" />
        </div>
    </div>
  )
}

export default Hero