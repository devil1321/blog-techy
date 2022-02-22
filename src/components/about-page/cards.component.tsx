import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'



const Cards:React.FC<any> = ({getImgSrc}) => {
  
  return (
    <div className="about-page__card-group-wrapper">
          
    <h2 className="title">You have opportunities with us</h2>
  <div className="about-page__card-group">
    <div className="about-page__card">
      <div className="about-page__icon">
        <GatsbyImage image={getImgSrc('ux-ui-icon')} alt="icon" />
      </div>
      <div className="about-page__card-body">
        <h3>Programs Reviews</h3>
        <p>As a company, we also carry out program reviews</p>
      </div>
    </div>
    <div className="about-page__card">
      <div className="about-page__icon">
        <GatsbyImage image={getImgSrc('case-icon')} alt="icon" />
      </div>
      <div className="about-page__card-body">
        <h3>Work possibility</h3>
        <p>After registration you have the opportunity to work for us</p>
      </div>
    </div>
    <div className="about-page__card">
      <div className="about-page__icon">
        <GatsbyImage image={getImgSrc('hands-icon')} alt="icon" />
      </div>
      <div className="about-page__card-body">
        <h3>Contact</h3>
        <p>In contact all day long, whenever you need to</p>
      </div>
    </div>
  </div>
  <div className="about-page__card-group-bg">
      <GatsbyImage image={getImgSrc('cards-bg')} alt="bg" />
  </div>
</div>
  )
}

export default Cards