'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import GSAPHeroAnimation from './components/gsapanimation';
import AnimatedMockup from './components/AnimatedMockup';
import Animatedslide from './components/Animatedslides';
import {
    Calendar,
    Users,
    Sparkles,
    Target,
    Award,
    ArrowRight,
    Play,
    CheckCircle,
    Globe,
    Mic,
    Gift,
    Heart,
    Star,
    Zap,
    Camera,
    Music
} from 'lucide-react';

export default function Home() {
    const [currentService, setCurrentService] = useState(0);
    const servicesContainerRef = useRef<HTMLElement>(null);

    const services = [
        {
            title: ' CREATING A COMMUNITY',
            subtitle: 'Socializing activities that drive crazy moments ',
            description: "We bringing people together to create a friendly, inclusive community. Whether you’re new in town, returning after years, or a long-time resident, our events provide a safe and welcoming space where you can meet like-minded individuals and growlasting friendships.",
            icon: <Target className="w-6 h-6" />,
            color: 'yellow',
            image:
                '/9.jpg',
        },
        {
            title: 'CONNECTING PEOPLE, BUILDING FRIENDSHIPS',
            subtitle: 'Your perfect day, beautifully orchestrated',
            description: "Moving to a new place or coming back after a long time can feel lonely. We make that transition easier by offering ready made opportunities to connect with others. Through our hangouts, people can quickly find friends, share experiences, and feel a sense of belonging and turning the city into a home..",
            icon: <Heart className="w-6 h-6" />,
            color: 'blue',
            image:
                '/16.jpg',
        },
        {
            title: 'EXPLORING PLACES',
            subtitle: 'Memorable connections that drive loyalty',
            description: "From scenic treks and café meetups to cultural events and hidden gems, we help people discover the beauty and experiences Dehradun has to offer. Our aim is to encourage everyone to break free from daily routines, step away from screens, and create memories through real-life adventures.",
            icon: <Zap className="w-6 h-6" />,
            color: 'yellow',
            image:
                '/21.jpg',
        },

    ];

    useEffect(() => {
        const handleScroll = () => {
            const container = servicesContainerRef.current;
            if (!container) return;

            const containerRect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            const containerTop = containerRect.top;
            const containerHeight = containerRect.height;

            if (containerTop > windowHeight || containerTop + containerHeight < 0) {
                return;
            }

            const scrollProgress = Math.max(
                0,
                Math.min(1, -containerTop / (containerHeight - windowHeight))
            );

            const serviceIndex = Math.floor(scrollProgress * services.length);
            const clampedIndex = Math.max(0, Math.min(services.length - 1, serviceIndex));

            if (clampedIndex !== currentService) {
                setCurrentService(clampedIndex);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentService, services.length]);

    const getColorClasses = (color: string) => {
        const colors: Record<string, string> = {
            emerald: 'from-yellow-400 to-amber-500',
            rose: 'from-yellow-500 to-amber-600',
            blue: 'from-blue-500 to-blue-700',
            purple: 'from-blue-600 to-blue-800',
            cyan: 'from-yellow-400 to-blue-600',
            orange: 'from-yellow-500 to-amber-500',
            yellow: 'from-yellow-400 to-amber-500',
        };
        return colors[color] || colors.emerald;
    };

    const stats = [
        { number: '500+', label: 'Events Delivered', icon: <Calendar className="w-8 h-8" />, color: 'yellow' },
        { number: '50K+', label: 'Happy Guests', icon: <Users className="w-8 h-8" />, color: 'blue' },
        { number: '99%', label: 'Client Satisfaction', icon: <Star className="w-8 h-8" />, color: 'yellow' },
        { number: '8', label: 'Years Experience', icon: <Award className="w-8 h-8" />, color: 'blue' },
    ];

    const socialLinks = [
        { icon: <Music className="w-5 h-5" />, color: 'yellow' },
        { icon: <Camera className="w-5 h-5" />, color: 'blue' },
        { icon: <Mic className="w-5 h-5" />, color: 'yellow' },
        { icon: <Heart className="w-5 h-5" />, color: 'blue' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
            {/* Professional CSS animations */}
            <style jsx>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeInLeft {
                    0% {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes fadeInRight {
                    0% {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes scaleIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes gradientShift {
                    0% { 
                        background-position: 0% 50%;
                    }
                    50% { 
                        background-position: 100% 50%;
                    }
                    100% { 
                        background-position: 0% 50%;
                    }
                }
                
                @keyframes subtleFloat {
                    0%, 100% { 
                        transform: translateY(0px);
                    }
                    50% { 
                        transform: translateY(-5px);
                    }
                }
                
                @keyframes subtlePulse {
                    0%, 100% { 
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% { 
                        transform: scale(1.02);
                        opacity: 0.95;
                    }
                }
                
                @keyframes shimmer {
                    0% { 
                        background-position: -200% 0;
                    }
                    100% { 
                        background-position: 200% 0;
                    }
                }
                
                @keyframes rotateBackground {
                    0% { 
                        transform: rotate(0deg);
                    }
                    100% { 
                        transform: rotate(360deg);
                    }
                }
                
                /* Animation Classes */
                .fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                
                .fade-in-left {
                    animation: fadeInLeft 0.8s ease-out forwards;
                }
                
                .fade-in-right {
                    animation: fadeInRight 0.8s ease-out forwards;
                }
                
                .scale-in {
                    animation: scaleIn 0.6s ease-out forwards;
                }
                
                .gradient-text {
                    background: linear-gradient(45deg, #facc15, #f59e0b, #3b82f6, #facc15);
                    background-size: 300% 300%;
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradientShift 4s ease-in-out infinite;
                }
                
                .subtle-float {
                    animation: subtileFloat 3s ease-in-out infinite;
                }
                
                .subtle-pulse {
                    animation: subtlePulse 2s ease-in-out infinite;
                }
                
                .shimmer-effect {
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }
                
                .rotate-bg {
                    animation: rotateBackground 20s linear infinite;
                }
                
                /* Hover effects */
                .hover-lift:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
                
                .hover-scale:hover {
                    transform: scale(1.05);
                }
                
                .hover-glow:hover {
                    box-shadow: 0 10px 30px rgba(251, 191, 36, 0.3);
                }
                
                /* Stagger animations */
                .stagger-1 { animation-delay: 0.1s; }
                .stagger-2 { animation-delay: 0.2s; }
                .stagger-3 { animation-delay: 0.3s; }
                .stagger-4 { animation-delay: 0.4s; }
                .stagger-5 { animation-delay: 0.5s; }
                
                /* Professional transitions */
                .transition-smooth {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .transition-spring {
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
            `}</style>

            <Header />
            <CustomCursor />

            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24" style={{ marginBottom: '-15vh' }}>
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-yellow-300/20 to-amber-300/15 rounded-full blur-3xl subtle-pulse rotate-bg"></div>
                    <div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-r from-blue-300/15 to-amber-400/15 rounded-full blur-3xl subtle-pulse rotate-bg stagger-2"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-yellow-300/15 to-blue-300/15 rounded-full blur-3xl subtle-pulse stagger-3"></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <div className="mb-12" style={{ marginTop: '5vh' }}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
                            <span className="block text-gray-900 mb-2 fade-in-up stagger-1">Crafting</span>
                            <span className="block gradient-text fade-in-up stagger-2">Unforgettable</span>
                            <span className="block text-gray-900 fade-in-up stagger-3">Experiences</span>
                        </h1>

                        <section className="h-[110vh] relative" style={{ marginTop: '-25vh' }}>
                            <Animatedslide />
                        </section>

                        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light fade-in-up stagger-4" style={{ marginTop: '-35vh' }}>
                            Our purpose is to create a
                            friendly and welcoming space where strangers
                            become friends, weekends turn into adventures,
                            and meaningful connections are made beyond
                            screens.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center fade-in-up stagger-5" style={{ marginBottom: '10vh' }}>
                        <button className="group flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold rounded-xl transition-smooth hover-lift hover-glow">
                            <span className="mr-2">Explore Our Work</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
                        </button>
                        <button className="flex items-center px-8 py-4 bg-gray-200/90 backdrop-blur-sm text-gray-800 font-semibold rounded-xl transition-smooth hover-lift border border-gray-300">
                            <Play className="w-5 h-5 mr-2" />
                            Watch Our Story
                        </button>
                    </div>
                </div>
            </section>

            <section className="h-[110vh] relative" style={{ marginTop: '5vh' }}>
                <GSAPHeroAnimation />
            </section>

            {/* Services Section with Sticky Scroll Effect */}
            <section id="solutions" className="relative bg-gray-100" ref={servicesContainerRef} style={{ marginTop: '-15vh' }}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center py-20">
                        <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full text-sm text-yellow-600 mb-6 scale-in">
                            <Target className="w-4 h-4 mr-2" />
                            Our Expertise
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 fade-in-up">
                            What We <span className="gradient-text">Do</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-20 fade-in-up stagger-2">
                            Break social barriers,
                            inspire people to step out of their routines, and
                            build a close-knit community where everyone
                            feels they belong.
                        </p>
                    </div>

                    {/* Mobile Layout - Stack images with text */}
                    <div className="lg:hidden space-y-12 mb-20">
                        {services.map((service, index) => (
                            <div key={index} className={`bg-white rounded-3xl overflow-hidden shadow-xl transition-smooth hover-lift scale-in stagger-${index + 1}`}>
                                <div className="relative h-80">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-smooth hover-scale"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${getColorClasses(service.color)}/40 via-transparent to-transparent`} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    <div className="absolute top-6 left-6">
                                        <div className={`text-5xl font-bold bg-gradient-to-r ${getColorClasses(service.color)} bg-clip-text text-transparent`}>
                                            0{index + 1}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h4 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
                                        {service.title}
                                    </h4>
                                    <p className="text-lg font-semibold text-yellow-600 mb-4">
                                        {service.subtitle}
                                    </p>
                                    <p className="text-base text-gray-700 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Layout - Original sticky scroll */}
                    <div className="hidden lg:flex flex-col lg:flex-row gap-12">
                        {/* Left Side - Service Descriptions */}
                        <div className="lg:w-1/2 mb-15">
                            <div
                                className="space-y-0 mb-15"
                                style={{ height: `${services.length * 67}vh` }}
                            >
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="h-1/3 flex items-center"
                                    >
                                        <div className="max-w-lg">
                                            <div className="flex items-center space-x-6 mb-2">
                                                <div className={`text-7xl font-bold bg-gradient-to-r ${getColorClasses(service.color)} bg-clip-text text-transparent`}>
                                                    0{index + 1}
                                                </div>
                                            </div>

                                            <h4 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                                                {service.title}
                                            </h4>

                                            <p className="text-xl font-semibold text-yellow-600 mb-6">
                                                {service.subtitle}
                                            </p>

                                            <p className="text-lg text-gray-700 leading-relaxed mb-8 text-justify">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Sticky Cards */}
                        <div className="lg:w-1/2">
                            <div className="flex flex-col gap-0 mb-10">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="sticky top-20 rounded-3xl overflow-hidden transition-smooth hover-lift"
                                        style={{ height: '500px' }}
                                    >
                                        <div className="relative h-full group">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                                            />

                                            <div className={`absolute inset-0 bg-gradient-to-t ${getColorClasses(service.color)}/40 via-transparent to-transparent`} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30 transition-smooth hover:bg-white">
                                                    <h5 className="text-2xl font-bold text-gray-900 mb-2">
                                                        {service.title}
                                                    </h5>
                                                    <p className="text-yellow-600 font-semibold text-lg">
                                                        {service.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className={`text-center group scale-in stagger-${index + 1}`}>
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${getColorClasses(stat.color)} text-white mb-4 transition-smooth hover-scale shadow-lg`}>
                                    {stat.icon}
                                </div>
                                <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${getColorClasses(stat.color)} bg-clip-text text-transparent`}>
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 text-sm font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Animated Mockup Section */}
            <section className="h-[110vh] bg-white relative mb-5">
                <AnimatedMockup />
            </section>

            <section id="contact" className="py-24 px-6 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 relative overflow-hidden living-gradient" style={{ marginTop: '2vh' }}>
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl living-wave living-stagger-1"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl living-wave living-stagger-2"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white fade-in-up living-text">
                        Ready to Join Our
                        <span className="block living-breathe text-yellow-100 ">hangout?</span>
                    </h2>
                    <p className="text-xl text-yellow-100 mb-12 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-2 living-float">
                        Let's work together to unlock new opportunities and achieve our goals
                        through a creative partnership.

                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center fade-in-up stagger-3">
                        <button className="flex items-center px-10 py-4 bg-white text-yellow-600 font-semibold rounded-xl transition-smooth hover-lift hover-glow shadow-xl living-button">
                            <span className="mr-2">Join Our Community</span>
                            <ArrowRight className="w-5 h-5 living-icon" />
                        </button>
                        <button className="px-10 py-4 border-2 border-white/30 text-white font-semibold rounded-xl transition-smooth hover:bg-white/10 hover:border-white/50 backdrop-blur-sm living-pulse">
                            View Our Past Hangouts
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="md:col-span-2 fade-in-left">
                            <div className="text-3xl font-bold text-gray-900 mb-4">
                                Dehradun Hangouts
                            </div>
                            <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-blue-600 rounded-full mb-6 shimmer-effect"></div>
                            <p className="text-gray-600 leading-relaxed max-w-md mb-6">
                                Dehradun Hangouts is a vibrant community
                                initiative designed to connect people through
                                shared experiences.
                            </p>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <div key={index} className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses(social.color)} text-white transition-smooth hover-scale cursor-pointer shadow-lg`}>
                                        {social.icon}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="fade-in-up stagger-2">
                            <h4 className="text-gray-900 font-semibold mb-6">What We Do</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="text-gray-600 hover:text-yellow-600 transition-smooth"> CREATING A COMMUNITY</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-yellow-600 transition-smooth"> CONNECTING PEOPLES</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-yellow-600 transition-smooth"> EXPLORING PLACES</a></li>
                            </ul>
                        </div>

                        <div className="fade-in-up stagger-3">
                            <h4 className="text-gray-900 font-semibold mb-6">Contact</h4>
                            <div className="space-y-3 text-sm text-gray-600">
                                <p className="hover:text-yellow-600 transition-smooth cursor-pointer">dehradunhangouts@gmail.com</p>
                                <p className="hover:text-yellow-600 transition-smooth cursor-pointer">+91 9997997266</p>
                                <p className="hover:text-yellow-600 transition-smooth cursor-pointer">Dehradun, IN</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-yellow-200 mt-12 pt-8 text-center text-gray-500 text-sm fade-in-up stagger-4">
                        <p>© 2025 Dehradun Hangouts. Creating extraordinary moments worldwide.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}