import { graphql } from 'gatsby'
import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import HeaderNav from '../headerNav'
import Footer from '../../components/footer'
import defaultPort from "../../images/default-portrait.jpg"
import Seo from '../seo'

const CatTemp = (props) => {

    // console.log(props, 'from catTemp')
    const pageNumber = props.pageContext.pageNumber
    const numberOfPages = props.pageContext.numberOfPages
    const categoryPosts = props.data.allContentfulNovelName.edges



    return (
      <div id="App"> 
          <div id="top-section-container">
          <HeaderNav headerTitle={`${categoryPosts[0].node.catRef.categoryName}`} headerTxt={'If you are using Safari you might have to disable blocking all cookies if you see blank pages'} inArc={true}/>
          </div>
           <div id='cata-bot-section-container'>
              <div className='cata-content-container'>
                {categoryPosts && categoryPosts.map((node => {
                  // console.log(node.node.slug)
                  return (
                    <div className='cata-nav-cards' key={node.node.contentful_id}>
                      <div className="card-img-container">
                    {node.node.thumbnail ? <Link to={`/category/${node.node.catRef.slug}/${node.node.slug}`}><GatsbyImage image={node.node.thumbnail.gatsbyImageData} alt={'a gatsby image'} /></Link> : 
                    <Link to={`/category/${node.node.catRef.slug}/${node.node.slug}`}>
                    <StaticImage src="../../images/mthumbnail.png"
                    alt='default book cover'></StaticImage>
                    </Link>
                    }
                    </div>
                    <ul className="tag-list">
                    {node.node.genreTags.map((item, index) => {
                            if (item.title === props.pageContext.genreName){
                                // console.log(node.node.contentful_id)
                                return <li className='dark-b' key={`${node.node.contentful_id}-tag-${index}`}>{item.title}</li>
                            }
                            return (
                                
                                <li className='dark-b' key={`${node.node.contentful_id}-tag-${index}`} ><Link to={`/genres/${item.slug}`}>{item.title}</Link></li>
                            )
                        })}
                        {/* Need map over genre tags here */}
                        {/* <li className='dark-b'><Link to={`/genres/${node.node.genreTags[0].slug}`}>{node.node.genreTags[0].title}</Link></li> */}
                    </ul>
                    <Link to={`${node.node.slug}`}>
                    <h2 className="card-post-title">
                        {node.node.title}
                    </h2>
                    {/* <p className="card-excerpt">
                        {node.node.excerpt}
                    </p> */}
                    </Link>
                    

                    </div>
                  )
                }))}
                  </div>
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
      allContentfulNovelName(filter: {catRef: {id: {eq: $id}}}, 
        limit: $limit, 
        skip: $skip
        ) {
          edges {
            node {
              thumbnail{
                gatsbyImageData
                description
              }
              slug
              title
              contentful_id
              catRef {
                categoryName
                slug
              }
              genreTags {
                title
                slug
              }
            }
          }
      }
    }
`

export const Head = ({data}) =>  <Seo title={data.allContentfulNovelName.edges[0].node.catRef.categoryName} description={`${data.allContentfulNovelName.edges[0].node.catRef.categoryName} in English`}></Seo>

export default CatTemp