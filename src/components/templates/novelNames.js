import { graphql } from 'gatsby'
import * as React from 'react'
import HeaderNav from '../headerNav'
import Footer from '../footer'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import Seo from '../seo'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import Layout from '../layout'

const Bold = ({ children }) => <span className='bold'>{children}</span>
const Text = ({ children }) => <p className='chapter-txt'>{children}</p>

const NovelNameTemplate = (props) => {
    // console.log(props, 'from novelnametemp')
    const blogPosts = props.data.allContentfulNovelChapters.edges
    const novelName = props.data.contentfulNovelName
    const numberOfPages = props.pageContext.numberOfPages
    const pageNumber = props.pageContext.pageNumber

    const options = {
        renderMark: {
            [MARKS.BOLD]: text => <Bold>{text}</Bold>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => {
               
                  return <Text>{children}</Text>
                  
            },
            [INLINES.HYPERLINK]: (node, children) => {
                // console.log(node.data.uri, 'node data uri')
                // console.log(node, 'hyperlink node')
                // console.log(children, 'hyperlink children')
                if ((node.data.uri).includes('player.vimeo.com/video')){
                  return <span className='iFrameContainer'><iframe title="Vimeo video player" src={node.data.uri} allowFullScreen></iframe></span>
                } else if((node.data.uri).includes("youtube.com/embed")) {
                  return <span className='iFrameContainer'><iframe title="YouTube video player" src={node.data.uri} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture;"  allowFullScreen></iframe></span>
                } else if((node.data.uri).includes("amzn.to")) {
                  return <a href={node.data.uri} target='_blank' rel='noopener noreferrer' title='Link opens in a new window' className='amazon-link-btn'>{children}</a>
                } else {
                  return <a href={node.data.uri} className='regular-links'>{children}</a>
                }
              },
              [BLOCKS.EMBEDDED_ASSET]: (node) => {
                // console.log(node.data.target.gatsbyImageData)
                // console.log(node.data.target.description)
      
                let image = getImage(node.data.target)
                // console.log(image)
                return (
                  <div className={image.width < 600 ? 'post-content-img small-img' : 'post-content-img'}>
                    
                    <GatsbyImage 
                    image={image}
        
                    alt={node.data.target.description ? node.data.target.description : 'an image of dinosaur'}/>
                  
                  </div>
                )
                
                
              },
              [BLOCKS.EMBEDDED_ENTRY] : (node) => {
                // console.log(node, 'embeded entry block')
              },
              [INLINES.EMBEDDED_ASSET]: (node) => {
                // console.log(node, 'embeded entry inline')
              },
      
              [BLOCKS.TABLE]: (node, children) => {
                return (
                  <div className='table-container'>
                    <table>
                      <tbody>
                      {children}
                      </tbody>
                    
                    </table>
                    </div>
                )
              },
              [BLOCKS.LIST_ITEM] : (node, children) => {
                return <li className='main-lists'>{children}</li>
              },
        },
    }
    return (
      <Layout>
        
            <div id="top-section-container">
            <HeaderNav headerTitle={`${novelName.title}`} inArc={true}/>
            </div>
    <div className='archive-content'>
        <div className='main-content'>
            {novelName.thumbnail && 
            <div className='main-content-img-cont'>
            <GatsbyImage image={novelName.thumbnail.gatsbyImageData} alt={novelName.thumbnail.title}></GatsbyImage>
            </div>}
            <h2>{novelName.title}</h2>
            {novelName.storySynopsis ? renderRichText(novelName.storySynopsis, options) : 'No synopsis yet...'}
        </div>
        <div className='ch-list-div'>
        <h2>Chapters</h2>
         <ul className='archive-list'>
            {blogPosts.map(blogPost => (
            <Link to={`./${blogPost.node.slug}`} key={blogPost.node.contentful_id}>
            <li>
                
                <div className='archive-list-entry'>
                
                    <span className='btn-title-txt'>{blogPost.node.slug.split('-').pop()}</span>
                   
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
    
    </Layout>
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
                gatsbyImageData
                title
                url
              }
              storySynopsis {
                raw
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