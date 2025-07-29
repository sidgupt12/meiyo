"use client"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Plus, VolumeX, Volume2, RotateCcw } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Preloader } from "@/components/preloader"
import Cal, { getCalApi } from "@calcom/embed-react"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
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
      const sections = ["platform", "works", "pricing", "testimonials", "faq"]
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

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"30min"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
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
          <button 
            onClick={() => scrollToSection('platform')}
            className={`transition-colors text-xs px-3 py-1 rounded-full ${
              activeSection === "platform" 
                ? "text-black dark:text-white bg-gray-200 dark:bg-gray-800" 
                : "text-gray-700 dark:text-custom-gray hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            Platform
          </button>
          <button 
            onClick={() => scrollToSection('works')}
            className={`transition-colors text-xs px-3 py-1 rounded-full ${
              activeSection === "works" 
                ? "text-black dark:text-white bg-gray-200 dark:bg-gray-800" 
                : "text-gray-700 dark:text-custom-gray hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            Works
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className={`transition-colors text-xs px-3 py-1 rounded-full ${
              activeSection === "pricing" 
                ? "text-black dark:text-white bg-gray-200 dark:bg-gray-800" 
                : "text-gray-700 dark:text-custom-gray hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            Pricing
          </button>
          <button 
            onClick={() => scrollToSection('testimonials')}
            className={`transition-colors text-xs px-3 py-1 rounded-full ${
              activeSection === "testimonials" 
                ? "text-black dark:text-white bg-gray-200 dark:bg-gray-800" 
                : "text-gray-700 dark:text-custom-gray hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            Testimonials
          </button>
          <button 
            onClick={() => scrollToSection('faq')}
            className={`transition-colors text-xs px-3 py-1 rounded-full ${
              activeSection === "faq" 
                ? "text-black dark:text-white bg-gray-200 dark:bg-gray-800" 
                : "text-gray-700 dark:text-custom-gray hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Right: Theme toggle (md only) and Book a call button (always) */}
        <div className="flex items-center gap-2 ml-1 sm:ml-2 md:ml-4">
          <span className="hidden md:inline lg:hidden">
            <ThemeToggle />
          </span>
          <Button 
            onClick={() => scrollToSection('booking')}
            variant="outline" 
            className="bg-black dark:bg-white text-white dark:text-black border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-3 py-1 text-xs"
          >
            Book a call
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
        <section className="px-8 pt-16 pb-8 lg:pt-20 lg:pb-10">
          <div className="text-left">
            <h1 className="text-[40px] font-bold leading-tight mb-2 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>
              meiyo<span className="inline-block w-2 h-2 bg-black dark:bg-white rounded-full ml-1"></span>
            </h1>
            <p className="text-[38px] font-bold leading-tight text-gray-600 dark:text-custom-gray transition-colors" style={{fontWeight: '700'}}>Your vision. Our craft. Delivered with care.</p>
          </div>

          {/* Large content area */}
          <div className="mt-16 rounded-lg overflow-hidden relative">
            <div className="w-full aspect-video">
              <video
                ref={videoRef}
                src="https://video-worker.sidgupt12.workers.dev/meiyo.mp4"
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
          </div>
        </section>

        {/* What Meiyo Means Section */}
        <section id="platform" className="px-8 py-8 text-left">
          <h2 className="text-xl font-semibold mb-8 text-black dark:text-white transition-colors" style={{fontWeight: '600'}}>What 'meiyo' means to us</h2>
          <div className="space-y-6 text-gray-700 dark:text-custom-gray leading-relaxed max-w-2xl transition-colors">
            <p>
              'Meiyo' is the Japanese word for honor, prestige, and deep respect values that shape how we treat each
              client's vision. We believe every MVP begins with recognition and mindful craftsmanship.
            </p>
            <p>
              We honor your ideas by offering gentle guidance, clear fixed pricing, and a process built on trust. Here,
              you're not just a client your story is the heart of what we build together.
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-8 mt-12 text-black dark:text-white transition-colors" style={{fontWeight: '600'}}>What we do</h2>
          <div className="space-y-6 text-gray-700 dark:text-custom-gray leading-relaxed max-w-2xl transition-colors">
            <p>
              Like a gardener tending the first bud of spring, we help visionaries gently shape their ideas into living
              products. Your MVP is approached with patience, honor, and a respect rooted in Japanese artistry.
            </p>
            <p>
              Trust our hands to cultivate what you imagine each step guided by care and stillness, as a stone garden
              reveals balance. We bring clarity and fixed pricing, turning inspiration into form with quiet precision.
            </p>
          </div>
        </section>

        {/* Personal Works Section */}
        <section id="works" className="px-8 py-8 text-left">
          <h2 className="text-xl font-semibold mb-8 text-black dark:text-white transition-colors" style={{fontWeight: '600'}}>Personal Works</h2>
          <p className="text-gray-700 dark:text-custom-gray leading-relaxed mb-12 max-w-2xl transition-colors">
            A gallery of projects crafted by our own team click to explore live demonstrations of concept sites
            reflecting meiyo's blend of simplicity and refinement.
          </p>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 1,
                title: "YSYW",
                image: "/ysyw.png",
                link: "https://ysyw-website.vercel.app/",
                status: "development"
              },
              {
                id: 2,
                title: "Aajoo Homes",
                image: "/aajoo.png",
                link: "https://aajoohomes.com/",
                status: "development"
              },
              {
                id: 3,
                title: "Valance",
                image: "/valance.png",
                link: "https://valenceware.com/",
                status: "live"
              },
              {
                id: 4,
                title: "ForgetAI",
                image: "/forgetai.png",
                link: "https://forgetai.siddhant.cc",
                status: "live"
              },
              {
                id: 5,
                title: "Siddhant",
                image: "/siddhant.png",
                link: "https://www.siddhant.cc/",
                status: "live"
              }
            ].map((project) => (
              <div key={project.id} className="relative">
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-video overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit={project.title === "Valance" || project.title === "Apurv" ? "contain" : "cover"}
                    className={`transition-transform duration-300 group-hover:scale-105 ${
                      project.title === "Valance" || project.title === "Apurv" ? "p-4" : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white mb-2"
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
                    
                    {/* Development Notice - appears below arrow on hover */}
                    {project.status === "development" && (
                      <div className="px-3 py-2 bg-blue-500/90 backdrop-blur-sm rounded-lg">
                        <p className="text-xs text-white text-center font-medium">
                          Currently in development - we are building their comprehensive mobile application
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Status Badge */}
                  {project.status === "preview" && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Preview
                    </div>
                  )}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-8 py-20 text-center">
          <h2 className="text-[40px] font-bold leading-tight mb-2 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>Pricing</h2>
          <p className="text-[38px] font-bold leading-tight mb-16 text-gray-600 dark:text-custom-gray transition-colors" style={{fontWeight: '700'}}>Transparent as water, serene as stone.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Single Blossom */}
            <div className="bg-gray-50 dark:bg-custom-card p-8 rounded-2xl transition-colors">
              <h3 className="text-gray-600 dark:text-custom-gray mb-6 text-lg font-medium transition-colors">Single Blossom</h3>
              <div className="text-5xl font-bold mb-8 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>$999</div>
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
            </div>

            {/* Twin Garden */}
            <div className="bg-gray-50 dark:bg-custom-card p-8 rounded-2xl transition-colors">
              <h3 className="text-gray-600 dark:text-custom-gray mb-6 text-lg font-medium transition-colors">Twin Garden</h3>
              <div className="text-5xl font-bold mb-8 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>$1,499</div>
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
            </div>

            {/* Evergreen Care */}
            <div className="bg-gray-50 dark:bg-custom-card p-8 rounded-2xl transition-colors">
              <h3 className="text-gray-600 dark:text-custom-gray mb-6 text-lg font-medium transition-colors">Evergreen Care</h3>
              <div className="text-5xl font-bold mb-8 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>$199</div>
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
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="px-8 py-20 text-center">
          <h2 className="text-[40px] font-bold leading-tight mb-2 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>What people say</h2>
          <p className="text-[38px] font-bold leading-tight mb-16 text-gray-600 dark:text-custom-gray transition-colors" style={{fontWeight: '700'}}>Trusted by users</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* YSYW Testimonial */}
            <div className="bg-gray-50 dark:bg-custom-card p-8 rounded-2xl transition-colors">
              <blockquote className="text-gray-700 dark:text-custom-gray leading-relaxed mb-8 transition-colors">
                "Meiyo brought our vision of connecting football athletes, coaches, and sponsors to life. They understood that YSYW was more than a platform it's a community where passion meets opportunity, bridging the gap between athletes and supporters worldwide."
              </blockquote>
              <div>
                <h3 className="font-semibold text-black dark:text-white transition-colors">Addy Ekhaese</h3>
                <p className="text-gray-600 dark:text-custom-gray text-sm transition-colors">Your Sports Your World</p>
              </div>
            </div>

            {/* Quick Commerce Startup Testimonial */}
            <div className="bg-gray-50 dark:bg-custom-card p-8 rounded-2xl transition-colors">
              <blockquote className="text-gray-700 dark:text-custom-gray leading-relaxed mb-8 transition-colors">
                "We needed a complete admin system and mobile app with enterprise-grade functionality, and we needed it fast. Meiyo delivered beyond expectations in just one month."
              </blockquote>
              <div>
                <h3 className="font-semibold text-black dark:text-white transition-colors">Gauri</h3>
                <p className="text-gray-600 dark:text-custom-gray text-sm transition-colors">Quick Commerce Startup</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="px-8 py-20 text-center">
          <h2 className="text-[40px] font-bold leading-tight mb-2 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>
            Frequently Asked Questions
          </h2>
          <p className="text-[38px] font-bold leading-tight mb-16 text-gray-600 dark:text-custom-gray transition-colors" style={{fontWeight: '700'}}>
            Answers to common questions and concerns.
          </p>
          <div className="space-y-4 max-w-4xl mx-auto text-left">
            <Collapsible>
              <CollapsibleTrigger 
                className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                onClick={e => e.currentTarget.blur()}
              >
                <span className="text-black dark:text-white">How do we begin working together?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                We start with a gentle conversation about your vision, followed by a clear proposal that honors your ideas and timeline. Book a call with us to discuss your project requirements and goals.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger 
                className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                onClick={e => e.currentTarget.blur()}
              >
                <span className="text-black dark:text-white">Is pricing fixed? Any hidden fees?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                Our pricing is transparent as water. What you see is what you invest, with no hidden costs or surprise additions. All pricing includes development, testing, deployment, and initial support.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger 
                className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                onClick={e => e.currentTarget.blur()}
              >
                <span className="text-black dark:text-white">How long does it take to launch an MVP?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                Like tending a garden, we work with patience and precision. Most MVPs bloom within 4-8 weeks, depending on complexity. We'll provide a detailed timeline during our initial consultation.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger 
                className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                onClick={e => e.currentTarget.blur()}
              >
                <span className="text-black dark:text-white">What technologies do you use?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                We use modern, scalable technologies including React, Next.js, Node.js, and React Native for mobile apps. We choose the best tech stack based on your specific needs and long-term goals.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger 
                className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                onClick={e => e.currentTarget.blur()}
              >
                <span className="text-black dark:text-white">Do you provide ongoing support after launch?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                Yes, all packages include initial support (30-60 days depending on your plan). For ongoing maintenance, updates, and new features, consider our Evergreen Care package at $199/month.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger 
                className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                onClick={e => e.currentTarget.blur()}
              >
                <span className="text-black dark:text-white">Can you help with app store submissions?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                Absolutely. For mobile applications, we handle the entire deployment process including App Store and Google Play Store submissions, ensuring your app meets all guidelines and requirements.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger 
                className="transition-colors rounded-lg p-4 w-full flex items-center justify-between text-left bg-transparent data-[state=open]:bg-gray-200 dark:data-[state=open]:bg-custom-card focus:bg-transparent active:bg-transparent"
                onClick={e => e.currentTarget.blur()}
              >
                <span className="text-black dark:text-white">What if I need changes during development?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                We understand that ideas evolve. Minor adjustments are included in our process. For significant scope changes, we'll discuss them transparently and adjust the timeline and pricing if needed.
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="px-8 py-20 text-center">
          <h2 className="text-[40px] font-bold leading-tight mb-2 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>Book a call</h2>
          <p className="text-[38px] font-bold leading-tight mb-16 text-gray-600 dark:text-custom-gray transition-colors" style={{fontWeight: '700'}}>Let's discuss your vision together.</p>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-custom-card rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors">
              <Cal 
                namespace="30min"
                calLink="s0lomate/30min"
                style={{width:"100%",height:"600px",overflow:"scroll"}}
                config={{"layout":"month_view"}}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="px-8 py-16 border-t border-gray-200 dark:border-gray-800 transition-colors">
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
            <div className="flex items-center justify-center lg:justify-start">
              <Image
                src="/logo.png"
                alt="Meiyo Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16">
              <div>
                <h4 className="font-medium mb-4 text-black dark:text-white transition-colors">Company</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 transition-colors">
                  <li>
                    <Link href="/philosophy" className="hover:text-black dark:hover:text-white transition-colors">
                      Our Philosophy
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-4 text-black dark:text-white transition-colors">Contact</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400 transition-colors">
                  <li>
                    <Link href="mailto:siddhant@meiyo.online" className="hover:text-black dark:hover:text-white transition-colors">
                      siddhant@meiyo.online
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-sm transition-colors text-center lg:text-left">
            <p>© 2025 Meiyo. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}
