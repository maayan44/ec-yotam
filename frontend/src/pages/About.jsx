import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/assets.js';
import { Helmet } from 'react-helmet-async'

const About = () => {
  return (
    <div>

      {/* Dynamic page title and meta for SEO */}
      <Helmet>
        <title>צור קשר | Interproduct</title>
        <meta name="description" content="צרו קשר עם צוות אינטרפרודקט. טלפון: 053-594-4674 או במייל." />
      </Helmet>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'אודות'} text2={'החברה'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 items-center justify-center'>
        <video
          className='w-full md:max-w-[450px] object-cover'
          src={assets.vid1}
          poster={assets.vid1_poster} // Pic till video loads
          autoPlay
          muted
          loop
          playsInline
        />

        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-[#646661]'>
          <p>
            אינטרפרודקט מתמחה בייבוא ושיווק מוצרים איכותיים לטיפוח, ניקוי ושימור מראה הרכב. החברה מציעה מגוון פתרונות מתקדמים המתאימים הן למשתמשים פרטיים והן לאנשי מקצוע, תוך דגש על איכות, יעילות ונוחות שימוש.
          </p>
          <p>
            המוצרים נבחרים בקפידה מתוך מטרה לספק תוצאות מבריקות, הגנה לאורך זמן ושמירה על ערך הרכב. אנחנו באינטרפרודקט מאמינים כי תחזוקה נכונה מתחילה בחומרים הנכונים, ולכן אנו מקפידים על סטנדרטים גבוהים ושירות מקצועי.
          </p>
          <p>
            המטרה שלנו היא לאפשר לכל אחד ליהנות מרכב נקי, מטופח ונראה כמו חדש – בקלות וביעילות.
          </p>
          <b className='text-[#1A1A1A]'>המשימה שלנו</b>
          <p>
            אנו שואפים להנגיש מוצרי טיפוח מקצועיים לכל אחד, תוך שמירה על סטנדרטים גבוהים של איכות ושירות.
          </p>
        </div>
      </div>

      {/* Why to choose us section 
      <div className='text-xl py-4'>
        <Title text1={'למה'} text2={'לבחור בנו'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 text-[#646661]'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-[#1A1A1A]'>Quality Assurance:</b>
          <p>Every garment in our collection undergoes a rigorous multi-step inspection process to ensure it meets our exacting standards.
            We meticulously vet our textiles for durability and colorfastness, ensuring your favorite pieces maintain their integrity wash after wash.
            By combining traditional craftsmanship with modern technology, we deliver premium apparel that is truly built to last.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-[#1A1A1A]'>Convenience:</b>
          <p>We've streamlined our shopping experience to ensure that building a responsible wardrobe is as effortless as wearing it.
            From our intuitive interface to our flexible shipping options, every touchpoint is designed with your busy lifestyle in mind.
            At LE TRUE, we make high-end, ethical fashion accessible and easy to integrate into your daily routine.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b className='text-[#1A1A1A]'>Exceptional Customer Service:</b>
          <p>Our relationship with our community extends far beyond the checkout page.
            Our dedicated team is here to assist you with everything from detailed styling advice to seamless returns and exchanges.
            We pride ourselves on providing a personalized experience that reflects the same care and attention to detail found in every garment we produce.</p>
        </div>
      </div>
      */}

    </div>
  )
}

export default About