import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='text-center py-12 px-4'>
      <p className='text-2xl font-medium text-[#1A1A1A]'>הירשמו וקבלו 10% הנחה</p>
      <p className='text-[#8C8C8C] mt-3'>
        הישארו מעודכנים במבצעים, מוצרים חדשים וטיפים מקצועיים
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 mx-auto my-6 flex items-stretch rounded-full border border-[#1A1A1A] overflow-hidden'>
          <button type='submit' className='bg-[#C0001A] text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#a00016] transition-colors whitespace-nowrap'>
            הרשמה
          </button>
          <input
            className='w-full outline-none text-right px-5 py-3 bg-white text-sm'
            type="email"
            placeholder='הכניסו את האימייל שלכם'
            required
          />
      </form>
    </div>
  )
}

export default NewsletterBox