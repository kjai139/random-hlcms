import { graphql } from 'gatsby'
import * as React from 'react'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import HeaderNav from '../headerNav'
import Seo from '../seo'
import Footer from '../footer'
import { Link } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'



const Bold = ({ children }) => <span className='bold'>{children}</span>
const Text = ({ children }) => <p className='chapter-txt'>{children}</p>

const ChaptersTemp = (props) => {
    // console.log(props, 'nvlchpts')
    // console.log(props.data.contentfulNovelChapters.novelName.novelchapters.length, 'chapter length')

    const totalCh = props.data.contentfulNovelChapters.novelName.novelchapters.length
    const currentCh = parseInt(props.data.contentfulNovelChapters.slug.split('-').pop())
    
    // console.log(totalCh > currentCh, currentCh, 'page check')
    const prevSlug = props.data.contentfulNovelChapters.slug.replace(currentCh, currentCh - 1)
    const nextSlug = props.data.contentfulNovelChapters.slug.replace(currentCh, currentCh + 1)

    // console.log(prevSlug, nextSlug)

    const disqusConfig = {
      url:'http://localhost:8000',
      identifier: props.data.contentfulNovelChapters.contentful_id,
      title:props.data.contentfulNovelChapters.title,
    }



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
        <div id="App"> 
            <div id="top-section-container">
                <HeaderNav headerTitle={props.data.contentfulNovelChapters.title}></HeaderNav>
            
            </div>
            <div className='blogpost-body-container'>
                <div className='blogpost-ad-block-top'>

                </div>
                
                <div className='blogpost-center'>
                
                {props.data.contentfulNovelChapters.body && renderRichText(props.data.contentfulNovelChapters.body, options)}
                
                <nav className='blogpost-btn-nav'>
                    {currentCh === 1 ? <Link to={`../`}><button className='ch-nav-btns'>Table of Contents</button></Link> : 
                    <Link to={`../${prevSlug}`}><button className='ch-nav-btns'>Previous Chapter</button></Link>
                    }
                    {currentCh === totalCh ? null : <Link to={`../${nextSlug}`}><button className='ch-nav-btns'>Next Chapter</button></Link>}
                </nav>

                <div id='disqus-container'>
                <Disqus config={disqusConfig}/>
                </div>

         
                
                
                </div>
                
                <div className='blogpost-ad-block'>

                </div>
            </div>
            <footer id="footer-section-container">
              <Footer></Footer>

            </footer>
      </div>
    )
}


export const query = graphql`
    query($id: String!) {
        contentfulNovelChapters(id: {eq: $id}) {
            novelName {
                title
                novelchapters {
                  slug
                }
                thumbnail {
                    gatsbyImageData
                    url
                }
            }
            createdAt(formatString: "MMMM DD, YYYY")
            slug
            title
            contentful_id
            body {
                raw
                references {
                    ... on ContentfulAsset {
        
                      contentful_id
                      title
                      gatsbyImageData
                      description
                      __typename
        
                    }
                  }
            }
        }
            
    }
`

export const Head = ({data}) => <Seo title={data.contentfulNovelChapters.title} description={`${data.contentfulNovelChapters.title} in English`} ogDesc={`${data.contentfulNovelChapters.title} translated into English`} ogImg={ data.contentfulNovelChapters.novelName.thumbnail ? data.contentfulNovelChapters.novelName.thumbnail.url : null}></Seo>

export default ChaptersTemp