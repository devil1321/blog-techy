import React from 'react'
import Seo from '../components/seo.component'
import Layout from '../components/layout.component'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { CreatePagesNodeArticle, PageQueryArticles } from '../interfaces'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


interface BlogPost{
  data:{
    contentfulArticles:PageQueryArticles
  }
  context:CreatePagesNodeArticle
}

const Blog:React.FC<BlogPost> = ({data,context}):JSX.Element => {
  
  const { img, title, subtitle, author, date } = data.contentfulArticles
  const { contentfulid, authorName , authorEmail , dateOfBirth, userImage } = author
  
  const fixImg:any = img 
  const image = getImage(fixImg)
  const fixUserImage:any = userImage
  const authorImage = getImage(fixUserImage)

  const raw = JSON.parse(data.contentfulArticles.article.raw)
  const document = {
    nodeType: 'document',
    ...raw,
  };
  
  return (
    <Layout>
      <div className="blog-post">
         <Seo title ="Technology | Blog" /> 
        
         <div className="blog-post__main-content">
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
            <div className="blog-post__content">
              <div className="blog-post__image">
                 <GatsbyImage image={image} alt={"blog-image"} />
              </div>
              <div className="blog-post__text">
                {documentToReactComponents(document)}
              </div>
            </div>
         </div>
        <Link to={`/author/${contentfulid}/${authorName}`}>
         <div className="blog-post__author">
           <div className="blog-post__author-image">
             <GatsbyImage image={authorImage} alt={"blog-image"} />
           </div>
           <div className="blog-post__author-info">
              <h3>{authorName}</h3>
              <h5>{authorEmail}</h5>
              <p>Date of birth: {dateOfBirth}</p>
           </div>
          </div>
         </Link>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getBlog($contentfulid:Int){
    contentfulArticles(contentfulid: { eq: $contentfulid}) {
      title
      subtitle
      url
      date
      category

      img {
        gatsbyImageData(layout:FULL_WIDTH,formats: WEBP, placeholder: BLURRED)
      }
      article {
        raw
      }
      tags {
        tags
      }
      author {
        contentfulid
        authorEmail
        authorName
        dateOfBirth
        userImage {
          gatsbyImageData(layout: CONSTRAINED, formats: WEBP)
        }
      }
    }
  }
  `


export default Blog