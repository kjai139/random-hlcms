import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'



const Seo = ({title, description, siteUrl, ogImg, ogTitle, ogDesc}) => {

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    siteUrl
                }
            }
        }
    `)
    
    


    return (
        <>
        <title>{title? title : data.site.siteMetadata.title}</title>
        <meta name='description' content={description? description : data.site.siteMetadata.description}></meta>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
        <meta property='og:image' content={ogImg ? ogImg : 'https://images.ctfassets.net/z6w0khw4r6q1/4gE0xQWPfopxSspwb62gBJ/d956f16d7cd8a5fb17c9312de2de8b86/logo.png' }></meta>
        <meta property='og:description' content={ogDesc? ogDesc : 'Welcome to JPHUB, your ultimate destination for translated novels! Discover a world of captivating stories brought to life through our expert translations. Immerse yourself in an array of genres, from romance to fantasy, action to mystery. Browse our extensive collection of translated novels, with new chapters regularly updated. Join our community of avid readers and embark on an unforgettable literary journey. Explore [Website Name] now and indulge in the magic of translated novels'} />
        <meta property='og:title' content={title? `${title} | Deskego.com` : 'Deskego.com'}></meta>
        <meta property='og:image:secure_url' content={ogImg ? ogImg : 'https://images.ctfassets.net/z6w0khw4r6q1/4gE0xQWPfopxSspwb62gBJ/d956f16d7cd8a5fb17c9312de2de8b86/logo.png'}></meta>
        </>

    )
}

export default Seo