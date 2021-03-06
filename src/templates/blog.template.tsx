import React from 'react'
import Seo from '../components/seo.component'
import LayoutWithAside from '../components/layout-with-aside.component'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { CreatePagesNodeArticle, PageQueryArticles } from '../interfaces'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'

interface BlogPost{
  data:{
    contentfulArticles:PageQueryArticles
  }
  context:CreatePagesNodeArticle
}

const Blog:React.FC<BlogPost> = ({data,context}) => {
  
  const { img, title, subtitle, author, date , tags } = data.contentfulArticles
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

const options:any = {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p>{children}</p>
    }
  }
  
  return (
    <LayoutWithAside>
      <div className="blog-post">
         <Seo title ="Technology | Blog" /> 
        
         <div className="blog-post__main-content">
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
            <p className="blog-post__tags">{
              tags.tags.map(tag => <span>#{tag} </span>)
            }</p>
            <p className="blog-post__date">Created At: {date.slice(0,10)}</p>
            <div className="blog-post__content">
              <div className="blog-post__image">
                 <GatsbyImage image={image} alt={"blog-image"} />
              </div>
              <div className="blog-post__text">
                {documentToReactComponents(document,options)}
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
    </LayoutWithAside>
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