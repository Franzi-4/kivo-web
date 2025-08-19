import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  // Enhanced markdown parser with better formatting support
  const parseMarkdown = (text: string): React.ReactNode[] => {
    if (!text) return [];
    
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    let inCodeBlock = false;
    let inTable = false;
    let tableRows: React.ReactNode[] = [];
    
    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside mb-6 space-y-2 ml-4">
            {listItems}
          </ul>
        );
        listItems = [];
      }
    };
    
    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <table key={`table-${elements.length}`} className="w-full border-collapse border border-border rounded-lg mb-6 overflow-hidden">
            <tbody>{tableRows}</tbody>
          </table>
        );
        tableRows = [];
        inTable = false;
      }
    };
    
    const parseInlineElements = (text: string): React.ReactNode[] => {
      const result: React.ReactNode[] = [];
      let remaining = text;
      let keyCounter = 0;
      
      while (remaining.length > 0) {
        // Links: [text](url)
        const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const beforeLink = remaining.substring(0, linkMatch.index);
          if (beforeLink) {
            result.push(...parseTextFormatting(beforeLink, keyCounter++));
          }
          result.push(
            <a
              key={keyCounter++}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
            >
              {linkMatch[1]}
            </a>
          );
          remaining = remaining.substring(linkMatch.index! + linkMatch[0].length);
        } else {
          result.push(...parseTextFormatting(remaining, keyCounter++));
          break;
        }
      }
      
      return result;
    };
    
    const parseTextFormatting = (text: string, baseKey: number): React.ReactNode[] => {
      const result: React.ReactNode[] = [];
      let remaining = text;
      let keyCounter = baseKey;
      
      while (remaining.length > 0) {
        // Inline code
        const codeMatch = remaining.match(/`([^`]+)`/);
        if (codeMatch) {
          const beforeCode = remaining.substring(0, codeMatch.index);
          if (beforeCode) {
            result.push(...parseEmphasis(beforeCode, keyCounter++));
          }
          result.push(
            <code key={keyCounter++} className="bg-muted px-2 py-1 rounded text-sm font-mono border">
              {codeMatch[1]}
            </code>
          );
          remaining = remaining.substring(codeMatch.index! + codeMatch[0].length);
        } else {
          result.push(...parseEmphasis(remaining, keyCounter++));
          break;
        }
      }
      
      return result;
    };
    
    const parseEmphasis = (text: string, baseKey: number): React.ReactNode[] => {
      const result: React.ReactNode[] = [];
      let remaining = text;
      let keyCounter = baseKey;
      
      while (remaining.length > 0) {
        // Bold text
        const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
        if (boldMatch) {
          const beforeBold = remaining.substring(0, boldMatch.index);
          if (beforeBold) {
            result.push(...parseItalics(beforeBold, keyCounter++));
          }
          result.push(
            <strong key={keyCounter++} className="font-semibold text-foreground">
              {boldMatch[1]}
            </strong>
          );
          remaining = remaining.substring(boldMatch.index! + boldMatch[0].length);
        } else {
          result.push(...parseItalics(remaining, keyCounter++));
          break;
        }
      }
      
      return result;
    };
    
    const parseItalics = (text: string, baseKey: number): React.ReactNode[] => {
      const result: React.ReactNode[] = [];
      let remaining = text;
      let keyCounter = baseKey;
      
      while (remaining.length > 0) {
        // Italic text (single asterisk or underscore)
        const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)|_([^_]+)_/);
        if (italicMatch) {
          const beforeItalic = remaining.substring(0, italicMatch.index);
          if (beforeItalic) {
            result.push(beforeItalic);
          }
          result.push(
            <em key={keyCounter++} className="italic">
              {italicMatch[1] || italicMatch[2]}
            </em>
          );
          remaining = remaining.substring(italicMatch.index! + italicMatch[0].length);
        } else {
          if (remaining) result.push(remaining);
          break;
        }
      }
      
      return result;
    };
    
    lines.forEach((line, index) => {
      // Skip if already processed (for code blocks)
      if (line === '' && inCodeBlock) return;
      
      // Horizontal rules
      if (line.trim() === '---' && !inCodeBlock) {
        flushList();
        flushTable();
        elements.push(
          <hr key={index} className="my-8 border-border" />
        );
        return;
      }
      
      // Code blocks
      if (line.startsWith('```')) {
        flushList();
        flushTable();
        
        if (!inCodeBlock) {
          inCodeBlock = true;
          const language = line.substring(3).trim();
          const codeLines = [];
          
          // Collect all code lines
          for (let i = index + 1; i < lines.length; i++) {
            if (lines[i].startsWith('```')) {
              lines[i] = ''; // Mark as processed
              break;
            }
            codeLines.push(lines[i]);
            lines[i] = ''; // Mark as processed
          }
          
          elements.push(
            <div key={index} className="my-6">
              <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto">
                <code className={`language-${language} text-sm leading-relaxed`}>
                  {codeLines.join('\n')}
                </code>
              </pre>
            </div>
          );
          inCodeBlock = false;
        }
        return;
      }
      
      // Headings
      if (line.startsWith('# ') && !inCodeBlock) {
        flushList();
        flushTable();
        const headingText = line.substring(2).replace(/\*\*/g, '');
        elements.push(
          <h1 key={index} className="text-4xl font-bold mb-6 mt-10 first:mt-0 text-foreground leading-tight">
            {headingText}
          </h1>
        );
        return;
      }
      
      if (line.startsWith('## ') && !inCodeBlock) {
        flushList();
        flushTable();
        const headingText = line.substring(3).replace(/\*\*/g, '');
        elements.push(
          <h2 key={index} className="text-3xl font-semibold mb-5 mt-8 first:mt-0 text-foreground leading-tight border-b border-border/20 pb-2">
            {headingText}
          </h2>
        );
        return;
      }
      
      if (line.startsWith('### ') && !inCodeBlock) {
        flushList();
        flushTable();
        const headingText = line.substring(4).replace(/\*\*/g, '');
        elements.push(
          <h3 key={index} className="text-2xl font-semibold mb-4 mt-6 first:mt-0 text-foreground leading-tight">
            {headingText}
          </h3>
        );
        return;
      }
      
      // Blockquotes
      if (line.startsWith('> ') && !inCodeBlock) {
        flushList();
        flushTable();
        const quoteContent = line.substring(2);
        elements.push(
          <blockquote key={index} className="border-l-4 border-primary/30 pl-6 py-2 my-6 bg-muted/30 rounded-r-lg italic text-muted-foreground">
            <p className="mb-0">{parseInlineElements(quoteContent)}</p>
          </blockquote>
        );
        return;
      }
      
      // Lists
      if (line.startsWith('- ') && !inCodeBlock) {
        flushTable();
        const listContent = line.substring(2);
        listItems.push(
          <li key={`li-${index}`} className="text-foreground leading-relaxed">
            {parseInlineElements(listContent)}
          </li>
        );
        return;
      }
      
      // Numbered lists
      if (/^\d+\.\s/.test(line) && !inCodeBlock) {
        flushList();
        flushTable();
        const listContent = line.replace(/^\d+\.\s/, '');
        elements.push(
          <ol key={index} className="list-decimal list-inside mb-6 space-y-2 ml-4">
            <li className="text-foreground leading-relaxed">
              {parseInlineElements(listContent)}
            </li>
          </ol>
        );
        return;
      }
      
      // Tables
      if (line.includes('|') && !inCodeBlock) {
        flushList();
        
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        
        if (cells.length > 1 && !line.includes('---')) {
          inTable = true;
          const isHeader = tableRows.length === 0;
          const Tag = isHeader ? 'th' : 'td';
          const headerClass = isHeader ? 'bg-muted font-semibold' : '';
          
          tableRows.push(
            <tr key={index} className={`border-b border-border ${headerClass}`}>
              {cells.map((cell, cellIndex) => (
                <Tag key={cellIndex} className={`px-4 py-3 text-left ${isHeader ? 'font-semibold' : ''}`}>
                  {parseInlineElements(cell)}
                </Tag>
              ))}
            </tr>
          );
        }
        return;
      }
      
      // Empty lines
      if (line.trim() === '' && !inCodeBlock) {
        if (!inTable) {
          flushList();
          flushTable();
        }
        return;
      }
      
      // Regular paragraphs
      if (line.trim() && !inCodeBlock) {
        flushList();
        if (!inTable) flushTable();
        
        elements.push(
          <p key={index} className="mb-6 leading-relaxed text-foreground text-lg">
            {parseInlineElements(line)}
          </p>
        );
        return;
      }
    });
    
    // Flush any remaining items
    flushList();
    flushTable();
    
    return elements;
  };

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <div className="space-y-1">
        {parseMarkdown(content)}
      </div>
    </div>
  );
};

export default MarkdownRenderer;
