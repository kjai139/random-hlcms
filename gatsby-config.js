require('dotenv').config()
/**
 * @type {import('gatsby').GatsbyConfig}
 */

const theSite = process.env.MY_SITE_URL
const siteTitle = process.env.MY_SITE_TITLE
module.exports = {
  siteMetadata: {
    title: siteTitle,
    siteUrl: theSite,
    description: '',
    logo: '',
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          allContentfulBlogPost {
             
                nodes {
                  slug
                  updatedAt
                  postTitle
                  excerpt
                }
              }
              
            
          
        }`,
        resolveSiteUrl: () => theSite,
        resolvePages: ({
          allContentfulBlogPost: { nodes: allPosts }
        }) => {
          
          
          return allPosts.map(post => {
            return {
              path:`/${post.slug}`,
              modifiedGmt: post.updatedAt,
            }
          })
        },
        serialize: ({path, modifiedGmt}) => {
          return {
            url: theSite + path,
            lastmod: modifiedGmt,
          }
        },
        
      }
      
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.API_TOKEN,
        
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.svg'
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-DM12CPJ9FV"
        ],
      },
    },
    {
      resolve: `gatsby-plugin-flexsearch`,
      options: {
        languages: ['en'],
        type: "ContentfulNovelName",
        fields: [
          {
            name: 'title',
            indexed:true,
            resolver: 'title',
            attributes: {
              encode: 'balance',
              tokenize: 'forward',
              threshold: 6,
              depth: 3,

            },
            store:true,
          },
          {
            name: 'slug',
            resolver: 'slug',
            store:true,
            
          },
          {
            name: 'contentful_id',
            resolver: 'contentful_id',
            store:true, 
          },
          {
            name: 'searchCategory',
            resolver: 'searchCategory',
            store:true,
          },

        ],
      },
    },
  
  ],
}
