import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Props {
    scrollPosition: number;
    borderClasses: string;
}

function Header({scrollPosition, borderClasses}: Props) {

    const [signInColor, setSignInColor] = useState('text-black');
    const [bgColor, setBgColor] = useState('bg-yellow-400');
    const [getStartedButtonStyle, setGetStartedButtonStyle] = useState('');
    const [followButtonStyle, setFollowButtonStyle] = useState('');

    useEffect(() => {
        // var position: number = +scrollPosition;

        if (scrollPosition > 100) {
            setBgColor('bg-white')
            setSignInColor('text-green-600')
            setFollowButtonStyle('text-white bg-green-600')
            setGetStartedButtonStyle('border-green-600 text-black');            
        }
        else {
            setBgColor('bg-yellow-400')
            setSignInColor('text-black')
            setFollowButtonStyle('border-black bg-black text-white')            
            setGetStartedButtonStyle('border-black bg-black text-white')
        }
    }, [scrollPosition])

    return (
        <header className={`flex justify-between p-5 max-w-7xl mx-auto h-75 bg-animate ${borderClasses} ${bgColor}`}>
            <div className='flex items-center space-x-5'>
                <Link href="/">
                    <img
                        className='w-44 object-contain cursor-pointer'
                        src="https://links.papareact.com/yvf"
                        alt="" />
                </Link>
                <div className='hidden md:inline-flex items-center space-x-5'>
                    <h3>About</h3>
                    <h3>Contact</h3>
                    <h3 className={`px-4 py-1 rounded-full color-animate ${followButtonStyle}`}>Follow</h3>
                </div>
            </div>
            <div className='flex items-center space-x-5 text-black'>
                <h3 className={`${signInColor} color-animate`}>Sign In</h3>
                <h3 className={`border px-4 py-1 rounded-full color-animate ${getStartedButtonStyle}`}>Get Started</h3>
            </div>
        </header>
    )
}

export default Header