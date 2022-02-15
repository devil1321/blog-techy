const path = require('path')
import { NONAME } from 'dns'
import { CreatePagesNode } from './src/interfaces'

exports.createPages = async ({graphql,actions}) =>{
    const { data } = await graphql(`
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
  data.allContentfulArticles.nodes.forEach((node:CreatePagesNode) => {
    actions.createPage({
        path:node.url,
        component:path.resolve('./src/templates/blog.template.tsx'),
        context:{
            id:node.id,
            contentfulid:node.contentfulid
        }
    })
})
}
