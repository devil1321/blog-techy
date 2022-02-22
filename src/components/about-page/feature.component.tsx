import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'



const Feature:React.FC<any> = ({getImgSrc}) => {
  
  return (
      <div className="about-page__feature">
          <h2 className="title">Read reviews from all over the world</h2>
          <div className="about-page__feature-content">
            <div className="about-page__feature-img">
              <GatsbyImage image={getImgSrc('intro-image')} alt="hero-bg" />
            </div>
            <div className="about-page__feature-text">
                <h2 className="title">The <span className="purple">best</span> specialists from the <span className="purple">world</span></h2>
                <p>Our specialists share with you the knowledge they have gained over the years. You are guaranteed a reputable producer absolutely for free</p>
              </div>
          </div>
        </div>
  )
}

export default Feature