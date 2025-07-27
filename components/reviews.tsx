"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface Review {
  name: string
  role: string
  company: string
  content: string
  rating: number
}

const reviews: Review[] = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechFlow",
    content: "Meiyo transformed our vision into reality with remarkable precision. Their approach honors every detail while maintaining the essence of simplicity.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder",
    company: "GreenSpace",
    content: "Working with Meiyo felt like having a wise mentor guide our product journey. The transparency and craftsmanship exceeded our expectations.",
    rating: 5
  },
  {
    name: "Elena Nakamura",
    role: "Creative Director",
    company: "Minimal Studios",
    content: "The philosophy of honor and respect flows through every interaction. Our MVP launched beautifully, exactly as envisioned.",
    rating: 5
  },
  {
    name: "David Kim",
    role: "CEO",
    company: "Harmony Labs",
    content: "Like tending a garden, Meiyo nurtured our idea from concept to launch. The fixed pricing brought peace of mind throughout the process.",
    rating: 5
  },
  {
    name: "Amélie Dubois",
    role: "Tech Lead",
    company: "Serenity AI",
    content: "Exceptional attention to detail and a process that feels both professional and deeply personal. Truly artisanal development work.",
    rating: 5
  }
]

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  // Auto-slide functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length)
      }, 4000) // Change slide every 4 seconds

      return () => clearInterval(interval)
    }
  }, [isHovered])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const currentReview = reviews[currentIndex]

  return (
    <motion.section 
      className="px-8 py-20 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <motion.h2 
        className="text-[40px] font-bold leading-tight mb-2 text-black dark:text-white transition-colors" 
        style={{fontWeight: '700'}}
        variants={fadeInUp}
      >
        Client Reflections
      </motion.h2>
      <motion.p 
        className="text-[38px] font-bold leading-tight mb-16 text-gray-600 dark:text-custom-gray transition-colors" 
        style={{fontWeight: '700'}}
        variants={fadeInUp}
      >
        Voices of trust, stories of honor.
      </motion.p>

      <motion.div className="max-w-4xl mx-auto" variants={staggerContainer}>
        {/* Review Card */}
        <motion.div 
          className="bg-gray-50 dark:bg-custom-card p-12 rounded-2xl transition-colors relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variants={scaleIn}
          key={currentIndex} // Add key to trigger re-animation on change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}></div>
          </div>

          <div className="relative z-10">
            {/* Rating Stars */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.svg
                  key={i}
                  className="w-6 h-6 text-yellow-400 dark:text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </motion.svg>
              ))}
            </motion.div>

            {/* Review Content */}
            <motion.blockquote 
              className="text-xl leading-relaxed mb-12 text-gray-700 dark:text-custom-gray italic max-w-3xl mx-auto transition-all duration-500 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              "{currentReview.content}"
            </motion.blockquote>

            {/* Author Info */}
            <motion.div 
              className="text-center transition-all duration-500 ease-in-out"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div 
                className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-lg font-semibold text-gray-600 dark:text-gray-300 transition-colors">
                  {currentReview.name.split(' ').map(n => n[0]).join('')}
                </span>
              </motion.div>
              <h4 className="text-lg font-semibold text-black dark:text-white mb-1 transition-colors">
                {currentReview.name}
              </h4>
              <p className="text-gray-600 dark:text-custom-gray transition-colors">
                {currentReview.role} at {currentReview.company}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="flex items-center justify-center gap-4 mt-8"
          variants={fadeInUp}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              className="bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Button>
          </motion.div>

          {/* Dots Indicator with Auto-play Progress */}
          <div className="flex gap-2">
            {reviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-black dark:bg-white'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Progress indicator for current slide */}
                {index === currentIndex && !isHovered && (
                  <div 
                    className="absolute inset-0 rounded-full bg-black dark:bg-white opacity-30 review-progress"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              className="bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Subtle Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          variants={fadeInUp}
        >
          <p className="text-gray-600 dark:text-custom-gray mb-6 max-w-2xl mx-auto leading-relaxed transition-colors">
            Join these visionaries who chose to honor their ideas with mindful craftsmanship.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-black dark:bg-white/[0.08] text-white dark:text-white hover:bg-gray-800 dark:hover:bg-white/[0.12] border-0 rounded-full px-8 py-3 font-medium transition-colors">
              Begin your journey
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
