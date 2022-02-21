
module.exports = {
  siteMetadata: {
    title: `Technology News`,
    description:'Site about newest technologies around the world',
    author:'Dominik Stepien',
    siteUrl: `https://www.blog-technology.netlify.app`
  },
  plugins: [{
    resolve: 'gatsby-source-contentful',
    options: {
      "accessToken": "M48M_VMhUYorDsXyDI3r-4iSCaH8Ary2FCcWmmq5YDk",
      "spaceId": "4rcm455b8oex"
    }
  }, 
   {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  },
  {
    resolve: `gatsby-plugin-typescript`,
    options: {
      isTSX: true, // defaults to false
      jsxPragma: `jsx`, // defaults to "React"
      allExtensions: true, // defaults to false
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      // Footnotes mode (default: true)
      footnotes: true,
      // GitHub Flavored Markdown mode (default: true)
      gfm: true,
      // Plugins configs
      plugins: [],
    },
  },
  `gatsby-plugin-netlify`,
  "gatsby-plugin-sass", 
  "gatsby-plugin-image", 
  "gatsby-plugin-react-helmet", 
  "gatsby-plugin-sitemap", 
  "gatsby-plugin-sharp", 
  "gatsby-transformer-sharp",
  `@contentful/gatsby-transformer-contentful-richtext`
]
}

