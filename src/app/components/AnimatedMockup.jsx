'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle, Zap } from 'lucide-react';

const AnimatedMockup = ({ className }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end start'],
  });

  const containerTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ['none', 'rotateX(20deg) rotateZ(-20deg) skewY(8deg)']
  );

  const getCardAnimation = (start) => {
    const translateY = useTransform(scrollYProgress, [start, start + 0.3], [0, -800]);
    const opacity = useTransform(scrollYProgress, [start, start + 0.3], [1, 0]);
    const scale = useTransform(scrollYProgress, [start, start + 0.3], [1, 0.7]);
    const rotateX = useTransform(scrollYProgress, [start, start + 0.3], [0, 30]);

    return { translateY, opacity, scale, rotateX };
  };

  const cardStartPoints = [0.1, 0.2, 0.3, 0.4, 0.5];

  return (
    <div
      ref={containerRef}
      className={`sticky bottom-4 flex w-[calc(100%-2rem)] shrink duration-700 xl:-end-32 xl:top-16 xl:bottom-auto xl:w-auto xl:transform-none xl:overflow-x-hidden xl:overflow-y-clip xl:bg-transparent xl:pt-16 xl:pb-16 ${className}`}
    >
      <motion.div
        className="mockup mockup-window bg-gray-200/90 xl:bg-gray-200 xl:backdrop-blur-0 mx-auto origin-top overflow-visible pb-4 backdrop-blur will-change-auto xl:-end-20 xl:-me-10 xl:h-[32rem] xl:w-[50rem] xl:rounded-e-none xl:pe-4 xl:shadow-lg"
        style={{
          transform: containerTransform,
        }}
      >
        <div className="grid">
          <div
            className="z-10 col-start-1 row-start-1 grid overflow-x-scroll overflow-y-hidden [scrollbar-width:none] xl:overflow-x-visible xl:overflow-y-visible [&::-webkit-scrollbar]:hidden"
            style={{ opacity: 1 }}
          >
            {/* THIS IS THE CORRECTED LAYOUT. WE'RE NOW USING ABSOLUTE POSITIONING */}
            <div className="col-start-1 row-start-1 mx-6 relative xl:mx-0 xl:h-full">
              {/* Cards are now positioned absolutely within this relative container */}
              <div className="flex gap-6 absolute left-0 top-0 xl:w-60 xl:flex-col xl:gap-0">
                {/* Card 1: Features Tab */}
                <motion.div
                  className="relative z-10 w-80 will-change-auto xl:-start-6 xl:w-auto"
                  style={{
                    translateY: getCardAnimation(cardStartPoints[0]).translateY,
                    opacity: getCardAnimation(cardStartPoints[0]).opacity,
                    scale: getCardAnimation(cardStartPoints[0]).scale,
                    rotateX: getCardAnimation(cardStartPoints[0]).rotateX,
                  }}
                >
                  <div className="bg-white rounded-t-lg grid grid-cols-3">
                    <button className="px-4 py-2 text-xs whitespace-nowrap bg-white border-b-2 border-blue-500 text-blue-600 font-medium rounded-tl-lg">Features</button>
                    <button className="px-4 py-2 text-xs whitespace-nowrap bg-gray-50 border-b border-gray-200 text-gray-600">Links</button>
                    <button className="px-4 py-2 text-xs whitespace-nowrap bg-gray-50 border-b border-gray-200 text-gray-600 rounded-tr-lg">Message</button>
                  </div>
                  <div className="bg-white rounded-b-lg h-60 shrink-0 shadow-lg border border-gray-200">
                    <div className="flex flex-col items-stretch p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-gray-700">Faster development</label>
                        <input type="checkbox" className="toggle toggle-sm bg-blue-500" defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-gray-700">Cleaner HTML</label>
                        <input type="checkbox" className="toggle toggle-sm bg-pink-500" defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-gray-700">Customizable</label>
                        <input type="checkbox" className="toggle toggle-sm bg-teal-500" defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-gray-700">Themeable</label>
                        <input type="checkbox" className="toggle toggle-sm bg-green-500" defaultChecked />
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="text-xs text-gray-700">Pure CSS</label>
                        <input type="checkbox" className="toggle toggle-sm bg-gray-400" defaultChecked />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2: Pure CSS Alert */}
                <motion.div
                  className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 shadow-sm w-72"
                  style={{
                    translateY: getCardAnimation(cardStartPoints[1]).translateY,
                    opacity: getCardAnimation(cardStartPoints[1]).opacity,
                    scale: getCardAnimation(cardStartPoints[1]).scale,
                    rotateX: getCardAnimation(cardStartPoints[1]).rotateX,
                  }}
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-xs text-gray-700">Pure CSS. <br /> No JS dependency</span>
                </motion.div>
              </div>

              {/* Card 3: Works on all frameworks */}
              <motion.div
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 shadow-sm w-72 absolute top-[28rem] xl:top-[16rem]"
                style={{
                  translateY: getCardAnimation(cardStartPoints[2]).translateY,
                  opacity: getCardAnimation(cardStartPoints[2]).opacity,
                  scale: getCardAnimation(cardStartPoints[2]).scale,
                  rotateX: getCardAnimation(cardStartPoints[2]).rotateX,
                }}
              >
                <Zap className="h-5 w-5 shrink-0 text-yellow-500" />
                <span className="text-xs text-gray-700">Works on all frameworks</span>
              </motion.div>

              {/* Card 4: Design System */}
              <motion.div
                className="bg-white rounded-lg shadow-sm border border-gray-200 w-72 absolute top-[35rem] xl:top-[22rem]"
                style={{
                  translateY: getCardAnimation(cardStartPoints[3]).translateY,
                  opacity: getCardAnimation(cardStartPoints[3]).opacity,
                  scale: getCardAnimation(cardStartPoints[3]).scale,
                  rotateX: getCardAnimation(cardStartPoints[3]).rotateX,
                }}
              >
                <div className="p-6">
                  <h2 className="text-sm font-semibold text-gray-900 mb-4">Design system</h2>
                  <div className="grid grid-cols-5 items-end gap-4 mb-4">
                    <label className="flex cursor-pointer flex-col items-center gap-1">
                      <input type="checkbox" defaultChecked className="w-3 h-3 text-blue-500 rounded" />
                      <span className="text-gray-500 text-xs">xs</span>
                    </label>
                    <label className="flex cursor-pointer flex-col items-center gap-1">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 rounded" />
                      <span className="text-gray-500 text-xs">sm</span>
                    </label>
                    <label className="flex cursor-pointer flex-col items-center gap-1">
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-500 rounded" />
                      <span className="text-gray-500 text-xs">md</span>
                    </label>
                    <label className="flex cursor-pointer flex-col items-center gap-1">
                      <input type="checkbox" defaultChecked className="w-6 h-6 text-blue-500 rounded" />
                      <span className="text-gray-500 text-xs">lg</span>
                    </label>
                    <label className="flex cursor-pointer flex-col items-center gap-1">
                      <input type="checkbox" defaultChecked className="w-7 h-7 text-blue-500 rounded" />
                      <span className="text-gray-500 text-xs">xl</span>
                    </label>
                  </div>
                </div>
              </motion.div>

              {/* Card 5: Semantic Colors (Aligned to the right) */}
              <motion.div
                className="bg-white rounded-lg shadow-sm border border-gray-200 w-72 absolute top-[42rem] right-0 xl:top-[28rem] xl:right-0"
                style={{
                  translateY: getCardAnimation(cardStartPoints[4]).translateY,
                  opacity: getCardAnimation(cardStartPoints[4]).opacity,
                  scale: getCardAnimation(cardStartPoints[4]).scale,
                  rotateX: getCardAnimation(cardStartPoints[4]).rotateX,
                }}
              >
                <div className="p-6">
                  <h2 className="text-sm font-semibold text-gray-900 mb-4">Semantic colors</h2>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-blue-500 rounded-lg aspect-square w-10" />
                      <div className="text-gray-500 text-xs">primary</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-pink-500 rounded-lg aspect-square w-10" />
                      <div className="text-gray-500 text-xs">secondary</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-teal-400 rounded-lg aspect-square w-10" />
                      <div className="text-gray-500 text-xs">accent</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-gray-800 rounded-lg aspect-square w-10" />
                      <div className="text-gray-500 text-xs">neutral</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-cyan-400 rounded-lg aspect-square w-10" />
                      <div className="text-gray-500 text-xs">info</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-green-500 rounded-lg aspect-square w-10" />
                      <div className="text-gray-500 text-xs">success</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-yellow-500 rounded-lg aspect-square w-10" />
                      <div className="text-gray-500 text-xs">warning</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-red-500 rounded-lg aspect-square w-10" />
                      <div className="text-gray-500 text-xs">error</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedMockup;