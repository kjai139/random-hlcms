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
    
    // console.log(data.site.siteMetadata.title)
    const ldJsonScript = {
        "@context": "https://schema.org",
        "type": "WebSite",
        "name": data.site.siteMetadata.title,
        "url": data.site.siteMetadata.siteUrl
    };


    return (
        <>
        <title>{title? `${title} | ${data.site.siteMetadata.title}` : data.site.siteMetadata.title}</title>
        <meta name='description' content={description? description : data.site.siteMetadata.description}></meta>
        
        <meta property='og:site_name' content={data.site.siteMetadata.title}></meta>
        <meta property='og:image' content={ogImg ? ogImg : 'https://images.ctfassets.net/xjhjlusifrvm/53hFDWcYj3gFaUAG07YOq8/5c082616a9c52c26129b1ff9835f87f3/android-chrome-512x512.png' }></meta>
        <meta property='og:description' content={ogDesc? ogDesc : `Welcome to ${data.site.siteMetadata.title}, your ultimate destination for translated novels! Browse our extensive collection of translated novels, with new chapters regularly updated. Explore ${data.site.siteMetadata.title} now and indulge in the magic of translated novels`} />
        <meta property='og:title' content={title? `${title} | ${data.site.siteMetadata.title}` : `${data.site.siteMetadata.title}`}></meta>
        <meta property='og:image:secure_url' content={ogImg ? ogImg : '"https://images.ctfassets.net/xjhjlusifrvm/53hFDWcYj3gFaUAG07YOq8/5c082616a9c52c26129b1ff9835f87f3/android-chrome-512x512.png"'}></meta>
        <script type="application/ld+json">{JSON.stringify(ldJsonScript)}</script>

        
        </>

    )
}

export default Seo