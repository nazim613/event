import React, { useEffect, useState, useRef } from 'react';

const AnimatedSlide = () => {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef(null);
  const imageRefs = useRef([]);
  const animationFrameRef = useRef();

  useEffect(() => {
    setMounted(true);

    const animateImages = () => {
      imageRefs.current.forEach((imageEl) => {
        if (!imageEl) return;
        const rect = imageEl.getBoundingClientRect();
        const offsetX = parseFloat(imageEl.style.getPropertyValue('--offsetX'));
        const offsetY = parseFloat(imageEl.style.getPropertyValue('--offsetY'));
        const velocity = parseFloat(imageEl.style.getPropertyValue('--velocity'));

        // Apply a subtle 'breathing' animation
        const time = Date.now() * 0.0005;
        const breathX = Math.sin(time + rect.left * 0.01) * 2;
        const breathY = Math.cos(time + rect.top * 0.01) * 2;

        imageEl.style.setProperty('--offsetX-animated', (offsetX + breathX).toFixed(2));
        imageEl.style.setProperty('--offsetY-animated', (offsetY + breathY).toFixed(2));
      });
      animationFrameRef.current = requestAnimationFrame(animateImages);
    };

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      imageRefs.current.forEach((imageEl, index) => {
        if (!imageEl) return;

        const imageRect = imageEl.getBoundingClientRect();
        const imageCenterX = imageRect.left + imageRect.width / 2;
        const imageCenterY = imageRect.top + imageRect.height / 2;

        const deltaX = e.clientX - imageCenterX;
        const deltaY = e.clientY - imageCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        const maxDistance = 300;
        const maxOffset = 30;
        
        let offsetX = 0;
        let offsetY = 0;
        let velocity = 0;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          offsetX = (deltaX / distance) * force * maxOffset;
          offsetY = (deltaY / distance) * force * maxOffset;
          velocity = force;
        }

        imageEl.style.setProperty('--offsetX', offsetX.toFixed(2));
        imageEl.style.setProperty('--offsetY', offsetY.toFixed(2));
        imageEl.style.setProperty('--velocity', velocity.toFixed(2));
      });
    };

    const handleMouseLeave = () => {
      imageRefs.current.forEach((imageEl) => {
        if (!imageEl) return;
        imageEl.style.setProperty('--offsetX', '0.00');
        imageEl.style.setProperty('--offsetY', '0.00');
        imageEl.style.setProperty('--velocity', '0.00');
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameRef.current = requestAnimationFrame(animateImages);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mounted]);

  return (
    <div className="relative w-full h-screen ">
      <div 
        ref={heroRef}
        className="magnetic-hero w-full h-full flex items-center justify-center"
      >
        <div className="hero-images flex items-center justify-center ">
          
          {/* Image 1 */}
          <div 
            ref={el => imageRefs.current[0] = el}
            className="hero-image"
            style={{
              '--offsetX': '0.00',
              '--offsetY': '0.00', 
              '--velocity': '0.00',
              '--offsetX-animated': '0.00',
              '--offsetY-animated': '0.00',
              transform: 'translate(calc(var(--offsetX-animated) * 1px), calc(var(--offsetY-animated) * 1px)) rotate(-8deg) translateY(-20px)',
              transition: 'transform 0.3s ease-out',
              zIndex: 1
            }}
          >
            <img 
              src="/3.jpg"
              className="magnetic-image w-64 h-56 object-cover rounded-2xl shadow-lg"
            />
          </div>

          {/* Image 2 */}
          <div 
            ref={el => imageRefs.current[1] = el}
            className="hero-image -ml-8"
            style={{
              '--offsetX': '0.00',
              '--offsetY': '0.00',
              '--velocity': '0.00',
              '--offsetX-animated': '0.00',
              '--offsetY-animated': '0.00',
              transform: 'translate(calc(var(--offsetX-animated) * 1px), calc(var(--offsetY-animated) * 1px)) rotate(6deg) translateY(15px)',
              transition: 'transform 0.3s ease-out',
              zIndex: 2
            }}
          >
            <img 
              src="/7.jpg"
              className="magnetic-image w-64 h-56 object-cover rounded-2xl shadow-xl"
            />
          </div>

          {/* Image 3 - Center */}
          <div 
            ref={el => imageRefs.current[2] = el}
            className="hero-image -ml-8"
            style={{
              '--offsetX': '0.00',
              '--offsetY': '0.00',
              '--velocity': '0.00',
              '--offsetX-animated': '0.00',
              '--offsetY-animated': '0.00',
              transform: 'translate(calc(var(--offsetX-animated) * 1px), calc(var(--offsetY-animated) * 1px)) rotate(0deg)',
              transition: 'transform 0.3s ease-out',
              zIndex: 5
            }}
          >
            <img 
              src="/12.jpg"
              className="magnetic-image w-72 h-64 object-cover rounded-2xl shadow-2xl"
            />
          </div>

          {/* Image 4 */}
          <div 
            ref={el => imageRefs.current[3] = el}
            className="hero-image -ml-8"
            style={{
              '--offsetX': '0.00',
              '--offsetY': '0.00',
              '--velocity': '0.00',
              '--offsetX-animated': '0.00',
              '--offsetY-animated': '0.00',
              transform: 'translate(calc(var(--offsetX-animated) * 1px), calc(var(--offsetY-animated) * 1px)) rotate(-5deg) translateY(-18px)',
              transition: 'transform 0.3s ease-out',
              zIndex: 3
            }}
          >
            <img 
              src="/20.jpg"
              className="magnetic-image w-64 h-56 object-cover rounded-2xl shadow-xl"
            />
          </div>

          {/* Image 5 */}
          <div 
            ref={el => imageRefs.current[4] = el}
            className="hero-image -ml-8"
            style={{
              '--offsetX': '0.00',
              '--offsetY': '0.00',
              '--velocity': '0.00',
              '--offsetX-animated': '0.00',
              '--offsetY-animated': '0.00',
              transform: 'translate(calc(var(--offsetX-animated) * 1px), calc(var(--offsetY-animated) * 1px)) rotate(7deg) translateY(22px)',
              transition: 'transform 0.3s ease-out',
              zIndex: 1
            }}
          >
            <img 
              src="/3.jpg"
              className="magnetic-image w-64 h-56 object-cover rounded-2xl shadow-lg"
              alt="Team Collaboration"
            />
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero-image {
          position: relative;
          cursor: pointer;
        }
        .magnetic-image {
          transition: all 0.3s ease-out;
        }
        .hero-image:hover .magnetic-image {
          transform: scale(1.05);
        }
        .hero-image:hover {
          z-index: 10 !important;
        }
      `}</style>
    </div>
  );
};

export default AnimatedSlide;