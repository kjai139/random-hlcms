import { graphql } from 'gatsby'
import * as React from 'react'

const CatTemp = ({data}) => {

    console.log(data, 'from catTemp')
    



    return (
        <div> CAT PAGES</div>
    )
}

export const query = graphql`
    query($id: String) {
        allContentfulCategory(
            sort: {categoryName: ASC},
            filter: {
                id: {
                    eq: $id
                }
        }) {
            edges {
              node {
                slug
                categoryName
                childCat {
                  slug
                  contentful_id
                  title
                }
              }
            }
          }
    }
`


export default CatTemp