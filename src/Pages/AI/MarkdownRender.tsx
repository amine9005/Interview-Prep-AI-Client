import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

type MarkdownRenderProps = {
  children: string;
};

export function MarkdownRender({ children: markdown }: MarkdownRenderProps) {
  return (
    <div className="container w-xs md:w-full mx-auto ">
      <div className="text-[14px] prose prose-slate dark:prose-invert max-w-none">
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const isInline = !className;
              return !isInline && match ? (
                <SyntaxHighlighter
                  style={dracula}
                  PreTag="div"
                  language={match[1]}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
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
                <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-xl font-bold mt-6 mb-3">{children}</h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-lg font-bold mt-5 mb-2">{children}</h3>
              );
            },
            h4({ children }) {
              return (
                <h4 className="text-base font-bold mt-4 mb-2">{children}</h4>
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
          {markdown}
        </Markdown>
      </div>
    </div>
  );
}
