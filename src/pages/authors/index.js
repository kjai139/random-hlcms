import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import HeaderNav from '../../components/headerNav'
import { Link } from 'gatsby'
import Footer from '../../components/footer'
import { graphql } from 'gatsby'
import Seo from '../../components/seo'

const AuthorPage = ({data}) => {

    return (
        <div id="App"> 
            <div id="top-section-container">
            <HeaderNav headerTitle="Our Authors" headerTxt="List of our best writers" curPage="authors" inCat={false}></HeaderNav>
            </div>
            <div id="bot-section-container">
            <div className='authors-content-container'>
                {data.allContentfulAuthorInfo.edges ? 
                data.allContentfulAuthorInfo.edges.map((node) => {
                    // console.log(node.node)
                    return (
                        <div className="bot-nav-cards" key={node.node.contentful_id}>
                    <div className="card-img-container">
                    {node.node.avatar && <Link to={`${node.node.slug}`}><GatsbyImage image={node.node.avatar.gatsbyImageData} alt={node.node.avatar.description} /></Link> }
                       
    
                    </div>
                    <ul className="tag-list">
                        {/* <li><Link to={`/categories/${node.node.catRef.slug}`}>{node.node.catRef.categoryName}</Link></li> */}
                    </ul>
                    <Link to={`${node.node.slug}`}>
                    <h2 className="card-post-title dark-b-txt">
                        {node.node.name}
                    </h2>
                    <p className="card-excerpt dark-b-txt">
                        {node.node.about}
                    </p>
                    </Link>

                </div>
                    )
                }): null}

            </div>
            </div>
            <footer id="footer-section-container">
            <Footer />

            </footer>


        </div>
    )
}

export const query = graphql`
    query{
        allContentfulAuthorInfo {
            edges {
              node {
                avatar {
                  gatsbyImageData
                  description
                }
                name
                slug
                contentful_id
                about
              }
            }
          }
    }
`


export const Head = () => <Seo title="Authors" description="A page with a list of TL-Nexus's translators"></Seo>

export default AuthorPage