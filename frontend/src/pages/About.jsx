import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets/assets';

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-[#646661]'>
          <p>At our core, we believe that style should never come at the expense of comfort or conscience. 
            We carefully source premium, sustainable fabrics to create timeless silhouettes that transition seamlessly from a busy morning meeting to a relaxed weekend getaway. 
            Every stitch is a testament to our commitment to quality, ensuring that each piece becomes a lasting staple in your curated wardrobe.</p>
          <p>Our design philosophy is rooted in the intersection of modern minimalism and functional elegance. We don't just follow trends; 
            we study how people move, work, and live to create apparel that empowers individual expression. By focusing on versatile designs and ethical manufacturing, 
            we provide our community with the confidence to look their best while supporting a more responsible fashion industry.</p>
          <b className='text-[#535551]'>Our Mission</b>
          <p>Our mission at LE TRUE is to redefine the standard of modern apparel by harmonizing innovative design with uncompromising ethical practices. 
            We strive to inspire a global community to dress with intention, offering high-quality 
            garments that celebrate both personal style and a commitment to a healthier planet.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 text-[#646661]'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-[#535551]'>Quality Assurance:</b>
          <p>Every garment in our collection undergoes a rigorous multi-step inspection process to ensure it meets our exacting standards. 
             We meticulously vet our textiles for durability and colorfastness, ensuring your favorite pieces maintain their integrity wash after wash. 
             By combining traditional craftsmanship with modern technology, we deliver premium apparel that is truly built to last.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-[#535551]'>Convenience:</b>
          <p>We’ve streamlined our shopping experience to ensure that building a responsible wardrobe is as effortless as wearing it. 
             From our intuitive interface to our flexible shipping options, every touchpoint is designed with your busy lifestyle in mind. 
             At LE TRUE, we make high-end, ethical fashion accessible and easy to integrate into your daily routine.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-[#535551]'>Exceptional Customer Service:</b>
          <p>Our relationship with our community extends far beyond the checkout page. 
             Our dedicated team is here to assist you with everything from detailed styling advice to seamless returns and exchanges. 
             We pride ourselves on providing a personalized experience that reflects the same care and attention to detail found in every garment we produce.</p>
        </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
