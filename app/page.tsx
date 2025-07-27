"use client"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Plus, VolumeX, Volume2, RotateCcw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Preloader } from "@/components/preloader"
import { Reviews } from "@/components/reviews"
import { motion } from "framer-motion"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["platform", "works", "pricing", "faq", "contact"]
      const scrollPosition = window.scrollY + 100 // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <Preloader />
      
      <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* Fixed Floating Header */}
      <header className="fixed top-4 inset-x-0 z-50 mx-auto flex items-center justify-between w-full max-w-[calc(100vw-2rem)] md:max-w-3xl px-1 sm:px-2 md:px-4 py-1 sm:py-2 backdrop-blur-xl bg-white/60 dark:bg-black/40 rounded-full border border-gray-200/50 dark:border-gray-600/70 shadow-lg dark:shadow-gray-700/50">
        {/* Left: Logo */}
        <div className="flex items-center mr-1 sm:mr-2 md:mr-4">
          <Image
            src="/logo.png"
            alt="Meiyo Logo"
            width={40}
            height={40}
            className="object-contain w-8 h-8"
            priority
          />
        </div>

        {/* Center: Absolutely centered theme toggle on small screens */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 block md:hidden">
          <ThemeToggle />
        </div>

        {/* Center: Navigation (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-2 md:gap-4 mx-1 sm:mx-2 md:mx-3 flex-1 justify-center">
          <Link 
            href="#platform" 
            className={`transition-colors text-xs px-3 py-1 rounded-full ${
              activeSection === "platform" 
                ? "text-black dark:text-white bg-gray-200 dark:bg-gray-800" 
                : "text-gray-700 dark:text-custom-gray hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            Platform
          </Link>
          <Link 
            href="#works" 
            className={`transition-colors text-xs px-3 py-1 rounded-full ${
              activeSection === "works" 
                ? "text-black dark:text-white bg-gray-200 dark:bg-gray-800" 
                : "text-gray-700 dark:text-custom-gray hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            Works
          </Link>
          <Link 
            href="#pricing" 
            className={`transition-colors text-xs px-3 py-1 rounded-full ${
              activeSection === "pricing" 
                ? "text-black dark:text-white bg-gray-200 dark:bg-gray-800" 
                : "text-gray-700 dark:text-custom-gray hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            Pricing
          </Link>
          <Link 
            href="#faq" 
            className={`transition-colors text-xs px-3 py-1 rounded-full ${
              activeSection === "faq" 
                ? "text-black dark:text-white bg-gray-200 dark:bg-gray-800" 
                : "text-gray-700 dark:text-custom-gray hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            FAQ
          </Link>
          <Link 
            href="#contact" 
            className={`transition-colors text-xs px-3 py-1 rounded-full ${
              activeSection === "contact" 
                ? "text-black dark:text-white bg-gray-200 dark:bg-gray-800" 
                : "text-gray-700 dark:text-custom-gray hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right: Theme toggle (md only) and Book a call button (always) */}
        <div className="flex items-center gap-2 ml-1 sm:ml-2 md:ml-4">
          <span className="hidden md:inline lg:hidden">
            <ThemeToggle />
          </span>
          <Button variant="outline" className="bg-black dark:bg-white text-white dark:text-black border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-3 py-1 text-xs flex items-center gap-1">
            Book a call
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Fixed Theme Toggle - Top Right (only on lg and above) */}
      <div className="fixed top-6 right-6 z-50 hidden lg:block">
        <div className="scale-125">
          <ThemeToggle />
        </div>
      </div>

      {/* Centered Container for entire website */}
      <div className="max-w-6xl mx-auto pt-20">

        {/* Hero Section */}
        <motion.section 
          className="px-8 pt-16 pb-8 lg:pt-20 lg:pb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="text-left" variants={fadeInUp}>
            <motion.h1 
              className="text-[40px] font-bold leading-tight mb-2 text-black dark:text-white transition-colors" 
              style={{fontWeight: '700'}}
              variants={fadeInUp}
            >
              meiyo<span className="inline-block w-2 h-2 bg-black dark:bg-white rounded-full ml-1"></span>
            </motion.h1>
            <motion.p 
              className="text-[38px] font-bold leading-tight text-gray-600 dark:text-custom-gray transition-colors" 
              style={{fontWeight: '700'}}
              variants={fadeInUp}
            >
              Honor. Prestige. Your ideas respected.
            </motion.p>
          </motion.div>

          {/* Large content area */}
          <motion.div 
            className="mt-16 rounded-lg overflow-hidden relative"
            variants={scaleIn}
          >
            <div className="w-full aspect-video">
              <video
                ref={videoRef}
                src="https://video-worker.sidgupt12.workers.dev/testvideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleMuteToggle}
                className="bg-white/20 dark:bg-black/20 backdrop-blur-sm border-white/30 dark:border-black/30 hover:bg-white/30 dark:hover:bg-black/30 rounded-full"
              >
                {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRestart}
                className="bg-white/20 dark:bg-black/20 backdrop-blur-sm border-white/30 dark:border-black/30 hover:bg-white/30 dark:hover:bg-black/30 rounded-full"
              >
                <RotateCcw className="h-5 w-5 text-white" />
              </Button>
            </div>
          </motion.div>
        </motion.section>

        {/* What Meiyo Means Section */}
        <motion.section 
          id="platform" 
          className="px-8 py-8 text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-xl font-semibold mb-8 text-black dark:text-white transition-colors" 
            style={{fontWeight: '600'}}
            variants={fadeInUp}
          >
            What 'meiyo' means to us
          </motion.h2>
          <motion.div 
            className="space-y-6 text-gray-700 dark:text-custom-gray leading-relaxed max-w-2xl transition-colors"
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp}>
              'Meiyo' is the Japanese word for honor, prestige, and deep respect — values that shape how we treat each
              client's vision. We believe every MVP begins with recognition and mindful craftsmanship.
            </motion.p>
            <motion.p variants={fadeInUp}>
              We honor your ideas by offering gentle guidance, clear fixed pricing, and a process built on trust. Here,
              you're not just a client — your story is the heart of what we build together.
            </motion.p>
          </motion.div>

          <motion.h2 
            className="text-xl font-semibold mb-8 mt-12 text-black dark:text-white transition-colors" 
            style={{fontWeight: '600'}}
            variants={fadeInUp}
          >
            What we do
          </motion.h2>
          <motion.div 
            className="space-y-6 text-gray-700 dark:text-custom-gray leading-relaxed max-w-2xl transition-colors"
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp}>
              Like a gardener tending the first bud of spring, we help visionaries gently shape their ideas into living
              products. Your MVP is approached with patience, honor, and a respect rooted in Japanese artistry.
            </motion.p>
            <motion.p variants={fadeInUp}>
              Trust our hands to cultivate what you imagine — each step guided by care and stillness, as a stone garden
              reveals balance. We bring clarity and fixed pricing, turning inspiration into form with quiet precision.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Personal Works Section */}
        <motion.section 
          id="works" 
          className="px-8 py-8 text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-xl font-semibold mb-8 text-black dark:text-white transition-colors" 
            style={{fontWeight: '600'}}
            variants={fadeInUp}
          >
            Personal Works
          </motion.h2>
          <motion.p 
            className="text-gray-700 dark:text-custom-gray leading-relaxed mb-12 max-w-2xl transition-colors"
            variants={fadeInUp}
          >
            A gallery of projects crafted by our own team — click to explore live demonstrations of concept sites
            reflecting meiyo's blend of simplicity and refinement.
          </motion.p>

          {/* Project Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Link
                  href="https://forgetai.siddhant.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-video overflow-hidden rounded-lg"
                >
                  <Image
                    src="/photo.png"
                    alt={`Project ${i + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
        <Reviews />


        {/* Pricing Section */}
        <motion.section 
          id="pricing" 
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
            Pricing
          </motion.h2>
          <motion.p 
            className="text-[38px] font-bold leading-tight mb-16 text-gray-600 dark:text-custom-gray transition-colors" 
            style={{fontWeight: '700'}}
            variants={fadeInUp}
          >
            Transparent as water, serene as stone.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {/* Single Blossom */}
            <motion.div 
              className="bg-gray-50 dark:bg-custom-card p-8 rounded-2xl transition-colors"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-gray-600 dark:text-custom-gray mb-6 text-lg font-medium transition-colors">Single Blossom</h3>
              <div className="text-5xl font-bold mb-8 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>$4,500</div>
              <ul className="space-y-4 mb-12 text-left">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 dark:text-custom-gray leading-relaxed transition-colors">Complete web or mobile application — crafted from your vision to launch</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 dark:text-custom-gray leading-relaxed transition-colors">Full-cycle development: design, build, test, and deploy with care</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 dark:text-custom-gray leading-relaxed transition-colors">30 days of dedicated support to nurture your first steps</span>
                </li>
              </ul>
              <Button className="w-full bg-black dark:bg-white/[0.08] text-white dark:text-white hover:bg-gray-800 dark:hover:bg-white/[0.12] border-0 rounded-full py-4 font-medium text-base transition-colors">
                Begin the journey
              </Button>
            </motion.div>

            {/* Twin Garden */}
            <motion.div 
              className="bg-gray-50 dark:bg-custom-card p-8 rounded-2xl transition-colors"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-gray-600 dark:text-custom-gray mb-6 text-lg font-medium transition-colors">Twin Garden</h3>
              <div className="text-5xl font-bold mb-8 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>$7,500</div>
              <ul className="space-y-4 mb-12 text-left">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 dark:text-custom-gray leading-relaxed transition-colors">Synchronized web and mobile experience — two platforms, one vision</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 dark:text-custom-gray leading-relaxed transition-colors">Seamless design system flowing between desktop and mobile</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 dark:text-custom-gray leading-relaxed transition-colors">60 days of mindful support as your dual platforms take root</span>
                </li>
              </ul>
              <Button className="w-full bg-black dark:bg-custom-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 border-0 rounded-full py-4 font-medium text-base transition-colors">
                Embrace harmony
              </Button>
            </motion.div>


            {/* Evergreen Care */}
            <motion.div 
              className="bg-gray-50 dark:bg-custom-card p-8 rounded-2xl transition-colors"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-gray-600 dark:text-custom-gray mb-6 text-lg font-medium transition-colors">Evergreen Care</h3>
              <div className="text-5xl font-bold mb-8 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>$950</div>
              <ul className="space-y-4 mb-12 text-left">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 dark:text-custom-gray leading-relaxed transition-colors">Monthly maintenance, updates, and gentle improvements for you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 dark:text-custom-gray leading-relaxed transition-colors">Ongoing feature additions as your product evolves and grows</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1 text-lg">✓</span>
                  <span className="text-gray-700 dark:text-custom-gray leading-relaxed transition-colors">Priority response — first light of attention when you need us</span>
                </li>
              </ul>
              <Button className="w-full bg-black dark:bg-white/[0.08] text-white dark:text-white hover:bg-gray-800 dark:hover:bg-white/[0.12] border-0 rounded-full py-4 font-medium text-base mt-[1.625rem] transition-colors">
                Sustain and grow
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Reviews Section */}
        
        {/* FAQ Section */}
        <motion.section 
          id="faq" 
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
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="text-[38px] font-bold leading-tight mb-16 text-gray-600 dark:text-custom-gray transition-colors" 
            style={{fontWeight: '700'}}
            variants={fadeInUp}
          >
            Answers to common questions and concerns.
          </motion.p>
          <motion.div 
            className="space-y-4 max-w-4xl mx-auto text-left"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Collapsible>
                <CollapsibleTrigger 
                  className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                  onClick={e => e.currentTarget.blur()}
                >
                  <span className="text-black dark:text-white">How do we begin working together?</span>
                  <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                  We start with a gentle conversation about your vision, followed by a clear proposal that honors your
                  ideas and timeline.
                </CollapsibleContent>
              </Collapsible>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Collapsible>
                <CollapsibleTrigger 
                  className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                  onClick={e => e.currentTarget.blur()}
                >
                  <span className="text-black dark:text-white">Is pricing fixed? Any hidden fees?</span>
                  <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-600 dark:text-custom-gray transition-colors">
                  Our pricing is transparent as water. What you see is what you invest, with no hidden costs or surprise
                  additions.
                </CollapsibleContent>
              </Collapsible>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Collapsible>
                <CollapsibleTrigger 
                  className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                  onClick={e => e.currentTarget.blur()}
                >
                  <span className="text-black dark:text-white">How long does it take to launch an MVP?</span>
                  <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 text-gray-600 dark:text-custom-gray transition-colors">
                  Like tending a garden, we work with patience and precision. Most MVPs bloom within 4-8 weeks, depending
                  on complexity.
                </CollapsibleContent>
              </Collapsible>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Collapsible>
                <CollapsibleTrigger 
                  className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                  onClick={e => e.currentTarget.blur()}
                >
                  <span className="text-black dark:text-white">Is pricing fixed? Any hidden fees?</span>
                  <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                  Our pricing is transparent as water. What you see is what you invest, with no hidden costs or surprise
                  additions.
                </CollapsibleContent>
              </Collapsible>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Collapsible>
                <CollapsibleTrigger 
                  className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                  onClick={e => e.currentTarget.blur()}
                >
                  <span className="text-black dark:text-white">How long does it take to launch an MVP?</span>
                  <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                  Like tending a garden, we work with patience and precision. Most MVPs bloom within 4-8 weeks, depending
                  on complexity.
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          id="contact" 
          className="px-8 py-16 border-t border-gray-200 dark:border-gray-800 transition-colors"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div 
            className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12"
            variants={staggerContainer}
          >
            <motion.div 
              className="flex items-center justify-center lg:justify-start"
              variants={fadeInUp}
            >
              <Image
                src="/logo.png"
                alt="Meiyo Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <h4 className="font-medium mb-4 text-black dark:text-white transition-colors">Platform</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 transition-colors">
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Demo
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h4 className="font-medium mb-4 text-black dark:text-white transition-colors">Guide</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 transition-colors">
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      How It Works
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Support
                    </Link>
                  </li>
                </ul>
              </motion.div>

              <motion.div className="col-span-2 sm:col-span-1" variants={fadeInUp}>
                <h4 className="font-medium mb-4 text-black dark:text-white transition-colors">Meiyo</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 transition-colors">
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Our Philosophy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-black dark:hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-sm transition-colors text-center lg:text-left"
            variants={fadeInUp}
          >
            <p>© 2023–2025</p>
            <p>All Rights Reserved</p>
          </motion.div>
        </motion.footer>
      </div>
    </div>
    </>
  )
}
