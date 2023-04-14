
import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Searchbar from "./searchbar"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"





const Topblock = ({headerTitle, headerTxt, curPage, inCat=false, inArc=false}) => {

    // const data = useStaticQuery(graphql`
    //     query {
    //         allContentfulCategory {
    //         edges {
    //             node {
    //             categoryName
    //             contentful_id
    //             slug
    //             }
    //         }
    //         }
           
    //     }
    // `)

    // console.log(data, 'data from topblock')
    // console.log(inCat, curPage)
    return (
            
            <header className="top-nav-container">
            <div id="top-nav-div">
                <div id="site-logo">
                    
                    {/* {data.contentfulAsset ? <div className="siteLogo-container"><Link to="/"><GatsbyImage image={data.contentfulAsset.gatsbyImageData} alt="Deskego.com site logo"></GatsbyImage></Link></div> :<div><Link to="/">JPW Hub</Link></div> } */}
                        
                    
                </div>
                <nav id="top-nav">
                    
                    {/* <input type="checkbox" id="menu-toggle"></input>
                    <label htmlFor='menu-toggle' className="menu-icon">&#9776;</label> */}
                    <ul className="navMenu">
                        <li>
                            <Searchbar />
                            {/* <button id="searchBtn">
                                <span className="material-symbols-outlined">search</span>
                            </button> */}
                        </li>
                    </ul>

                </nav>
            </div>
            <div id="top-section-bottom">
                <div className="top-section-headers-cont">
                    <h1 className="top-sect-header">
                        {headerTitle ? headerTitle : 'JPW HUB'}
                    </h1>
                   
                    {headerTxt? <p className="top-sect-header-txt"> {headerTxt}</p> : null}
                        
    
                    {/* {curPage === 'home' ? <div className="header-small-img"><StaticImage src='../images/whiteDesk.png' alt="a white desk"></StaticImage></div> : null} */}
                </div>
            </div>
            </header>
            
        
    )
}




export default Topblock