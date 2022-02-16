import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { PageQuery } from  '../interfaces'
import Link from 'gatsby-link'

interface BlogItemProps {
    data:PageQuery
}

const BlogItem:React.FC<BlogItemProps> = ({data}) => {
  
  const { img, title, subtitle, date, url} = data
  const { authorName, authorEmail } = data.author 
  const fixImg:any = img 
  const image = getImage(fixImg)
  return (
    <Link to={`${url}`}>
      <div className="blog-item">
          <div className="blog-item__image">
              <GatsbyImage image={image} alt={"blog-image"} /> 
          </div>
          <div className="blog-item__content">
              <h2>{title}</h2>
              <h3>{subtitle}</h3>
              <p>{authorName} / {authorEmail} / {date}</p>
          </div>
      </div>
    </Link>
  )
}

export default BlogItem