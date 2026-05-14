import React from 'react'
import Hero from '../components/Hero'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import BrandLogos from '../components/BrandLogos'
import Categories from '../components/Categories'

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <BestSeller />
      <BrandLogos />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home