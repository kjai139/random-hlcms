import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

const TopPosts = () => {

    // const data = useStaticQuery(graphql`
   
    // query{
    //     allContentfulNovelChapters(limit: 2, sort: {createdAt: DESC}) {
    //         edges {
    //           node {
    //             createdAt(formatString: "MMMM DD, YYYY")
                
    //             contentful_id
    //             slug
    //             postTitle
    //             thumbnail {
    //               gatsbyImageData
    //               title
    //               url
    //             }
    //             parent {
    //               categoryName
    //               contentful_id
    //               slug
    //             }
                
    //             author {
    //                 avatar {
    //                   gatsbyImageData
    //                 }
    //                 name
    //                 slug
    //               }
    //           }
    //         }
    //       }
    //     }
    // `)

    const renderMostRecentTwo = () => {
        return (

            <div>TEMP RECENT</div>
            // data.allContentfulBlogPost.edges.slice(0, 2).map( (node) => {
            //     const image = getImage(node.node.thumbnail)
            //     const authorAvatar = getImage(node.node.soleAuthor[0].avatar)
            //     return (
            //         <div className="bot-nav-cards" key={node.node.contentful_id}>
            //         <div className="card-img-container">
            //         {node.node.thumbnail && <Link to={`${node.node.slug}`}><GatsbyImage image={image} alt={node.node.thumbnail && node.node.thumbnail.title} /></Link> }
                       
    
            //         </div>
            //         <ul className="tag-list">
            //             <li><Link to={`/categories/${node.node.catRef.slug}`}>{node.node.catRef.categoryName}</Link></li>
            //         </ul>
            //         <Link to={`${node.node.slug}`}>
            //         <h2 className="card-post-title dark-b-txt">
            //             {node.node.postTitle}
            //         </h2>
            //         <p className="card-excerpt dark-b-txt">
            //             {node.node.excerpt}
            //         </p>
            //         </Link>
            //         <div className="card-author-block">
                        
            //             <div className="card-author-avatar">
                       
            //                 {node.node.soleAuthor ? <Link to={`/authors/${node.node.soleAuthor[0].slug}`}><GatsbyImage image={authorAvatar} alt={node.node.soleAuthor ? `${node.node.soleAuthor[0].name}'s avatar` : undefined} /></Link>: <StaticImage src="../images/default-portrait.jpg" alt={node.node.author ? node.node.author[0] : 'author avatar'}></StaticImage>}
                    
            //             </div>
            //             <div className="card-author-name">
                       
            //             {node.node.soleAuthor ? <Link to={`/authors/${node.node.soleAuthor[0].slug}`}>{node.node.soleAuthor[0].name}</Link> : undefined}
            //             </div>
                        
            //             <span className='card-post-date'>{node.node.createdAt}</span>

            //         </div>
                    

            //     </div>
            //     )
            // })
        )
    }


    
    return (
        <div className="bot-nav-container">
        {/* {renderMostRecentTwo()} */}
    

        </div>
    )
}



export default TopPosts