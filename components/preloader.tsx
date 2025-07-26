"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import Image from "next/image"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [logoFadeOut, setLogoFadeOut] = useState(false)
  const [curtainUp, setCurtainUp] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Smooth sequence: rotate once slowly -> fade logo -> open curtain
    const fadeTimer = setTimeout(() => {
      setLogoFadeOut(true)
      // After fade completes, start curtain
      setTimeout(() => {
        setCurtainUp(true)
        // Hide preloader after curtain completes
        setTimeout(() => {
          setIsLoading(false)
        }, 1200)
      }, 600) // Wait for fade to complete
    }, 4000) // One slow rotation (4s)

    return () => clearTimeout(fadeTimer)
  }, [mounted])

  if (!mounted || !isLoading) return null

  const isDark = theme === 'dark'

  return (
    <>
      {/* Custom styles */}
      <style jsx>{`
        @keyframes tire-rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .tire-spin-slow {
          animation: tire-rotate-slow 4s linear forwards;
        }
        
        @keyframes logo-fade-out {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.9); }
        }
        
        .logo-fade {
          animation: logo-fade-out 0.6s ease-out forwards;
        }
        
        @keyframes curtain-lift {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-100%); }
        }
        
        .curtain-up {
          animation: curtain-lift 1.2s ease-in-out forwards;
        }
      `}</style>

      <div className="fixed inset-0 z-[9999] overflow-hidden">
        {/* Curtain */}
        <div 
          className={`absolute inset-0 ${
            isDark ? 'bg-white' : 'bg-black'
          } ${curtainUp ? 'curtain-up' : ''}`}
          style={{
            transformOrigin: 'bottom',
            transition: curtainUp ? 'none' : 'all 0.3s ease'
          }}
        >
          {/* Logo container - centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`relative ${logoFadeOut ? 'logo-fade' : ''}`}>
              {/* Rotating logo with tire effect - rotates once slowly */}
              <div 
                className="w-40 h-40 relative tire-spin-slow"
              >
                <Image
                  src="/logo.png"
                  alt="Meiyo Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Center pin effect - like the center of a tire */}
              <div 
                className={`absolute top-1/2 left-1/2 w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
                  isDark ? 'bg-black shadow-sm' : 'bg-white shadow-sm'
                } border-2 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
              />
              
              {/* Optional: Add small dots around the center for more tire-like effect */}
              <div className="absolute inset-0">
                {[0, 60, 120, 180, 240, 300].map((degree) => (
                  <div
                    key={degree}
                    className={`absolute w-2 h-2 rounded-full ${
                      isDark ? 'bg-black/30' : 'bg-white/30'
                    }`}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${degree}deg) translateY(-45px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
