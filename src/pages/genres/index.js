import * as React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import HeaderNav from '../../components/headerNav'
import { Link } from 'gatsby'
import Footer from '../../components/footer'
import { graphql } from 'gatsby'
import Seo from '../../components/seo'

const GenresPage = ({data}) => {

    return (
        <div id="App"> 
            <div id="top-section-container">
            <HeaderNav headerTitle="Genre" headerTxt="Content Genre" curPage="genres" ></HeaderNav>
            </div>
            <div id="bot-section-container">
            <div className='authors-content-container'>
                

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
        allContentfulGenreTags {
            edges {
              node {
                slug
                title
                contentful_id
              }
            }
          }
    }
`


export const Head = () => <Seo title="Genres" description="A page with a list of genres"></Seo>

export default GenresPage