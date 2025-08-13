'use client';

import React, { useState, useEffect, useRef } from 'react';
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
import AnimatedMockup from './components/AnimatedMockup';

// Custom Header Component
function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => document.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const navItems = [
        { name: 'Portfolio', key: 'portfolio' },
        { name: 'Solutions', key: 'solutions' },
        { name: 'Process', key: 'process' },
        { name: 'Contact', key: 'contact' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg'
                    : 'bg-transparent'
            }`}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="relative group">
                        <div className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${
                            scrolled ? 'text-gray-900' : 'text-gray-900'
                        }`}>
                            Events
                        </div>
                        <div className="absolute -bottom-1 left-0 w-8 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.key}
                                href={`#${item.key}`}
                                className={`relative text-sm font-medium transition-all duration-300 ${
                                    activeSection === item.key
                                        ? 'text-gray-900'
                                        : 'text-gray-600 hover:text-emerald-500'
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveSection(item.key);
                                }}
                            >
                                {item.name}
                                {activeSection === item.key && (
                                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
                                )}
                            </a>
                        ))}
                        <button className="ml-4 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default function Home() {
    const [currentService, setCurrentService] = useState(0);
    const servicesContainerRef = useRef(null);

    const services = [
        {
            title: 'Corporate Excellence',
            subtitle: 'Strategic business events that drive results',
            description:
                "Transform your corporate gatherings into powerful networking experiences that drive business growth and team cohesion. Our expert team crafts professional environments that foster meaningful connections, enhance brand presence, and deliver measurable results for your organization's strategic objectives.",
            icon: <Target className="w-6 h-6" />,
            color: 'emerald',
            image:
                'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80',
        },
        {
            title: 'Dream Weddings',
            subtitle: 'Your perfect day, beautifully orchestrated',
            description:
                'Create magical wedding experiences with meticulous attention to every detail, ensuring your special day is flawlessly executed. From intimate ceremonies to grand celebrations, we bring your dream wedding to life with elegance, sophistication, and personalized touches that reflect your unique love story.',
            icon: <Heart className="w-6 h-6" />,
            color: 'rose',
            image:
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        },
        {
            title: 'Brand Activations',
            subtitle: 'Memorable connections that drive loyalty',
            description:
                'Engage your audience through immersive brand experiences that create lasting impressions and drive customer loyalty. Our innovative activation strategies combine creativity with strategic thinking to maximize brand impact, audience engagement, and create authentic connections between your brand and consumers.',
            icon: <Zap className="w-6 h-6" />,
            color: 'blue',
            image:
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        },
        {
            title: 'Social Celebrations',
            subtitle: "Celebrate life's moments in style",
            description:
                "From intimate dinner parties to grand milestone celebrations, we craft personalized social events that reflect your unique vision and style. Our comprehensive approach ensures every detail contributes to an unforgettable experience that brings people together and creates cherished memories for years to come.",
            icon: <Users className="w-6 h-6" />,
            color: 'purple',
            image:
                'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!servicesContainerRef.current) return;

            const container = servicesContainerRef.current;
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

    const getColorClasses = (color) => {
        const colors = {
            emerald: 'from-emerald-500 to-teal-500',
            rose: 'from-rose-500 to-pink-500',
            blue: 'from-blue-500 to-cyan-500',
            purple: 'from-purple-500 to-indigo-500',
            cyan: 'from-cyan-500 to-blue-500',
            orange: 'from-orange-500 to-yellow-500',
        };
        return colors[color] || colors.emerald;
    };

    const stats = [
        { number: '500+', label: 'Events Delivered', icon: <Calendar className="w-8 h-8" />, color: 'emerald' },
        { number: '50K+', label: 'Happy Guests', icon: <Users className="w-8 h-8" />, color: 'blue' },
        { number: '99%', label: 'Client Satisfaction', icon: <Star className="w-8 h-8" />, color: 'purple' },
        { number: '8', label: 'Years Experience', icon: <Award className="w-8 h-8" />, color: 'rose' },
    ];

    const socialLinks = [
        { icon: <Music className="w-5 h-5" />, color: 'emerald' },
        { icon: <Camera className="w-5 h-5" />, color: 'blue' },
        { icon: <Mic className="w-5 h-5" />, color: 'purple' },
        { icon: <Heart className="w-5 h-5" />, color: 'rose' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
            <Header />

            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <div className="mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-sm text-gray-700 mb-8 border border-gray-200 shadow-lg">
                            <Sparkles className="w-4 h-4 mr-2 text-emerald-500" />
                            Premium Event Management
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
                            <span className="block text-gray-900 mb-2">Crafting</span>
                            <span className="block bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">Unforgettable</span>
                            <span className="block text-gray-900">Experiences</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                            We transform your vision into reality through innovative event design,
                            meticulous planning, and flawless execution that exceeds expectations.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button className="group flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-emerald-500/25">
                            <span className="mr-2">Explore Our Work</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                        <button className="flex items-center px-8 py-4 bg-gray-200/90 backdrop-blur-sm text-gray-800 font-semibold rounded-xl hover:bg-gray-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-300">
                            <Play className="w-5 h-5 mr-2" />
                            Watch Our Story
                        </button>
                    </div>
                </div>
            </section>

            {/* Services Section with Sticky Scroll Effect */}
            <section id="solutions" className="relative bg-gray-100" ref={servicesContainerRef}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center py-20">
                        <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full text-sm text-emerald-500 mb-6">
                            <Target className="w-4 h-4 mr-2" />
                            Our Expertise
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                            What We <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Create</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-20">
                            From intimate gatherings to large-scale productions, we specialize in creating
                            events that inspire, engage, and leave lasting impressions.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 mb-20">
                        {/* Left Side - Service Descriptions */}
                        <div className="lg:w-1/2">
                            <div
                                className="space-y-0 mb-10"
                                style={{ height: `${services.length * 55}vh` }}
                            >
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="h-1/3 flex items-center "
                                    >
                                        <div className={`max-w-lg `}>
                                            <div className="flex items-center space-x-6 mb-2">
                                                <div className={`text-7xl font-bold bg-gradient-to-r ${getColorClasses(service.color)} bg-clip-text text-transparent`}>
                                                    0{index + 1}
                                                </div>
                                            </div>

                                            <h4 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                                                {service.title}
                                            </h4>

                                            <p className="text-xl font-semibold text-emerald-500 mb-6">
                                                {service.subtitle}
                                            </p>

                                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Sticky Cards */}
                        <div className="lg:w-1/2">
                            <div className="flex flex-col gap-0">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="sticky top-20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1"
                                        style={{ height: '500px' }}
                                    >
                                        <div className="relative h-full group">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover"
                                            />

                                            <div className={`absolute inset-0 bg-gradient-to-t ${getColorClasses(service.color)}/40 via-transparent to-transparent`} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                            <div className="absolute top-6 left-6 flex items-center space-x-3">
                                                <div className="p-3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl">
                                                    <div className={`p-2 rounded-xl bg-gradient-to-r ${getColorClasses(service.color)} text-white`}>
                                                        {service.icon}
                                                    </div>
                                                </div>
                                                <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-xl">
                                                    <span className="text-sm font-bold text-gray-900">0{index + 1}</span>
                                                </div>
                                            </div>

                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30">
                                                    <h5 className="text-2xl font-bold text-gray-900 mb-2">
                                                        {service.title}
                                                    </h5>
                                                    <p className="text-emerald-500 font-semibold text-lg">
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
                            <div key={index} className="text-center group">
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${getColorClasses(stat.color)} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
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
            
            <section className="h-[200vh] bg-white relative">
                <AnimatedMockup />
            </section>
            
            {/* CTA Section */}
            <section id="contact" className="py-24 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
                        Ready to Create Your<span className="block">Next Event?</span>
                    </h2>
                    <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Lets discuss your vision and transform it into an extraordinary experience
                        that your guests will remember forever.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="flex items-center px-10 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
                            <span className="mr-2">Start Your Project</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-10 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm">
                            View Our Portfolio
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="md:col-span-2">
                            <div className="text-3xl font-bold text-gray-900 mb-4">
                                Events
                            </div>
                            <div className="w-8 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-6"></div>
                            <p className="text-gray-600 leading-relaxed max-w-md mb-6">
                                Creating extraordinary experiences through innovative event design,
                                meticulous planning, and flawless execution.
                            </p>
                            <div className="flex space-x-4">
                                {socialLinks.map((social, index) => (
                                    <div key={index} className={`p-3 rounded-xl bg-gradient-to-r ${getColorClasses(social.color)} text-white hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg`}>
                                        {social.icon}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-gray-900 font-semibold mb-6">Services</h4>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="text-gray-600 hover:text-emerald-500 transition-colors duration-300">Corporate Events</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-emerald-500 transition-colors duration-300">Wedding Planning</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-emerald-500 transition-colors duration-300">Brand Activations</a></li>
                                <li><a href="#" className="text-gray-600 hover:text-emerald-500 transition-colors duration-300">Social Gatherings</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-gray-900 font-semibold mb-6">Contact</h4>
                            <div className="space-y-3 text-sm text-gray-600">
                                <p className="hover:text-emerald-500 transition-colors duration-300 cursor-pointer">hello@events.com</p>
                                <p className="hover:text-emerald-500 transition-colors duration-300 cursor-pointer">+1 (555) 123-4567</p>
                                <p className="hover:text-emerald-500 transition-colors duration-300 cursor-pointer">New York, NY</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
                        <p>© 2025 Events. Creating extraordinary experiences worldwide.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}