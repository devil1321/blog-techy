import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Calendar from '../components/calendar.compoent'
import { PageQueryArticlesArr,PageQueryArticles } from '../interfaces'
import Seo from '../components/seo.component'
import LayoutWithoutAside from '../components/layout-without-aside.component'
import BlogItem from '../components/blog-item.component'

const Home:React.FC<PageQueryArticlesArr> = (props) => {

  const images = props.data.allImageSharp.nodes

    const getImgSrc = (name:string) =>{
      const img = images.find(node  => {
        const image = new RegExp(`${name}`,'gi')
        const { originalName } = node.fluid
        if(originalName.match(name)){
          return node
        }
      })
      const gatsbySrcImg = getImage(img.gatsbyImageData)
      return gatsbySrcImg
    }
  return (
    <LayoutWithoutAside>
      <div className="about-page">
        <Seo title ="About Us" />
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
        <div className="about-page__contact">
          <h2 className="title">Make An Appointment</h2>
          {/* calendarz do wstawienia */}
        </div>
      </div>
    </div>
    </LayoutWithoutAside>
  )
}


export const query = graphql`
  {
    allImageSharp {
      nodes {
        gatsbyImageData(placeholder: BLURRED, formats: WEBP layout: FULL_WIDTH)
        fluid {
          originalName
        }
      }
    }
  }
`

export default Home