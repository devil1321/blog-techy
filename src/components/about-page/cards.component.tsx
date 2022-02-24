import React, { useState } from 'react'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'

interface GetImgSrcFn{
  getImgSrc:(name:string) => IGatsbyImageData
}

interface Card{
  img:string;
  title:string;
  text:string;
}

const Cards:React.FC<GetImgSrcFn> = ({getImgSrc}) => {

  const [cards,setCards] = useState<Card[]>([
    {
      img:'ux-ui-icon',
      title:'Programs Reviews',
      text:'As a company, we also carry out program reviews',
    },
    {
      img:'case-icon',
      title:'Work possibility',
      text:'After registration you have the opportunity to work for us',
    },
    {
      img:'hands-icon',
      title:'Contact',
      text:'In contact all day long, whenever you need to',
    },
  
  ])
  
  return (
    <div className="about-page__card-group-wrapper">
          
    <h2 className="title">You have opportunities with us</h2>
  <div className="about-page__card-group">
    {cards.map((card:Card) => {
      const { img , title , text } = card
      return(
        <div className="about-page__card">
        <div className="about-page__icon">
          <GatsbyImage image={getImgSrc(img)} alt="icon" />
        </div>
        <div className="about-page__card-body">
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
      )
    })}
  </div>
  <div className="about-page__card-group-bg">
      <GatsbyImage image={getImgSrc('cards-bg')} alt="bg" />
  </div>
</div>
  )
}

export default Cards