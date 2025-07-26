"use client"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Preloader } from "@/components/preloader"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("")

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
      
      {/* Fixed Theme Toggle - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <div className="scale-125">
          <ThemeToggle />
        </div>
      </div>
      
      <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* Fixed Floating Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center justify-between px-8 py-2 backdrop-blur-xl bg-white/60 dark:bg-black/40 rounded-full border border-gray-200/50 dark:border-gray-600/70 shadow-lg dark:shadow-gray-700/50 w-auto max-w-6xl">
        <div className="flex items-center mr-4">
          <Image
            src="/logo.png"
            alt="Meiyo Logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </div>

        <nav className="hidden md:flex items-center gap-4 mx-3">
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

        <div className="flex items-center gap-2 ml-4">
          <Button variant="outline" className="bg-black dark:bg-white text-white dark:text-black border-black dark:border-white hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-3 py-1 text-xs flex items-center gap-1">
            Book a call
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Centered Container for entire website */}
      <div className="max-w-6xl mx-auto pt-20">

        {/* Hero Section */}
        <section className="px-8 py-16 lg:py-20">
          <div className="text-left">
            <h1 className="text-[40px] font-bold leading-tight mb-2 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>
              meiyo<span className="inline-block w-2 h-2 bg-black dark:bg-white rounded-full ml-1"></span>
            </h1>
            <p className="text-[38px] font-bold leading-tight text-gray-600 dark:text-custom-gray transition-colors" style={{fontWeight: '700'}}>Honor. Prestige. Your ideas respected.</p>
          </div>

          {/* Large content area */}
          <div className="mt-16">
            <div className="w-full h-80 bg-white/[0.08] rounded-lg transition-colors"></div>
          </div>
        </section>

        {/* What Meiyo Means Section */}
        <section id="platform" className="px-8 py-16 text-left">
          <h2 className="text-xl font-semibold mb-8 text-black dark:text-white transition-colors" style={{fontWeight: '600'}}>What 'meiyo' means to us</h2>
          <div className="space-y-6 text-gray-700 dark:text-custom-gray leading-relaxed max-w-2xl transition-colors">
            <p>
              'Meiyo' is the Japanese word for honor, prestige, and deep respect — values that shape how we treat each
              client's vision. We believe every MVP begins with recognition and mindful craftsmanship.
            </p>
            <p>
              We honor your ideas by offering gentle guidance, clear fixed pricing, and a process built on trust. Here,
              you're not just a client — your story is the heart of what we build together.
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-8 mt-16 text-black dark:text-white transition-colors" style={{fontWeight: '600'}}>What we do</h2>
          <div className="space-y-6 text-gray-700 dark:text-custom-gray leading-relaxed max-w-2xl transition-colors">
            <p>
              Like a gardener tending the first bud of spring, we help visionaries gently shape their ideas into living
              products. Your MVP is approached with patience, honor, and a respect rooted in Japanese artistry.
            </p>
            <p>
              Trust our hands to cultivate what you imagine — each step guided by care and stillness, as a stone garden
              reveals balance. We bring clarity and fixed pricing, turning inspiration into form with quiet precision.
            </p>
          </div>
        </section>

        {/* Personal Works Section */}
        <section id="works" className="px-8 py-16 text-left">
          <h2 className="text-xl font-semibold mb-8 text-black dark:text-white transition-colors" style={{fontWeight: '600'}}>Personal Works</h2>
          <p className="text-gray-700 dark:text-custom-gray leading-relaxed mb-12 max-w-2xl transition-colors">
            A gallery of projects crafted by our own team — click to explore live demonstrations of concept sites
            reflecting meiyo's blend of simplicity and refinement.
          </p>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-white/[0.08] rounded-lg hover:bg-white/[0.12] transition-colors cursor-pointer"
              ></div>
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
              <Button className="w-full text-white dark:bg-custom-white dark:text-black hover:dark:bg-gray-100 border-0 rounded-full py-4 font-medium text-base transition-colors" style={{backgroundColor: 'rgba(255, 255, 255, 0.08)', color: 'white'}} onMouseEnter={(e) => {(e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.12)'; (e.target as HTMLElement).style.color = 'white'}} onMouseLeave={(e) => {(e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; (e.target as HTMLElement).style.color = 'white'}}>
                Begin the journey
              </Button>
            </div>

            {/* Twin Garden */}
            <div className="bg-gray-50 dark:bg-custom-card p-8 rounded-2xl transition-colors">
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
            </div>

            {/* Evergreen Care */}
            <div className="bg-gray-50 dark:bg-custom-card p-8 rounded-2xl transition-colors">
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
              <Button className="w-full text-white dark:bg-custom-white dark:text-black hover:dark:bg-gray-100 border-0 rounded-full py-4 font-medium text-base mt-[1.625rem] transition-colors" style={{backgroundColor: 'rgba(255, 255, 255, 0.08)', color: 'white'}} onMouseEnter={(e) => {(e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.12)'; (e.target as HTMLElement).style.color = 'white'}} onMouseLeave={(e) => {(e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.08)'; (e.target as HTMLElement).style.color = 'white'}}>
                Sustain and grow
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="px-8 py-16">
          <div className="space-y-4 max-w-4xl mx-auto">
            <Collapsible>
              <CollapsibleTrigger 
                className="flex items-center justify-between w-full p-4 bg-white/[0.08] dark:bg-custom-card rounded-lg text-left dark:hover:bg-gray-800 transition-colors"
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              >
                <span className="text-black dark:text-white">How do we begin working together?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                We start with a gentle conversation about your vision, followed by a clear proposal that honors your
                ideas and timeline.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger 
                className="flex items-center justify-between w-full p-4 bg-white/[0.08] dark:bg-custom-card rounded-lg text-left dark:hover:bg-gray-800 transition-colors"
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              >
                <span className="text-black dark:text-white">Is pricing fixed? Any hidden fees?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 text-gray-600 dark:text-custom-gray transition-colors">
                Our pricing is transparent as water. What you see is what you invest, with no hidden costs or surprise
                additions.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger 
                className="flex items-center justify-between w-full p-4 bg-white/[0.08] dark:bg-custom-card rounded-lg text-left dark:hover:bg-gray-800 transition-colors"
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              >
                <span className="text-black dark:text-white">How long does it take to launch an MVP?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 text-gray-600 dark:text-custom-gray transition-colors">
                Like tending a garden, we work with patience and precision. Most MVPs bloom within 4-8 weeks, depending
                on complexity.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger 
                className="flex items-center justify-between w-full p-4 bg-white/[0.08] dark:bg-custom-card rounded-lg text-left dark:hover:bg-gray-800 transition-colors"
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              >
                <span className="text-black dark:text-white">Is pricing fixed? Any hidden fees?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                Our pricing is transparent as water. What you see is what you invest, with no hidden costs or surprise
                additions.
              </CollapsibleContent>
            </Collapsible>

            <Collapsible>
              <CollapsibleTrigger 
                className="flex items-center justify-between w-full p-4 bg-white/[0.08] dark:bg-custom-card rounded-lg text-left dark:hover:bg-gray-800 transition-colors"
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.08)'}
              >
                <span className="text-black dark:text-white">How long does it take to launch an MVP?</span>
                <Plus className="w-5 h-5 text-gray-500 dark:text-gray-400 transition-colors" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-white/[0.06] dark:bg-custom-card text-gray-600 dark:text-custom-gray transition-colors rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                Like tending a garden, we work with patience and precision. Most MVPs bloom within 4-8 weeks, depending
                on complexity.
              </CollapsibleContent>
            </Collapsible>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="px-8 py-16 border-t border-gray-200 dark:border-gray-800 transition-colors">
          <div className="flex flex-col lg:flex-row justify-between gap-12">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="Meiyo Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              <div>
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
              </div>

              <div>
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
              </div>

              <div>
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
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-sm transition-colors">
            <p>© 2023–2025</p>
            <p>All Rights Reserved</p>
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}
