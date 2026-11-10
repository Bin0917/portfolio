import { Fragment } from "react";

interface RichTextProps {
  text: string;
}

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`)/g;

/** 데이터 문자열의 **굵게** 와 `코드` 표기만 해석한다 */
export function RichText({ text }: RichTextProps) {
  return (
    <>
      {text.split(TOKEN).map((part, index) => {
        if (part.startsWith("**")) {
          return (
            <strong key={index} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`")) {
          return (
            <code
              key={index}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}
