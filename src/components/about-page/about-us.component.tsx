import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

const AboutUs:React.FC<any> = ({getImgSrc}) => {
  return (
     <div className="about-page__about-us">
          <h2 className="title">Intresting people around world</h2>
          <div className="about-page__about-us-content">
           <div className="about-page__about-us-text">
             <h2 className="title">Meet <span className="purple">new</span> people and develop <span className="purple">passions</span></h2>
             <p>Our team consists of creative people who know their field. Join now and make an appointment</p>
           </div>
           <div className="about-page__about-us-img">
            <GatsbyImage image={getImgSrc('about-image')} alt="bg" />
           </div>
          </div>
        </div>
  )
}

export default AboutUs