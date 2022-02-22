import React,{ useEffect } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import Calendar from '../components/calendar.compoent'
import { PageQueryArticlesArr,PageQueryArticles } from '../interfaces'
import Seo from '../components/seo.component'
import LayoutWithoutAside from '../components/layout-without-aside.component'
import BlogItem from '../components/blog-item.component'
import CalendarComp from '../components/calendar.compoent'
import Hero from '../components/about-page/hero.component'
import Feature from '../components/about-page/feature.component'
import Cards from '../components/about-page/cards.component'
import Contact from '../components/about-page/contact.component'
import AboutUs from '../components/about-page/about-us.component'

interface GetImgSrcFn{
  (name:string):IGatsbyImageData
}

const Home:React.FC<PageQueryArticlesArr> = (props) => {

  const images = props.data.allImageSharp.nodes

    const getImgSrc:GetImgSrcFn = (name:string) =>{
      const img = images.find(node  => {
        const image = new RegExp(`${name}`,'gi')
        let { originalName } = node.fluid
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
        <Hero getImgSrc={getImgSrc} />
        <Feature getImgSrc={getImgSrc} />
        <Cards  getImgSrc={getImgSrc} />
        <AboutUs getImgSrc={getImgSrc} />
        <Contact  />
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