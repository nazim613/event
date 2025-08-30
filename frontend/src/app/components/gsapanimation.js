import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const GSAPHeroAnimation = () => {
  const containerRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    const main = mainRef.current;
    
    if (!container || !main) return;

    // Check if mobile
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Mobile-optimized animation values
    const leftXValues = isMobile ? [-200, -250, -150] : isTablet ? [-400, -500, -300] : [-800, -900, -400];
    const rightXValues = isMobile ? [200, 250, 150] : isTablet ? [400, 500, 300] : [800, 900, 400];
    const leftRotationValues = isMobile ? [-15, -10, -20] : [-30, -20, -35];
    const rightRotationValues = isMobile ? [15, 10, 20] : [30, 20, 35];
    const yValues = isMobile ? [50, -75, -200] : isTablet ? [75, -100, -300] : [100, -150, -400];

    // ScrollTrigger settings
    const scrollTriggerSettings = {
      trigger: main,
      start: "top 5%",
      toggleActions: "play reverse play reverse",
    };

    // Set up GSAP animations
    const setupAnimations = () => {
      const rows = gsap.utils.toArray('.row');
      
      rows.forEach((row, index) => {
        const cardLeft = row.querySelector('.card-left');
        const cardRight = row.querySelector('.card-right');

        // Set initial transforms
        gsap.set([cardLeft, cardRight], {
          x: 0,
          y: 0,
          rotation: 0,
          transformOrigin: "center center"
        });

        // Animate left cards
        gsap.to(cardLeft, {
          x: leftXValues[index],
          y: yValues[index],
          rotation: leftRotationValues[index],
          scrollTrigger: {
            trigger: main,
            start: "top center",
            end: "150% bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              cardLeft.style.transform = `translateX(${progress * leftXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * leftRotationValues[index]}deg)`;
            }
          }
        });

        // Animate right cards
        gsap.to(cardRight, {
          x: rightXValues[index],
          y: yValues[index],
          rotation: rightRotationValues[index],
          scrollTrigger: {
            trigger: main,
            start: "top center",
            end: "150% bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              cardRight.style.transform = `translateX(${progress * rightXValues[index]}px) translateY(${progress * yValues[index]}px) rotate(${progress * rightRotationValues[index]}deg)`;
            }
          }
        });
      });

      // Logo animations
      gsap.to(".logo", {
        scale: 1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: scrollTriggerSettings,
      });

      // Line animation
      gsap.to(".line", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: scrollTriggerSettings,
      });

      // Button animation
      gsap.to("button", {
        y: 0,
        opacity: 1,
        delay: 0.25,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: scrollTriggerSettings,
      });
    };

    // Clean up function
    const cleanup = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

    // Set up the component
    setTimeout(() => {
      setupAnimations();
    }, 100);

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white/0 text-white overflow-hidden">
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background Images Container */}
        <div ref={containerRef} className="absolute inset-0 z-0">
          <div ref={mainRef} className="main relative h-full">
            {/* Row 1 */}
            <div className="row flex justify-center items-center absolute" 
                 style={{ 
                   top: '10%',
                   left: '50%',
                   transform: 'translateX(-50%)',
                   gap: '2rem'
                 }}>
              <div className="card card-left relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl w-39 h-44 sm:w-38 sm:h-42 md:w-40 md:h-45 lg:w-64 lg:h-72 xl:w-96 xl:h-[27rem] mx-4 my-8">
                <img
                  src="/5.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-purple-600/10"></div>
              </div>
              <div className="card card-right relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl w-39 h-44 sm:w-38 sm:h-42 md:w-36 md:h-40 lg:w-64 lg:h-72 xl:w-96 xl:h-[27rem] mx-4 my-8">
                <img
                  src="/6.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-600/10"></div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row flex justify-center items-center absolute"
                 style={{ 
                   top: '75%',
                   left: '50%',
                   transform: 'translate(-50%, -50%)',
                   gap: '3rem'
                 }}>
              <div className="card card-left relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl w-39 h-44 sm:w-38 sm:h-42 md:w-36 md:h-40 lg:w-64 lg:h-72 xl:w-96 xl:h-[27rem] mx-4 my-8">
                <img
                  src="/2.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-600/10"></div>
              </div>
              <div className="card card-right relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl w-39 h-44 sm:w-28 sm:h-32 md:w-36 md:h-40 lg:w-64 lg:h-72 xl:w-96 xl:h-[27rem] mx-4 my-8">
                <img
                  src="/14.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10"></div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="row flex justify-center items-center absolute"
                 style={{ 
                   top: '80%',
                   left: '50%',
                   transform: 'translateX(-50%)',
                   gap: '20rem'
                 }}>
              <div className="card card-left relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl w-39 h-44 sm:w-28 sm:h-32 md:w-36 md:h-40 lg:w-64 lg:h-72 xl:w-96 xl:h-[27rem] mx-4 my-8">
                <img
                  src="/13.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-600/10"></div>
              </div>
              <div className="card card-right relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl w-39 h-44 sm:w-28 sm:h-32 md:w-36 md:h-40 lg:w-64 lg:h-72 xl:w-96 xl:h-[27rem] mx-4 my-8">
                <img
                  src="/11.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-600/10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Central Content */}
        <div className="relative z-10 text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto px-4">
          {/* Logo */}
          <div className="logo mb-6 sm:mb-8 transform scale-0">
            <div className="w-20 h-20 sm:w-20 sm:h-20 lg:w-28 lg:h-28 mx-auto  rounded-full  flex items-center justify-center">
          <img src="/logo.png" alt="logo" className="sm:w-20 sm:h-20 lg:w-28 lg:h-28"  />
            </div>
          </div>

          {/* Text Lines */}
          <div className="space-y-2 sm:space-y-3 lg:space-y-4 mb-8 sm:mb-10 lg:mb-12 text-black">
            <p className="line text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transform translate-y-10 opacity-0 leading-tight">
Our mission is simple  </p>
            <p className="line text-sm sm:text-lg md:text-xl lg:text-2xl text-black-600 transform translate-y-10 opacity-0 leading-relaxed">
               Less scrolling, more living, 
            </p>
            <p className="line text-sm sm:text-lg md:text-xl lg:text-2xl text-black-600 transform translate-y-10 opacity-0 leading-relaxed">
              that’s the essence
 of Dehradun Hangouts
            </p>
          </div>
        </div>
      </div>

      {/* Extended scroll area for animation */}
      <div className="h-screen bg-gradient-to-b from-black to-gray-900"></div>
    </div>
  );
};

export default GSAPHeroAnimation;