import React from 'react'
import Seo from '../components/seo.component'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { faCakeCandles} from '@fortawesome/free-solid-svg-icons'
import { graphql } from 'gatsby'
import { Author as AuthorModel } from '../interfaces'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import LayoutWithAside from '../components/layout-with-aside.component'


interface AuthorProps{
  data:{
    contentfulPerson:AuthorModel
  }
  context:{
    contentfulid:number;
  }
}

const Author :React.FC<AuthorProps> = ({context,data}) => {
  const {authorName , authorEmail , dateOfBirth, userImage, authorDescription } = data.contentfulPerson

  const fixImg: any = userImage
  const image = getImage(fixImg)
  
  const raw = JSON.parse(authorDescription.raw)

  const document = {
    nodeType: 'document',
    ...raw
  };

  return (
    <LayoutWithAside>
      <div className="author-template">
         <Seo title ="Technology | Author" /> 
         <div className="author-template__info-wrapper">
            <GatsbyImage image={image} alt={"blog-image"} />
            <div className="author-template__info">
              <h1><FontAwesomeIcon icon ={faPerson} />{authorName}</h1>
              <h3><FontAwesomeIcon icon ={faAt} />{authorEmail}</h3>
              <p><FontAwesomeIcon icon ={faCakeCandles} />{dateOfBirth}</p>
            </div>
         </div>
         {documentToReactComponents(document)}
      </div>
    </LayoutWithAside>
  )
}

export const query = graphql`
  query getPerson($contentfulid: Int) {
  contentfulPerson(contentfulid: {eq: $contentfulid}) {
    authorEmail
    authorName
    dateOfBirth
    userImage {
      gatsbyImageData(formats: WEBP, layout: CONSTRAINED, placeholder: BLURRED)
    }
    authorDescription {
      raw
    }
  }
}`


export default Author