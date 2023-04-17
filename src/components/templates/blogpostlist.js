import { graphql, useStaticQuery, Link } from 'gatsby'
import * as React from 'react'
import HeaderNav from '../headerNav';
import Seo from '../seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import Footer from '../footer';




const BlogPostList = ({ data, pageContext }) => {
    const { humanPageNumber, pageNumber, numberOfPages } = pageContext;
    const blogPosts = data.allContentfulNovelChapters.edges;

    // console.log(data.allContentfulBlogPost, 'from blogpostlist')

  return (
    <div id="App"> 
      <div id="top-section-container">
        <HeaderNav headerTitle='Post Archive' curPage="home" inArc={true} />
        </div>
    <div className='archive-content'>
      {/* Render list of blog posts */}
      <ul className='archive-list-line'>
        {blogPosts.map(blogPost => (
          <Link to={`/category/${blogPost.node.novelName.catRef.slug}/${blogPost.node.novelName.slug}/${blogPost.node.slug}`} key={blogPost.node.contentful_id}>
          <li className='archive-list-entry-li'>
            
              <div className='archive-list-entry-line'>
                
                <span className='archive-list-title'>{blogPost.node.title}</span>
                
                <div className='archive-author-details'>
                  
                  <div className='archive-avatar-div'>
                    <div className='archive-avatar-img-container'>
                      
                    <GatsbyImage image={blogPost.node.author.avatar.gatsbyImageData} alt={`${blogPost.node.author.name}'s avatar`}></GatsbyImage>
                    </div>
                    {blogPost.node.author.name}
                  </div>
                 
                  <span className='card-post-date-archive'>{blogPost.node.createdAt}</span>
                </div>
              </div>
              
          </li>
          </Link>
        ))}
      </ul>

      {/* Render pagination links */}
      <nav className='page-nav'>
        <ul className='page-nav-list'>
        {Array(numberOfPages).fill().map( (_, i) => {
                return <li key={`pagination-number${i + 1}`} className={ i === pageNumber ? 'page-nav-entries selected' : 'page-nav-entries'}>
                   {i === pageNumber ? `${i + 1}` : <Link to={ i === 0 ? `../` : `./${i + 1}`}>{i + 1}</Link>}
                    
                </li>
            })}
        </ul>
      </nav>
    </div>
    <footer id="footer-section-container">
      <Footer />

      </footer>
    </div>
    
  );
};

export const query = graphql`
query($skip: Int!, $limit: Int!){
  allContentfulNovelChapters(skip: $skip, limit: $limit, sort: {createdAt: DESC}) {
      edges {
        node {
          title
          slug
          contentful_id
          novelName {
            thumbnail {
              gatsbyImageData
              description
              title
            }
            catRef {
              categoryName
              slug
            }
            slug
          }
          author {
            name
            slug
            avatar {
              gatsbyImageData
            }
          }
          createdAt(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }`
//   query($skip: Int!, $limit: Int!) {
//     allContentfulBlogPost(skip: $skip, limit: $limit, sort: {createdAt: DESC}) {
//         edges {
//           node {
//                 slug
//                 createdAt(formatString: "MMMM DD, YYYY")
//                 postTitle
//                 soleAuthor {
//                   avatar {
//                     gatsbyImageData
//                   }
//                   name
//                   slug
//                 }
//         }
//       }
//     }
//   }
// `;

export const Head = () => <Seo title='Post Archive | wnNexus' description='An archive of all blog posts' />

export default BlogPostList


