import * as React from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { useStaticQuery, graphql, Link } from 'gatsby'

const BotBlock = () => {
    const data = useStaticQuery(graphql`
    query {
        allContentfulNovelChapters(sort: {createdAt: DESC}, skip:3, limit: 7) {
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
        
    }`)
   

    const renderBottomFourPosts = () => {
        return data.allContentfulNovelChapters.edges.map(node => 
            <Link to={`/category/${node.node.novelName.catRef.slug}/${node.node.novelName.slug}/${node.node.slug}`} key={node.node.contentful_id}>
            <div className="bot-nav-cards-line">
                   
                   
                    
                    <h2 className="card-post-list-title">
                        {node.node.title}
                    </h2>
                   
                    <div className="card-author-block-line">
                        
                        <div className="card-author-avatar">
                       
                            {node.node.author ? <GatsbyImage image={node.node.author.avatar.gatsbyImageData} alt={node.node.author ? `${node.node.author.name}'s avatar` : undefined} />: <StaticImage src="../images/default-portrait.jpg" alt={node.node.author ? node.node.author.name : 'author avatar'}></StaticImage>}
                    
                        </div>
                        <div className="card-author-name-line">
                       
                        {node.node.author ? node.node.author.name : undefined}
                        </div>
                        
                        <span className='card-post-date'>{node.node.createdAt}</span>

                    </div>

                </div>
            </Link>
        )
    }

    return (
        <div id="bot-section-container">
          <span className='section-header'>Older Releases</span>
            <div className='bot-content-container-home'>
            {renderBottomFourPosts()}
            </div>
        </div>
    )
}

export default BotBlock