import React from 'react'
import Hero from '../components/Hero'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
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
    </div>
  )
}

export default Home