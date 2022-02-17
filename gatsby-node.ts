const path = require('path')
const axios = require('axios')
const crypto = require('crypto');

import { CreatePagesNodeArticle,CreatePagesNodePerson } from './src/interfaces'


exports.sourceNodes = async ({actions})=>{
  const { createNode } = actions

    const city = await axios.get('https://extreme-ip-lookup.com/json/')
    .then(res => {
        let city
        if (res.data.city === '') {
            return city = 'Warsaw'
        } else {
            return res.data.city
        }
    })
    .catch(err => console.log(err))

    const wheartherData = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: 'd355aaa337c3ed0e0876c199a8060479'
        }
    }).then(data =>{
      return data
    }).catch(err => console.log(err))
    const { weather , visibility, wind,coord } = wheartherData.data
    const { temp ,feels_like, humidity, pressure } = wheartherData.data.main

    const wheatherNode = {
      id: `WheatherData`,
      parent: `__SOURCE__`,
      internal: {
          type: `Wheather`, // name of the graphQL query --> allRandomUser {}
          // contentDigest will be added just after
          // but it is required
      },
      children: [],
      city,
      weather,
      visibility, 
      wind,coord,temp,
      feels_like, 
      humidity, 
      pressure,  
      temp
    }

    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(wheatherNode))
      .digest(`hex`);
      // add it to userNode
      wheatherNode.internal.contentDigest = contentDigest;

      // Create node with the gatsby createNode() API
      createNode(wheatherNode);

  }



exports.createPages = async ({graphql,actions}) =>{
    const blogs = await graphql(`
    {
      allContentfulArticles(filter: {node_locale: {eq: "en-US"}}) {
        nodes {
          id
          url
          contentfulid
        }
      }
    }
  `)
    blogs.data.allContentfulArticles.nodes.forEach((node:CreatePagesNodeArticle) => {
      actions.createPage({
        path:`${node.url}/`,
        component:path.resolve('./src/templates/blog.template.tsx'),
        context:{
          id:node.id,
          contentfulid:parseInt(node.contentfulid)
        }
      })
    })
 

 const persons = await graphql(`{
      allContentfulPerson(filter: {node_locale: {eq: "en-US"}}) {
        nodes {
          contentfulid
          authorName
        }
      }
    }
  `)
  persons.data.allContentfulPerson.nodes.forEach((node:CreatePagesNodePerson) => {
          actions.createPage({
            path:`/author/${node.contentfulid}/${node.authorName}`,
            component:path.resolve('./src/templates/author.template.tsx'),
            context:{
              contentfulid:parseInt(node.contentfulid)
            }
          })
      })

}
