module.exports = {
  siteMetadata: {
    title: `Technology News`,
    description:'Site about newest technologies around the world',
    author:'Dominik Stepien'
    siteUrl: `https://www.yourdomain.tld`
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
  `gatsby-plugin-netlify`,
  "gatsby-plugin-sass", 
  "gatsby-plugin-image", 
  "gatsby-plugin-react-helmet", 
  "gatsby-plugin-sitemap", 
  "gatsby-plugin-sharp", 
  "gatsby-transformer-sharp"
}]


// {
//   resolve: 'gatsby-plugin-google-analytics',
//   options: {
//     "trackingId": ""
//   }
// }