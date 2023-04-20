import * as React from "react"
import HeaderNav from "../components/headerNav"
import Seo from "../components/seo"

import BotBlock from "../components/botblock"
import TopPosts from "../components/topposts"
import Footer from "../components/footer"
import { Link } from "gatsby"
import Layout from "../components/layout"

const HomePage = () => {

  

  return (
    <Layout>
      <div id="top-section-container">
        <HeaderNav curPage="home"/>
        {/* <div className="section-headers"><h2>Latest Releases</h2></div> */}
        <TopPosts />
      </div>
    <BotBlock />
    <div className='view-more-cont'>
                <Link to='/archive'>
                <button className='view-more-btn'>VIEW OLDER POSTS</button>
                </Link>
            </div>
    <footer id="footer-section-container">
      <Footer />

    </footer>
    </Layout>
  )
}




export const Head = () => <Seo />

export default HomePage