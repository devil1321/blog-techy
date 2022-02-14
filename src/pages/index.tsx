import React from 'react'
import Seo from '../components/seo.component'
import Layout from '../components/layout.component'

const Home = () => {
  return (
    <Layout>
      <div className="home-page">
        <Seo title ="Technology | Blogs" /> 
        home page
      </div>
    </Layout>
  )
}

export default Home