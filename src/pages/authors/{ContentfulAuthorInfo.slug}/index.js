import { graphql } from 'gatsby'
import * as React from 'react'
import Seo from '../../../components/seo'
import Topblock from '../../../components/topblock'
import { GatsbyImage } from 'gatsby-plugin-image'
import  Footer  from '../../../components/footer'
import { Link } from 'gatsby'

const AuthorPanel = ({data}) => {
        return (
            <div id="App"> 
                <div id="top-section-container">
                    <Topblock headerTitle={data.contentfulAuthorInfo.name} headerTxt='Writer' curPage="authors2" inArc={true} inCat={false}></Topblock>
                </div>
                <div id="bot-section-container">
                    <div className='authors-content'>
                <div className='authors-details-container'>
                    <div className='authors-details-avatar'>
                    {data.contentfulAuthorInfo.name ? 
                    <GatsbyImage image={data.contentfulAuthorInfo.avatar.gatsbyImageData} alt={data.contentfulAuthorInfo.avatar.description} /> : null }
                    </div>
                    <div className='authors-details-description'>
                        <h3 className='authors-details-head'>Author</h3>
                        <h1>{data.contentfulAuthorInfo.name}</h1>
                        <p>{data.contentfulAuthorInfo.about}</p>
                    </div>
        
                    

                    

                </div>
                <div className='authors-bot-section'>
                
                        
                
                        
                </div>
                </div>
                </div>
                <footer id="footer-section-container">
                <Footer />

                </footer>


            </div>
        )
}




export const query = graphql`
    query($id: String) {
        contentfulAuthorInfo(id: {eq: $id}) {
            name
            avatar {
                description
                gatsbyImageData
            }
            about
        }
        
    }`

export const Head = ({data}) => <Seo title={`JPWNHUB- ${data.contentfulAuthorInfo.name}`}description={`Author page of ${data.contentfulAuthorInfo.name}`}></Seo>


export default AuthorPanel