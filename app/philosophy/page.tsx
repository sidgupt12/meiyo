"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* Fixed Header */}
      <header className="fixed top-4 inset-x-0 z-50 mx-auto flex items-center justify-between w-full max-w-[calc(100vw-2rem)] md:max-w-3xl px-1 sm:px-2 md:px-4 py-1 sm:py-2 backdrop-blur-xl bg-white/60 dark:bg-black/40 rounded-full border border-gray-200/50 dark:border-gray-600/70 shadow-lg dark:shadow-gray-700/50">
        {/* Left: Back button */}
        <div className="flex items-center mr-1 sm:mr-2 md:mr-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="rounded-full px-3 py-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Meiyo Logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
        </div>

        {/* Right: Theme toggle */}
        <div className="flex items-center ml-1 sm:ml-2 md:ml-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto pt-24 px-8 pb-16">
        <div className="text-center mb-16">
          <h1 className="text-[40px] font-bold leading-tight mb-4 text-black dark:text-white transition-colors" style={{fontWeight: '700'}}>
            Our Philosophy
          </h1>
          <p className="text-xl text-gray-600 dark:text-custom-gray transition-colors">
            The principles that guide our craft
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 dark:text-custom-gray transition-colors">
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white transition-colors">
                What Meiyo Means
              </h2>
              <div className="space-y-4">
                <p>
                  'Meiyo' (名誉) is the Japanese word for honor, prestige, and deep respect. It represents the reverence we hold for each client's vision and the responsibility we feel in bringing their ideas to life.
                </p>
                <p>
                  In Japanese culture, meiyo is not just about recognition. It's about the integrity of one's work, the respect shown to others, and the mindful approach to every task. These values form the foundation of how we approach MVP development.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white transition-colors">
                Craftsmanship Over Speed
              </h2>
              <div className="space-y-4">
                <p>
                  While we work efficiently, we never sacrifice quality for speed. Every line of code, every design decision, every user interaction is considered with care. We believe that rushing leads to technical debt and poor user experiences.
                </p>
                <p>
                  Like a master craftsman who takes pride in their work, we approach each project with patience and attention to detail. Your MVP deserves nothing less than our best effort.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white transition-colors">
                Transparency in Everything
              </h2>
              <div className="space-y-4">
                <p>
                  No hidden costs. No surprise changes. No unclear timelines. We believe in complete transparency from the first conversation to the final deployment.
                </p>
                <p>
                  You'll always know exactly what we're working on, why we're making certain decisions, and what to expect next. This isn't just good business—it's showing respect for your time and investment.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white transition-colors">
                Your Vision, Honored
              </h2>
              <div className="space-y-4">
                <p>
                  We don't impose our ideas on your project. Instead, we listen deeply to understand your vision, then use our expertise to bring it to life in the most effective way possible.
                </p>
                <p>
                  Every suggestion we make, every technology choice, every design decision is made with your specific goals in mind. Your success is our success, and we take that responsibility seriously.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white transition-colors">
                Sustainable Growth
              </h2>
              <div className="space-y-4">
                <p>
                  We don't just build MVPs. We build foundations for growth. Every technical decision is made with scalability in mind, ensuring your product can evolve as your user base grows.
                </p>
                <p>
                  Clean code, proper documentation, and thoughtful architecture aren't luxuries. They're necessities for any product that aims to succeed long term.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white transition-colors">
                Mindful Technology
              </h2>
              <div className="space-y-4">
                <p>
                  We choose technologies not because they're trendy, but because they're the right fit for your specific needs. Sometimes that means using the latest frameworks, sometimes it means sticking with proven solutions.
                </p>
                <p>
                  Our goal is always to create something that works reliably, performs well, and can be maintained easily as your product grows.
                </p>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/">
            <Button className="bg-black dark:bg-white text-white dark:text-black border-0 rounded-full px-8 py-3">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
