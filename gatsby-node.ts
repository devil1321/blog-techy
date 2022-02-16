const path = require('path')
import { CreatePagesNodeArticle,CreatePagesNodePerson } from './src/interfaces'

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
        path:node.url,
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
