import { ReactNode, CSSProperties } from 'react';

declare module 'react-syntax-highlighter' {
  export interface SyntaxHighlighterProps {
    children: ReactNode;
    style?: Record<string, CSSProperties>;
    language?: string;
    PreTag?: React.ComponentType<unknown>; // Changed from any to unknown
    [key: string]: unknown;
  }

  export const Prism: React.ComponentType<SyntaxHighlighterProps>;
}

declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
  const atomDark: Record<string, CSSProperties>;
  export { atomDark };
}

declare module 'react-syntax-highlighter/dist/cjs/styles/prism' {
  export const vscDarkPlus: Record<string, CSSProperties>;
}

// Add PrismTheme type
export type PrismTheme = Record<string, CSSProperties | Record<string, CSSProperties>>;