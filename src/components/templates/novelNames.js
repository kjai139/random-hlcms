import { graphql } from 'gatsby'
import * as React from 'react'
import Topblock from '../topblock'
import Footer from '../footer'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'


const NovelNameTemplate = (props) => {
    console.log(props)
    const blogPosts = props.data.allContentfulNovelChapters.edges
    const novelName = props.data.contentfulNovelName
    const numberOfPages = props.pageContext.numberOfPages
    const pageNumber = props.pageContext.pageNumber
    return (
        <div id="App"> 
            <div id="top-section-container">
            <Topblock headerTitle={`${novelName.title}`} inArc={true}/>
            </div>
    <div className='archive-content'>
      
         <ul className='archive-list'>
            {blogPosts.map(blogPost => (
            <li key={blogPost.node.contentful_id}>
                
                <div className='archive-list-entry'>
                <Link to={`./${blogPost.node.slug}`}>
                    <span>{blogPost.node.title}</span>
                    </Link>
                    <div className='archive-author-details'>
                    <Link to={`/authors/${blogPost.node.author.slug}`}>
                    <div className='archive-avatar-div'>
                        <div className='archive-avatar-img-container'>
                        <GatsbyImage image={blogPost.node.author.avatar.gatsbyImageData} alt={`${blogPost.node.author.name}'s avatar`}></GatsbyImage>
                        </div>
                        {blogPost.node.author.name}
                    </div>
                    </Link>
                    <span className='card-post-date'>{blogPost.node.createdAt}</span>
                    </div>
                </div>
                
                </li>
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
    )

    
}


export const query = graphql`
    query($id: String!, $skip: Int!, $limit: Int!) {
        contentfulNovelName(id: {eq: $id}) {
            catRef {
                categoryName
                slug
              }
              title
            }
            allContentfulNovelChapters(
                sort: {createdAt: DESC}, 
                filter: {novelName: {id: {eq: $id}}},
                skip: $skip,
                limit: $limit
                ) {
                    edges{
                        node {
                            createdAt(formatString: "MMMM DD, YYYY")
                            slug
                            title
                            contentful_id
                            author {
                                name
                                slug
                                avatar {
                                    gatsbyImageData
                                    description
                                  }
                              }
                        }
                    }
            
          }
    }
`




export default NovelNameTemplate