import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { PageQueryArticlesArr,PageQueryArticles } from '../interfaces'
import Seo from '../components/seo.component'
import LayoutWithAside from '../components/layout-with-aside.component'
import BlogItem from '../components/blog-item.component'

const Movies:React.FC<PageQueryArticlesArr> = ({data}) => {
  return (
    <LayoutWithAside>
      <div className="posts-page">
        <Seo title ="Movies" />
        <h1>Movies Posts</h1>
        {data.allContentfulArticles.nodes.map((node:PageQueryArticles)=>(
          <BlogItem key={node.contentfulid} data={node} />
        ))}
      </div>
    </LayoutWithAside>
  )
}

export const query = graphql`
  {
    allContentfulArticles(filter: {category: {eq: "movies"}}) {
      nodes {
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

export default Movies