import { graphql } from 'gatsby'
import * as React from 'react'
import HeaderNav from '../headerNav'
import Footer from '../footer'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import Seo from '../seo'


const NovelNameTemplate = (props) => {
    console.log(props, 'from novelnametemp')
    const blogPosts = props.data.allContentfulNovelChapters.edges
    const novelName = props.data.contentfulNovelName
    const numberOfPages = props.pageContext.numberOfPages
    const pageNumber = props.pageContext.pageNumber
    return (
        <div id="App"> 
            <div id="top-section-container">
            <HeaderNav headerTitle={`${novelName.title}`} inArc={true}/>
            </div>
    <div className='archive-content'>
        <div className='main-content'>
            <h2>{novelName.title}</h2>
            <p>{novelName.synopsis ? novelName.synopsis.synopsis : 'No synopsis yet...'}</p>
        </div>
        <div className='ch-list-div'>
        <h2>Chapters</h2>
         <ul className='archive-list'>
            {blogPosts.map(blogPost => (
            <Link to={`./${blogPost.node.slug}`} key={blogPost.node.contentful_id}>
            <li>
                
                <div className='archive-list-entry'>
                
                    <span className='btn-title-txt'>{blogPost.node.slug.split('-').pop()}</span>
                    {/*
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
                    </div> */}
                </div>
                
                
                </li>
                </Link>
                ))}
        </ul>
        </div>

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
              thumbnail {
                url
              }
              synopsis {
                synopsis
              }
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

export const Head = ({data}) => <Seo title={data.contentfulNovelName.title} description={`${data.contentfulNovelName.title} in English`} ogDesc={`${data.contentfulNovelName.title} translated into English`} ogImg={ data.contentfulNovelName.thumbnail ? data.contentfulNovelName.thumbnail.url : null}></Seo>



export default NovelNameTemplate