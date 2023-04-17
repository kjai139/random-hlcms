require('dotenv').config()
/**
 * @type {import('gatsby').GatsbyConfig}
 */

const theSite = process.env.MY_SITE_URL
const siteTitle = process.env.MY_SITE_TITLE
const customTokenizer = (str) => {
  return str.split(/\s+/).filter(token => token.length > 0);
};
module.exports = {
  siteMetadata: {
    title: siteTitle,
    siteUrl: theSite,
    description: 'Discover captivating web novels translated to English. Join our community of avid readers and embark on modern literary adventures. Indulge in the joy of storytelling!',
    
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
          allContentfulNovelChapters {
             
            edges {
              node {
                novelName {
                  slug
                  catRef {
                    slug
                  }
                }
                slug
              }
            }
          }
            
            
          
        }`,
        resolveSiteUrl: () => theSite,
        resolvePages: ({
          allContentfulNovelChapters: { nodes: allPosts }
        }) => {
          
          
          return allPosts.map(post => {
            return {
              path:`/category/${post.novelName.catRef.slug}/${post.novelName.slug}/${post.slug}`,
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
        icon: 'src/images/favicon.png'
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-F7VTW2K5EC"
        ],
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `wnnexus`
      }
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
              tokenize: 'strict',
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
