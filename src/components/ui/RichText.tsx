import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function RichText({
    children,
    className = "",
}: {
    children: string | undefined;
    className?: string;
}) {
    if (!children) return null;

    return (
        <div className={className}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                    p: ({ children }) => <p className="mb-3 last:mb-0 text-justify">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-3 text-justify">{children}</ul>,
                    a: ({ children, href }) => (
                        <a href={href} target="_blank" rel="noopener noreferrer" className="underline">
                            {children}
                        </a>
                    ),
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
}