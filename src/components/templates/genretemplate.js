import { graphql } from 'gatsby'
import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import HeaderNav from '../headerNav'
import Footer from '../../components/footer'
import defaultPort from "../../images/default-portrait.jpg"
import Seo from '../seo'

const GenTemp = (props) => {

    console.log(props, 'from catTemp')
    const pageNumber = props.pageContext.pageNumber
    const numberOfPages = props.pageContext.numberOfPages
    const categoryPosts = props.data.allContentfulNovelName.edges



    return (
      <div id="App"> 
          <div id="top-section-container">
          <HeaderNav headerTitle={props.pageContext.genreName} inArc={true}/>
          </div>
           <div id='bot-section-container'>
              <div className='cata-content-container'>
                {categoryPosts && categoryPosts.map((node => {
                  
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
                       
                    </ul>
                    <Link to={`/category/${node.node.catRef.slug}/${node.node.slug}`}>
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
        allContentfulNovelName(limit: $limit, 
            skip: $skip, filter: {genreTags: {elemMatch: {id: {eq: $id}}}}) {
            edges {
              node {
                title
                slug
                catRef{
                    slug
                  }
                thumbnail {
                  gatsbyImageData
                  title
                }
                contentful_id
                genreTags {
                    slug
                    title
                  }
              }
            }
          }
    }
`

export const Head = ({data}) =>  <Seo title={`Genre - ${data.allContentfulNovelName.edges[0].node.genreTags.title}`} description={`${data.allContentfulNovelName.edges[0].node.genreTags.title} web novels translated into English`}></Seo>

export default GenTemp