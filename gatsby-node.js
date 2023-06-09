const path = require('path')
const { paginate } = require("gatsby-awesome-pagination")





exports.createPages = async function ({ actions, graphql }) {
  
  const { createPage } = actions
  const { data } = await graphql(`
    query {
      allContentfulCategory {
        edges {
          node {
            slug
            id
          }
        }
      }
      allContentfulNovelName {
        edges {
          node {
            id
            contentful_id
            slug
            catRef {
              slug
            }
            genreTags {
              contentful_id
              slug
              title
            }
          }
        }
      }
      allContentfulGenreTags {
        edges {
          node {
            id
            contentful_id
            title
            slug
          }
        }
      }
      allContentfulNovelChapters(sort: {createdAt: DESC}) {
        edges {
          node {
            slug
            id
            novelName {
              contentful_id
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

  

 
  const novelNames = data.allContentfulNovelName.edges
  const novelChapters = data.allContentfulNovelChapters.edges
  const genreTags = data.allContentfulGenreTags.edges

  genreTags.forEach(node => {
    const genres = novelNames.filter(
      novelName => novelName.node.genreTags.contentful_id === node.node.contentful_id
    )

    paginate({
      createPage,
      items: genres,
      itemsPerPage:10,
      pathPrefix: `/genres/${node.node.slug}`,
      component: path.resolve('./src/components/templates/genretemplate.js'),
      context: {
        id: node.node.id,
        genreName: node.node.title,
      }
    })
  })
  

  

  data.allContentfulCategory.edges.forEach(node => {
    const categories = novelNames.filter(
      novelName => novelName.node.id === node.node.id
    )
    

    paginate({
      createPage,
      items: categories,
      itemsPerPage:10,
      pathPrefix: `/category/${node.node.slug}`,
      component: path.resolve('./src/components/templates/categorytemplate.js'),
      context: {
        id:node.node.id
      }
    })
    
  })

  data.allContentfulNovelChapters.edges.forEach(node => {
    const slug = node.node.slug
    actions.createPage({
      path: `category/${node.node.novelName.catRef.slug}/${node.node.novelName.slug}/${slug}`,
      component: require.resolve(`./src/components/templates/novelchapters.js`),
      context: {
        id: node.node.id,
        disqusUrl:`category/${node.node.novelName.catRef.slug}/${node.node.novelName.slug}/${slug}`
      }
    })

    
  })

  novelNames.forEach(novelName => {
    const novelChaptersForNovel = novelChapters.filter(
      chapter => chapter.node.novelName.contentful_id === novelName.node.contentful_id
    )

    // console.log(novelChaptersForNovel, 'filtered lists')

    paginate({
      createPage,
      items: novelChaptersForNovel,
      itemsPerPage:10,
      pathPrefix: `/category/${novelName.node.catRef.slug}/${novelName.node.slug}`,
      component: path.resolve('./src/components/templates/novelNames.js'),
      context: {
        id:novelName.node.id
      }
    })
  })
  paginate({
    createPage,
    items: novelChapters,
    itemsPerPage: 10,
    pathPrefix: '/archive',
    component: path.resolve('./src/components/templates/blogpostlist.js')
  });
  
}  

    
