import * as React from 'react'
import Searchbar from './searchbar'
import { Link } from 'gatsby'


const Footer = () => {
    return (
        <div className='footer-section-container'>
            <div className='footer-sect'>
                <h4>Search the site</h4>
                <Searchbar isBottom={true} />
                
                
            </div>
            <div className='footer-sect'>
                <h4>Content Categories</h4>
                <ul className='footer-list'>
                    <li><Link to='/categories/home-office'>Home Office</Link></li>
                    <li><Link to='/categories/gaming'>Gaming</Link></li>
                    <li><Link to='/categories/streaming'>Streaming</Link></li>

                </ul>
            </div>
            <div className='footer-sect'>
                <h4>About us</h4>
                <span><Link to='/authors'>Our Authors</Link></span>
                <h4>Contact Us</h4>
                <span>© 2023 Deskego.com</span>
            </div>
        </div>
    )
}


export default Footer