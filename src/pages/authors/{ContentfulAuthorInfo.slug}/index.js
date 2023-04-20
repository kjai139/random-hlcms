import { graphql } from 'gatsby'
import * as React from 'react'
import Seo from '../../../components/seo'
import HeaderNav from '../../../components/headerNav'
import { GatsbyImage } from 'gatsby-plugin-image'
import  Footer  from '../../../components/footer'
import Layout from '../../../components/layout'


const AuthorPanel = ({data}) => {
        return (
            <Layout>
             
                <div id="top-section-container">
                    <HeaderNav headerTitle={data.contentfulAuthorInfo.name} headerTxt='Translator' curPage="authors2" inArc={true} inCat={false}></HeaderNav>
                </div>
                <div id="bot-section-container">
                    <div className='authors-content'>
                <div className='authors-details-container'>
                    <div className='authors-details-avatar'>
                    {data.contentfulAuthorInfo.name ? 
                    <GatsbyImage image={data.contentfulAuthorInfo.avatar.gatsbyImageData} alt={data.contentfulAuthorInfo.avatar.description} /> : null }
                    </div>
                    <div className='authors-details-description'>
                        <h3 className='authors-details-head'>Translator</h3>
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


            
            </Layout>
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

export const Head = ({data}) => <Seo title={`tL-Nexus - ${data.contentfulAuthorInfo.name}`}description={`Author page of ${data.contentfulAuthorInfo.name}`}></Seo>


export default AuthorPanel