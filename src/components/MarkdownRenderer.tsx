import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  // Simple markdown parser for basic syntax
  const parseMarkdown = (text: string): React.ReactNode[] => {
    if (!text) return [];
    
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    
    lines.forEach((line, index) => {
      // Headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold mb-4 mt-8 first:mt-0">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-2xl font-semibold mb-3 mt-6 first:mt-0">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-xl font-semibold mb-2 mt-4 first:mt-0">
            {line.substring(4)}
          </h3>
        );
      }
      // Code blocks
      else if (line.startsWith('```')) {
        const codeStartIndex = index;
        let codeEndIndex = index;
        
        // Find the end of the code block
        for (let i = index + 1; i < lines.length; i++) {
          if (lines[i].startsWith('```')) {
            codeEndIndex = i;
            break;
          }
        }
        
        if (codeEndIndex > codeStartIndex) {
          const codeContent = lines.slice(codeStartIndex + 1, codeEndIndex).join('\n');
          const language = line.substring(3).trim();
          
          elements.push(
            <pre key={index} className="bg-muted rounded-lg p-4 overflow-x-auto my-4">
              <code className={`language-${language}`}>
                {codeContent}
              </code>
            </pre>
          );
          
          // Skip the lines we've already processed
          for (let i = codeStartIndex + 1; i <= codeEndIndex; i++) {
            lines[i] = ''; // Mark as processed
          }
        }
      }
      // Inline code
      else if (line.includes('`')) {
        const parts = line.split('`');
        const lineElements: React.ReactNode[] = [];
        
        parts.forEach((part, partIndex) => {
          if (partIndex % 2 === 1) {
            // Odd indices are code
            lineElements.push(
              <code key={partIndex} className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
                {part}
              </code>
            );
          } else {
            // Even indices are regular text
            lineElements.push(part);
          }
        });
        
        if (lineElements.length > 0) {
          elements.push(
            <p key={index} className="mb-4 leading-relaxed">
              {lineElements}
            </p>
          );
        }
      }
      // Lists
      else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="ml-4 mb-1">
            {line.substring(2)}
          </li>
        );
      }
      // Bold text
      else if (line.includes('**')) {
        const parts = line.split('**');
        const lineElements: React.ReactNode[] = [];
        
        parts.forEach((part, partIndex) => {
          if (partIndex % 2 === 1) {
            // Odd indices are bold
            lineElements.push(
              <strong key={partIndex} className="font-semibold">
                {part}
              </strong>
            );
          } else {
            // Even indices are regular text
            lineElements.push(part);
          }
        });
        
        if (lineElements.length > 0) {
          elements.push(
            <p key={index} className="mb-4 leading-relaxed">
              {lineElements}
            </p>
          );
        }
      }
      // Tables (basic support)
      else if (line.includes('|')) {
        const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
        
        if (cells.length > 1) {
          const isHeader = line.includes('---') || index === 0;
          const Tag = isHeader ? 'th' : 'td';
          
          elements.push(
            <tr key={index} className={isHeader ? 'border-b border-border' : ''}>
              {cells.map((cell, cellIndex) => (
                <Tag key={cellIndex} className="px-3 py-2 text-left">
                  {cell}
                </Tag>
              ))}
            </tr>
          );
        }
      }
      // Empty lines
      else if (line.trim() === '') {
        elements.push(<br key={`br-${index}`} />);
      }
      // Regular paragraphs
      else if (line.trim()) {
        elements.push(
          <p key={index} className="mb-4 leading-relaxed">
            {line}
          </p>
        );
      }
    });
    
    return elements;
  };

  return (
    <div className={`prose prose-lg prose-gray dark:prose-invert max-w-none ${className}`}>
      {parseMarkdown(content)}
    </div>
  );
};

export default MarkdownRenderer;
