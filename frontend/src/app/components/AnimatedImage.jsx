// components/AnimatedImage.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const AnimatedImage = ({ src, alt, ...props }) => {
    const imageRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.25, 
            }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, []);

    return (
        <div 
            ref={imageRef}
            className={`
                relative h-[300px] w-full 
                transition-all duration-1000 ease-in-out
                transform translate-y-12 opacity-0
                ${isVisible ? 'translate-y-0 opacity-100' : ''}
            `}
            {...props}
        >
            <Image 
                src={src} 
                alt={alt} 
                fill
                className="object-cover rounded-3xl"
            />
        </div>
    );
};

export default AnimatedImage;