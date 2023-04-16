import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

const TopPosts = () => {

    const data = useStaticQuery(graphql`
   
    query{
        allContentfulNovelChapters(sort: {createdAt: DESC}, limit: 2) {
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
        }
    `)

    const renderMostRecentTwo = () => {
        return (
            
            
            data.allContentfulNovelChapters.edges.map( (node) => {
                const image = getImage(node.node.novelName.thumbnail)
               
                return (
                    <div className="bot-nav-cards" key={node.node.contentful_id}>
                    <div className="card-img-container">
                    {node.node.novelName.thumbnail && <Link to={`${node.node.slug}`}><GatsbyImage image={image} alt={node.node.novelName.thumbnail && node.node.novelName.thumbnail.title} /></Link> }
                       
    
                    </div>
                    <ul className="tag-list">
                        <li><Link to={`/category/${node.node.novelName.catRef.slug}`}>{node.node.novelName.catRef.categoryName}</Link></li>
                    </ul>
                    <Link to={`${node.node.slug}`}>
                    <h2 className="card-post-title dark-b-txt">
                        {node.node.title}
                    </h2>
                    {/* <p className="card-excerpt dark-b-txt">
                        {node.node.excerpt}
                    </p> */}
                    </Link>
                    <div className="card-author-block">
                        
                        <div className="card-author-avatar">
                       
                            {node.node.author ? <Link to={`/authors/${node.node.author.slug}`}><GatsbyImage image={node.node.author.avatar.gatsbyImageData} alt={node.node.author ? `${node.node.author.name}'s avatar` : undefined} /></Link>: <StaticImage src="../images/default-portrait.jpg" alt={node.node.author ? node.node.author.name : 'author avatar'}></StaticImage>}
                    
                        </div>
                        <div className="card-author-name">
                       
                        {node.node.author ? <Link to={`/authors/${node.node.author.slug}`}>{node.node.author.name}</Link> : undefined}
                        </div>
                        
                        <span className='card-post-date'>{node.node.createdAt}</span>

                    </div>
                    

                </div>
                )
            })
        )
    }


    
    return (
        <div className="bot-nav-container">
            
        {renderMostRecentTwo()}
    

        </div>
    )
}



export default TopPosts