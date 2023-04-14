// const path = require('path')
// const { paginate } = require('gatsby-awesome-pagination')


// exports.createPages = async ({ actions, graphql }) => {
//     const { createPage } = actions

//     const archiveResult = await graphql(`
//     query {
//         allContentfulBlogPost(sort: {createdAt: DESC}) {
           
//             nodes {
//                 slug
//             }
            
//         }
//     }
//     `)


exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allContentfulCategory {
        edges {
          node {
            slug
            novelname {
              slug
              chapters {
                slug
              }
            }
          }
        }
      }
      allContentfulNovelName {
        edges {
          node {
            slug
            catRef {
              slug
            }
          }
        }
      }
      allContentfulNovelChapters {
        edges {
          node {
            slug
            novelName {
              slug
              catRef {
                slug
              }
            }
          }
        }
      }
    }
  `)
  console.log(data.allContentfulCategory.edges, '1')
  console.log(data.allContentfulNovelName.edges, '2')
  console.log(data.allContentfulNovelChapters.edges, '3')
  data.allContentfulCategory.edges.forEach(node => {
    
    console.log(node)
    actions.createPage({
      path: `category/${node.node.slug}`,
      component: require.resolve(`./src/components/templates/categorytemplate.js`),
      
    })
  })

  data.allContentfulNovelName.edges.forEach(node => {
    console.log(node)
    const slug = node.node.slug
    actions.createPage({
      path: `category/${node.node.catRef.slug}/${slug}`,
      component: require.resolve(`./src/components/templates/novelNames.js`),
      
    })
  })

  data.allContentfulNovelChapters.edges.forEach(node => {
    const slug = node.node.slug
    actions.createPage({
      path: `category/${node.node.novelName.catRef.slug}/${node.node.novelName.slug}/${slug}`,
      component: require.resolve(`./src/components/templates/novelchapters.js`),
      
    })
  })
}  

    

//     // console.log(archiveResult.data)
//     // console.log(reviewsResult.data)
//     const blogPosts = archiveResult.data.allContentfulBlogPost.nodes
    
    
//     paginate({
//         createPage,
//         items: blogPosts,
//         itemsPerPage: 5,
//         pathPrefix: '/archive',
//         component: path.resolve('./src/components/templates/blogpostlist.js')
//       });

    

   
// }