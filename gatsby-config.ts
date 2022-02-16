
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
  {
    resolve: `gatsby-source-google-calendar`,
    options: {
      calendarIds: [
        'khirltpoo2j9qbvtjqjjgsbiug@group.calendar.google.com',
      ],
      // options to retrieve the next 10 upcoming events
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }
  },
  {
    resolve: `gatsby-source-google-calendar-events`,
    options: {
      includedFields: ['start', 'end', 'summary', 'status', 'organizer', 'description', 'location'],
      envVar: 'AIzaSyDNtSvLRVuGeI6R5PisXRvjbSmNd4koL-E',
      calendarId: 'khirltpoo2j9qbvtjqjjgsbiug@group.calendar.google.com',
      assumedUser: 's.dominik132@gmail.com',
      timeMin: moment().format(),
      timeMax: moment().add(2, 'y').format(),
      scopes: [
          `https://www.googleapis.com/auth/calendar.events.readonly`,
          `https://www.googleapis.com/auth/calendar.readonly`
      ]

      }
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

// {
//   resolve: 'gatsby-plugin-google-analytics',
//   options: {
//     "trackingId": ""
//   }
// }