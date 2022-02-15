import React from 'react'
import Seo from '../components/seo.component'
import Layout from '../components/layout.component'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { PageQueryArr } from '../interfaces'

const Home:React.FC<PageQueryArr> = ({data}):JSX.Element => {
  console.log({data})
  // const image = getImage(data.allContentfulArticles.nodes[0].img)
  return (
    <Layout>
      <div className="home-page">
        <Seo title ="Technology | Blogs" /> 
        home page
        {/* <GatsbyImage image={image} alt={"test"} /> */}
      </div>
    </Layout>
  )
}


export const query = graphql`
  {
    allContentfulArticles {
      nodes {
        id
        category
        title
        subtitle
        url
        date(formatString: "")
        img {
          gatsbyImageData(layout: CONSTRAINED, formats: WEBP, placeholder: BLURRED)
        }
        author {
          id
          authorName
          authorEmail
          dateOfBirth
          userImage {
            gatsbyImageData(layout: CONSTRAINED, formats: WEBP, placeholder: BLURRED)
            description
            title
          }
        }
      }
    }
  }
`

export default Home