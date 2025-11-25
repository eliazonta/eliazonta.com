'use client'

import React, { useRef, useEffect, useCallback } from 'react'

interface ProgressBarProps {
  targetRef: React.RefObject<HTMLElement>
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ targetRef }) => {
  const progressRef = useRef<HTMLDivElement>(null)

  const updateProgress = useCallback(() => {
    if (targetRef.current && progressRef.current) {
      const windowScrollTop = window.scrollY || document.documentElement.scrollTop
      const totalHeight = targetRef.current.scrollHeight - window.innerHeight
      const scrolled = Math.min((windowScrollTop / totalHeight) * 100, 100)
      
      progressRef.current.style.transform = `translateX(${scrolled - 100}%)`
    }
  }, [targetRef])

  useEffect(() => {
    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          updateProgress()
          rafId = null
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    updateProgress()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateProgress)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [updateProgress])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-black overflow-hidden">
      <div
        ref={progressRef}
        className="h-full w-full bg-white transform -translate-x-full transition-transform duration-150 ease-out"
      />
    </div>
  )
}