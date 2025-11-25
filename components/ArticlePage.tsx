'use client'

import React, { useRef, useMemo } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import 'katex/dist/katex.min.css'
import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { Button } from './ui/button'
import { ArrowUp } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import katex from 'katex'

const TableOfContents: React.FC<{ content: string }> = React.memo(({ content }) => {
    const headings = useMemo(() => {
      const lines = content.split('\n');
      const headingRegex = /^#{1,3} .+$/;
      const codeBlockRegex = /^```/;
      let isInCodeBlock = false;
      
      return lines.reduce((acc, line) => {
        if (codeBlockRegex.test(line)) {
          isInCodeBlock = !isInCodeBlock;
          return acc;
        }
        
        if (!isInCodeBlock && headingRegex.test(line)) {
          acc.push(line);
        }
        
        return acc;
      }, [] as string[]);
    }, [content])
  
    if (headings.length === 0) {
      return null;
    }
  
    return (
      <nav className="toc mb-12 p-6 bg-[#141414] rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Table of Contents</h2>
        <ul className="space-y-2">
          {headings.map((heading, index) => {
            const level = heading.match(/^#+/)?.[0].length || 1
            const text = heading.replace(/^#+\s/, '')
            return (
              <li key={index} className={`pl-${(level - 1) * 4}`}>
                <Link 
                  href={`#${text.toLowerCase().replace(/\s/g, '-')}`} 
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm md:text-base"
                >
                  {text}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  })
  
TableOfContents.displayName = 'TableOfContents'

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
}

interface ArticlePageProps {
  title: string;
  content: string | React.ReactNode;
  contentType?: 'markdown' | 'latex' | 'jsx';
}

export default function ArticlePage({ title, content, contentType = 'markdown' }: ArticlePageProps) {
  const articleRef = useRef<HTMLElement>(null)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getImageProps = (src: string, alt: string | undefined): ImageProps => ({
    src,
    alt: alt || 'Article image',
    width: 800,
    height: 600,
    className: "object-cover rounded-lg shadow-lg",
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  });

  const memoizedMarkdownComponents = useMemo<Components>(() => ({
    h1: ({ children, ...props }) => <h1 id={children?.toString().toLowerCase().replace(/\s/g, '-')} className="text-2xl md:text-3xl lg:text-4xl font-bold mt-12 mb-6 text-white" {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 id={children?.toString().toLowerCase().replace(/\s/g, '-')} className="text-xl md:text-2xl lg:text-3xl font-semibold mt-10 mb-5 text-white" {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 id={children?.toString().toLowerCase().replace(/\s/g, '-')} className="text-lg md:text-xl lg:text-2xl font-medium mt-8 mb-4 text-white" {...props}>{children}</h3>,
    p: ({ children, ...props }) => {
      const childrenArray = React.Children.toArray(children);
      const hasNonEmptyContent = childrenArray.some(child => {
        if (typeof child === 'string') {
          return child.trim() !== '';
        }
        return React.isValidElement(child);
      });

      if (!hasNonEmptyContent) {
        return <p className="mb-6 text-base md:text-lg" {...props}>&nbsp;</p>;
      }

      return (
        <p className="mb-6 text-base md:text-lg last:mb-0" {...props}>
          {childrenArray.map((child, index) => {
            if (React.isValidElement(child) && child.type === 'img') {
              return <React.Fragment key={index}>{child}</React.Fragment>;
            }
            return child;
          })}
        </p>
      );
    },
    img: ({ src, alt, ...props }) => {
      if (typeof src !== 'string') {
        return null;
      }
      
      const imageProps = getImageProps(src, alt);
      
      return (
        <figure className="my-8">
          <div className="relative w-full h-[600px]">
            <Image {...imageProps} alt={imageProps.alt} />
          </div>
          {alt && <figcaption className="text-center text-sm mt-2 text-gray-400">{alt}</figcaption>}
        </figure>
      );
    },
    a: ({ children, ...props }) => <a className="text-gray-300 hover:text-white underline transition-colors duration-200" {...props}>{children}</a>,
    code: ({ inline, className, children, ...props }: CodeProps) => {
      if (inline) {
        return <code className="bg-[#1a1a1a] px-1 py-0.5 rounded" {...props}>{children}</code>
      }
      return (
        <pre className="whitespace-pre-wrap break-words bg-[#1a1a1a] p-4 rounded-md mb-6">
          <code {...props}>{children}</code>
        </pre>
      )
    },
  }), [])

  const processedContent = useMemo(() => {
    if (contentType === 'latex' && typeof content === 'string') {
      try {
        // Helper function for processing aligned content - using a const function expression
        const processAlignedContent = (alignContent: string): string => {
          const lines = alignContent.trim().split('\n');
          const trimmedLines: string[] = [];
          
          for (let i = 0; i < lines.length; i++) {
            const trimmedLine = lines[i].trim();
            if (trimmedLine) {
              trimmedLines.push(trimmedLine);
            }
          }
          
          return trimmedLines.join(' \\\\ ');
        };
        
        return content
          .replace(/\\documentclass.*?\\begin{document}/s, '') // Remove preamble
          .replace(/\\end{document}.*$/, '') // Remove end
          .replace(/\\maketitle/, '') // Remove title command
          
          // Convert sections with special styling
          .replace(/\\section{(.*?)}/g, '<h2 class="text-2xl md:text-3xl font-bold mt-12 mb-6 text-white">$1</h2>')
          .replace(/\\subsection{(.*?)}/g, '<h3 class="text-xl md:text-2xl font-semibold mt-8 mb-4 text-white">$1</h3>')
          
          // Handle math environments first
          .replace(/\\begin{align\*}(.*?)\\end{align\*}/gs, 
            (match: string, content: string): string => {
              const alignedContent = processAlignedContent(content);
              return katex.renderToString(alignedContent, {
                displayMode: true,
                throwOnError: false,
                strict: false,
                trust: true
              });
            })
          
          .replace(/\\begin{aligned}(.*?)\\end{aligned}/gs,
            (match: string, content: string): string => {
              const alignedContent = processAlignedContent(content);
              return katex.renderToString(alignedContent, {
                displayMode: true,
                throwOnError: false,
                strict: false,
                trust: true
              });
            })
          
          // Handle paragraphs with math
          .replace(/\\paragraph{([^}]*)}/, '<p class="font-semibold mt-4">$1</p>')
          
          // Handle display math
          .replace(/\\\[([\s\S]*?)\\\]/g, (_: string, math: string) => 
            katex.renderToString(math.trim(), {
              displayMode: true,
              throwOnError: false,
              strict: false,
              trust: true
            })
          )
          
          // Handle inline math
          .replace(/\$([^$]+)\$/g, (_: string, math: string) => 
            katex.renderToString(math.trim(), {
              displayMode: false,
              throwOnError: false,
              strict: false,
              trust: true
            })
          )
          
          // Handle special LaTeX commands before general text processing
          .replace(/\\underbrace{([^}]*)}_{([^}]*)}/g, (_, content, under) =>
            katex.renderToString(`\\underbrace{${content}}_{${under}}`, {
              displayMode: false,
              throwOnError: false,
              strict: false,
              trust: true
            })
          )
          
          // Handle more math operators
          .replace(/\\Pr/g, '\\operatorname{Pr}')
          .replace(/\\Big/g, '\\big')
          .replace(/\\mid/g, '|')
          
          // Convert text formatting
          .replace(/\\textbf{(.*?)}/g, '<strong>$1</strong>')
          .replace(/\\textit{(.*?)}/g, '<em>$1</em>')
          .replace(/\\emph{(.*?)}/g, '<em>$1</em>')
          
          // Convert environments with proper indentation and bullets
          .replace(/\\begin{itemize}([\s\S]*?)\\end{itemize}/gs, 
            function processItemize(match: string, content: string, offset: number, string: string, depth = 0) {
              const items = content
                .split('\\item')
                .filter((item: string) => item.trim())
                .map((item: string) => {
                  // Process nested itemize environments recursively
                  let processedItem = item.trim();
                  if (processedItem.includes('\\begin{itemize}')) {
                    processedItem = processedItem.replace(
                      /\\begin{itemize}([\s\S]*?)\\end{itemize}/g,
                      (m: string, c: string) => processItemize(m, c, 0, '', depth + 1)
                    );
                  }
                  // Process any math within the item
                  processedItem = processedItem.replace(/\$([^$]+)\$/g, (_: string, math: string) => 
                    katex.renderToString(math.trim(), {
                      displayMode: false,
                      throwOnError: false,
                      strict: false,
                      trust: true
                    })
                  );
                  
                  // Different bullet styles and indentation for different depths
                  const bulletStyle = depth === 0 
                    ? "before:content-['•'] before:mr-2 before:absolute before:left-0" 
                    : "before:content-['-'] before:mr-2 before:absolute before:left-8";
                  
                  // Increase left padding for nested items
                  const indentClass = depth > 0 ? 'ml-16' : 'ml-0';
                  
                  return `<li class="mb-4 relative pl-6 ${indentClass} ${bulletStyle}">${processedItem}</li>`;
                })
                .join('');
              
              return `<ul class="list-none space-y-2">${items}</ul>`;
            })
          
          .replace(/\\begin{enumerate}([\s\S]*?)\\end{enumerate}/gs, 
            (_: string, content: string) => {
              const items = content
                .split('\\item')
                .filter((item: string) => item.trim())
                .map((item: string, index: number) => {
                  const processedItem = item
                    .trim()
                    .replace(/\$([^$]+)\$/g, (_: string, math: string) => 
                      katex.renderToString(math.trim(), {
                        displayMode: false,
                        throwOnError: false,
                        strict: false,
                        trust: true
                      })
                    );
                  return `<li class="mb-4">${processedItem}</li>`;
                })
                .join('');
              return `<ol class="list-decimal pl-8 space-y-2">${items}</ol>`;
            })
          
          // Handle bibliography
          .replace(/\\begin{thebibliography}{.*?}([\s\S]*?)\\end{thebibliography}/g, 
            (_: string, content: string) => {
              const bibItems = content.split('\\bibitem');
              return `
                <h2 class="text-2xl md:text-3xl font-bold mt-12 mb-6 text-white">References</h2>
                <div class="space-y-4">
                  ${bibItems
                    .slice(1)
                    .map((item: string) => {
                      const cleanedItem = item
                        .replace(/^{([^}]*)}/, '')
                        .replace(/\\emph{([^}]*)}/g, '<em>$1</em>')
                        .replace(/\n+/g, ' ')
                        .trim();
                      return `<p class="pl-8 -indent-8">${cleanedItem}</p>`;
                    })
                    .join('\n')}
                </div>
              `;
            })
          
          // Handle footnotes
          .replace(/\\footnote{([^}]*)}/g, 
            (_, content) => `<sup class="text-sm">${content}</sup>`)
          
          // Handle LaTeX commands
          .replace(/\\text{(.*?)}/g, '$1')
          .replace(/\\quad/g, ' ')
          .replace(/\\sim/g, '~')
          .replace(/\\rightarrow/g, '→')
          .replace(/\\leftarrow/g, '←')
          .replace(/\\Rightarrow/g, '⇒')
          .replace(/\\Leftarrow/g, '⇐')
          .replace(/\\ldots/g, '...')
          .replace(/\\cdots/g, '⋯')
          .replace(/~+/g, ' ')
          
          // Clean up duplicate renderings
          .replace(/([^>])\n\n+/g, '$1</p><p>')
          .replace(/<\/p><p>(\s*<span class="katex-display">)/g, '$1')
          .replace(/(<\/span>\s*)<p>/g, '$1')
          
          // Clean up paragraphs and spacing
          .replace(/\n{3,}/g, '\n\n')
          .replace(/\n\n+/g, '</p><p>')
          .replace(/\\\\/, '<br>')
          .replace(/^(?!<[hp])/gm, '<p>')
          .replace(/(?<!>)\s*$/gm, '</p>')
          .replace(/\s{2,}/g, ' ')
          .replace(/\n{3,}/g, '\n\n');
      } catch (error) {
        console.error('Error processing LaTeX:', error);
        return '<p>Error rendering content.</p>';
      }
    }
    return '';
  }, [content, contentType]);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <ProgressBar targetRef={articleRef} />
      <main className="flex-grow px-4 py-16">
        <div className="relative max-w-[60rem] mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-[#141414] rounded-lg"></div>
          <div className="relative p-[1px] rounded-lg">
            <article ref={articleRef} className="p-8 bg-[#141414] rounded-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white leading-tight">
                {title.split(': ').map((part, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <>
                        <span>:</span>
                        <br />
                      </>
                    )}
                    <span>{part}</span>
                  </React.Fragment>
                ))}
              </h1>
              <TableOfContents content={contentType === 'markdown' && typeof content === 'string' ? content : ''} />
              {contentType === 'markdown' && typeof content === 'string' ? (
                <ReactMarkdown
                  className="prose prose-lg md:prose-xl prose-invert text-gray-300 leading-relaxed max-w-none"
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex]}
                  components={memoizedMarkdownComponents}
                >
                  {content}
                </ReactMarkdown>
              ) : contentType === 'latex' ? (
                <div 
                  className="prose prose-lg md:prose-xl prose-invert text-gray-300 leading-relaxed max-w-none"
                  dangerouslySetInnerHTML={{ __html: processedContent }} 
                />
              ) : (
                // For JSX content
                <div className="prose prose-lg md:prose-xl prose-invert text-gray-300 leading-relaxed max-w-none">
                  {content}
                </div>
              )}
            </article>
          </div>
        </div>
      </main>
      <Footer />
      <Button
        className="fixed bottom-8 right-8 p-2 bg-white hover:bg-gray-200 text-black rounded-full shadow-lg transition-all duration-300 opacity-0 hover:opacity-100 focus:opacity-100"
        onClick={scrollToTop}
      >
        <ArrowUp size={24} />
      </Button>
    </div>
  )
}