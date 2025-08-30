"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import image1 from "../../../public/1.jpg";
import image2 from "../../../public/16.jpg";
import image3 from "../../../public/19.jpg";
import image4 from "../../../public/4.jpg";

export default function AnimatedMockup() {
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["center center", "center start"],
  });

  // Function to make transforms with delay
  const makeTransforms = (delay) => ({
    y: useTransform(scrollYProgress, [0 + delay, 0.4 + delay], [0, -900]), // move further up
    scale: useTransform(scrollYProgress, [0 + delay, 0.4 + delay], [1, 1.15]), // slight zoom
  });

  // More spacing in delays for stronger one-by-one effect
  const img1 = makeTransforms(0);
  const img2 = makeTransforms(0.12);
  const img3 = makeTransforms(0.24);
  const img4 = makeTransforms(0.36);

  return (
    <section
      ref={mainRef}
      className="relative w-full min-h-screen flex justify-center items-center overflow-hidden bg-white "
    >
      {/* Tilted container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 50, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotate: -15 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
        className="relative w-[80vw] h-[70vh] grid grid-cols-2 grid-rows-2 gap-5 overflow-visible rounded-3xl  "
        style={{
          transformOrigin: "center",
          marginTop: "20vh",
          marginBottom: "35vh",
          backgroundColor: "#1e2a38  ", // dark solid background
          position: "relative",
          left: "20%",
          padding: "10px",
        }}
      >
        {[img1, img2, img3, img4].map((style, i) => (
          <div
            key={i}
            className="flex justify-center items-center overflow-visible"
            style={{
              transform: "rotate(15deg)", // cancel tilt for images
            }}
          >
            <motion.div style={style} className="w-[80%] h-[100%] ">
              <Image
                src={[image1, image2, image3, image4][i]}
                alt={`img${i + 1}`}
                className="w-full h-full object-cover rounded-xl"
                style={{
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.25), 0 10px 20px rgba(0,0,0,0.1)",
                }}
                priority
              />
            </motion.div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
