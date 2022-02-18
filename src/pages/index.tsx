import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { PageQueryArticlesArr,PageQueryArticles } from '../interfaces'
import Seo from '../components/seo.component'
import LayoutWithAside from '../components/layout-with-aside.component'
import BlogItem from '../components/blog-item.component'
const Home:React.FC<PageQueryArticlesArr> = ({data}):JSX.Element => {
  return (
    <LayoutWithAside>
      <div className="posts-page">
        <Seo title ="Technology | Blogs" />
        <h1>All Posts</h1>
        {data.allContentfulArticles.nodes.map((node:PageQueryArticles)=>{
          return <BlogItem key={node.id} data={node} />
        })}
      </div>
    </LayoutWithAside>
  )
}


export const query = graphql`
  {
    allContentfulArticles(filter: {node_locale: {eq: "en-US"}}) {
      nodes {
        id
        contentfulid
        category
        title
        subtitle
        url
        date(formatString: "")
        img {
          gatsbyImageData(layout: FULL_WIDTH, formats: WEBP, placeholder: BLURRED)
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