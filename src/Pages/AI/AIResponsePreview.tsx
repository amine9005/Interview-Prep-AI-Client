import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useState } from "react";
import { CheckSquare, Code, LucideClipboard } from "lucide-react";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const AIResponsePreview = ({ content }: { content: string }) => {
  if (!content) return <>Unable to get the answer</>;
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-[14px] prose prose-slate dark:prose-invert max-w-none">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";

              const isInline = !className;

              return isInline ? (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                />
              ) : (
                <code className="px-1 py-0.5 rounded text-sm" {...props}>
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <p className="mb-4 leading-5">{children}</p>;
            },
            strong({ children }) {
              return <strong className="">{children}</strong>;
            },
            em({ children }) {
              return <em className="">{children}</em>;
            },
            ul({ children }) {
              return (
                <ul className="list-disc pl-6 space-y-2 my-4">{children}</ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="list-decimal pl-6 space-y-2 my-4">{children}</ol>
              );
            },
            li({ children }) {
              return <li className="mb-1">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-t-4 border-gray-200 pl-4 italic my-4">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return (
                <h1 className="text-xs md:text-2xl font-bold mt-6 mb-4">
                  {children}
                </h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-xs md:text-xl font-bold mt-6 mb-3">
                  {children}
                </h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-xs md:text-lg font-bold mt-5 mb-2">
                  {children}
                </h3>
              );
            },
            h4({ children }) {
              return (
                <h4 className="text-xs md:text-base font-bold mt-4 mb-2">
                  {children}
                </h4>
              );
            },
            a({ children, href }) {
              return (
                <a href={href} className="text-orange-400 hover:underline">
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="">{children}</thead>;
            },
            tbody({ children }) {
              return (
                <tbody className="divide-y divide-gray-200 ">{children}</tbody>
              );
            },
            tr({ children }) {
              return <tr className="bg-gray-50">{children}</tr>;
            },
            th({ children }) {
              return (
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="px-3 py-2 whitespace-nowrap text-sm">
                  {children}
                </td>
              );
            },

            hr({ children }) {
              return <hr className="my-6 border-gray-200">{children}</hr>;
            },
            img({ src, alt }) {
              return (
                <img src={src} alt={alt} className="max-w-full my-4 rounded" />
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative my-6 rounded-lg overflow-hidden border border-gray-300">
      <div className="">
        <div>
          <Code className="size-8" />
          <span className="">{language || ""}</span>
        </div>
        <button onClick={copyCode}>
          {copied ? (
            <CheckSquare></CheckSquare>
          ) : (
            <LucideClipboard></LucideClipboard>
          )}
          {copied && <span className="">Copied!</span>}
        </button>
      </div>

      <SyntaxHighlighter language={language} style={docco}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default AIResponsePreview;
