import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import home_pageimg from "../Assets/home_pageimg.jpg"

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Trigger animations after component mounts
        setIsLoaded(true);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px]">
                    <svg viewBox="0 0 400 400" className="w-full h-full animate-spin-slow">
                        <defs>
                            <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.5 }} />
                            </linearGradient>
                        </defs>
                        {[...Array(60)].map((_, i) => {
                            const angle = (i * 6 * Math.PI) / 180;
                            const radius = i * 3;
                            const x = 200 + radius * Math.cos(angle);
                            const y = 200 + radius * Math.sin(angle);
                            return (
                                <circle
                                    key={i}
                                    cx={x}
                                    cy={y}
                                    r="1"
                                    fill="url(#spiralGradient)"
                                    opacity={0.6}
                                />
                            );
                        })}
                    </svg>
                </div>
            </div>

            {/* Gradient Orb Effects - More Dynamic */}
            <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 right-1/2 w-60 h-60 bg-pink-400 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content - Slightly Left Aligned */}
                    <div className="flex flex-col items-start text-left space-y-10 ml-0 md:ml-8">
                        {/* Heading with Gradient Text - Fade In from Left */}
                        <h1
                            className={`text-7xl md:text-8xl font-extrabold leading-tight transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                                }`}
                        >
                            <span className="bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                                WallPix
                            </span>
                        </h1>

                        {/* Description with Better Typography - Fade In from Left with Delay */}
                        <p
                            className={`text-gray-200 text-xl md:text-2xl max-w-lg leading-relaxed font-light tracking-wide transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                                }`}
                        >
                            Discover, download, and customize{' '}
                            <span className="text-pink-400 font-semibold">stunning wallpapers</span>,
                            remove backgrounds easily, and explore beautiful images across categories.
                        </p>

                        {/* CTA Button - Left Aligned with Enhanced Design - Fade In from Bottom */}
                        <div
                            className={`flex flex-col items-start space-y-6 w-full transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                        >
                            <Link
                                to="/register"
                                className="group relative px-12 py-4 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white text-lg font-bold rounded-full overflow-hidden shadow-2xl shadow-pink-500/50 hover:shadow-pink-500/70 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                            >
                                <span className="relative z-10">Get Started</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>

                            {/* Additional CTA Info */}
                            <p className="text-gray-400 text-sm">
                                Join thousands of creators • Free forever
                            </p>
                        </div>


                    </div>

                    {/* Right Content - Enhanced Decorative Element with Image - Fade In from Right */}
                    <div
                        className={`hidden md:block relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                            }`}
                    >
                        <div className="relative flex items-center justify-center min-h-[500px]">
                            {/* Decorative circles in background */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="absolute w-96 h-96 border border-pink-500/20 rounded-full animate-pulse"></div>
                                <div className="absolute w-80 h-80 border border-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                <div className="absolute w-64 h-64 border border-pink-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                            </div>

                            {/* Image Container with Floating Animation */}
                            <div className="relative z-10 w-full max-w-md">
                                <div className="relative group cursor-pointer">
                                    {/* Glowing effect behind image */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                                    {/* Image with border and shadow */}
                                    <div className="relative bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-1 rounded-2xl backdrop-blur-sm border border-pink-500/30 transform transition-all duration-500 hover:scale-105 hover:rotate-2">
                                        <img
                                            src={home_pageimg}
                                            alt="Stunning Wallpaper"
                                            className="w-full h-auto rounded-xl shadow-2xl object-cover aspect-[4/5]"
                                        />

                                        {/* Overlay gradient on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl flex items-end justify-center pb-8">
                                            <span className="text-white font-semibold text-lg">Premium Collection</span>
                                        </div>
                                    </div>

                                    {/* Floating badge */}
                                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce">
                                        4K Quality
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Home;