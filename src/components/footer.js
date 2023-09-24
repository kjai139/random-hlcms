import * as React from 'react'


import { StaticImage } from 'gatsby-plugin-image'



const Footer = () => {
    return (
        <div className='footer-section-container'>
            <div className='footer-sect'>
                
                
                
            </div>
            <div className='footer-sect'>
                
            </div>
            <div className='footer-sect'>
            <h4>Donations</h4>
            
            <a id='kofi-link' href='https://ko-fi.com/wnnexus' target='_blank' rel='noopener noreferrer' title='Link opens in a new window' className='kofi-link-btn'><div className='kofi-btn'><div className='kofi-img'><StaticImage src='../images/kofi-logo.png' alt='kofi donation button'></StaticImage></div><span>Support Us on Ko-fi</span></div></a>
            </div>
        </div>
    )
}


export default Footer