import { graphql } from 'gatsby'
import * as React from 'react'
import Seo from '../../components/seo'
import HeaderNav from '../../components/headerNav'

const CatePage = (props) => {
    console.log(props, 'from catepage')

    return (
        <div id="App"> 
        <div id="top-section-container">
        <HeaderNav headerTitle="Categories" headerTxt="Take a look at our categories" curPage="categories" inCat={true}></HeaderNav>
        </div>

        <div className='reviews-content-container'>
           

        </div>


        </div>
    )
}
export const query = graphql`
    query{
        allContentfulCategory {
        edges {
            node {
            categoryName
            contentful_id
            slug
            }
        }
        }
    }
`


export const Head = () => <Seo title="Categories" description="An Index page that contains all of our content categories"></Seo>

export default CatePage