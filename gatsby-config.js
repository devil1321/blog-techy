module.exports = {
  siteMetadata: {
      title: `blog-site`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-contentful',
    options: {
      "accessToken": "M48M_VMhUYorDsXyDI3r-4iSCaH8Ary2FCcWmmq5YDk",
      "spaceId": "4rcm455b8oex"
    }
  }, "gatsby-plugin-sass", "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }]
};


// {
//   resolve: 'gatsby-plugin-google-analytics',
//   options: {
//     "trackingId": ""
//   }
// }