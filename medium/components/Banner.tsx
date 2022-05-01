import React from 'react'

function Banner() {
    return (
        <div className='flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0'>
            <div className='px-10 space-y-5'>
                <h1 className='text-6xl max-w-xl font-serif'><span className='underline decoration-black decoration-4'>This site</span> is for educational purposes only &amp; is in no way related to Medium.com</h1>
                <h2>It's easy and free to post your thinking on any topic and connect with millions of readers.</h2>
            </div>

            <img className='hidden md:inline-flex h-32 lg:h-full'
                src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="" />
        </div>
    )
}

export default Banner