import { useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface LaTeXRendererProps {
  latex: string
  displayMode?: boolean
}

export default function LaTeXRenderer({ latex, displayMode = true }: LaTeXRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      katex.render(latex, containerRef.current, {
        displayMode: displayMode,
        throwOnError: false,
        output: 'html',
        leqno: false,
        fleqn: false,
        strict: false,
        trust: true,
        macros: {
          '\\f': '#1f(#2)'
        }
      })
    }
  }, [latex, displayMode])

  return <div ref={containerRef} className="overflow-x-auto" />
}