import { Text } from "@chakra-ui/react";
import { linkSync } from "fs";
import React, { ReactElement } from "react";
import { ReactMarkdownProps } from "react-markdown/lib/complex-types";
import MarkdownLink from "./MarkdownLink";

type MarkdownParserProps =
  | keyof JSX.IntrinsicElements
  | React.ComponentType<
      React.ClassAttributes<HTMLParagraphElement> &
        React.HTMLAttributes<HTMLParagraphElement> &
        ReactMarkdownProps
    >
  | undefined;

const MarkdownParser: MarkdownParserProps = ({ node, children, ...props }) => {
  const nodeType = node.children[0].type as string;

  let linkText: string = "";
  if (nodeType === `text`) {
    const linkMatch = (children[0] as string).match(/\s*\[(.+?)\]\s*/);

    if (linkMatch && linkMatch.length >= 1) {
      linkText = linkMatch[1];
    }
  }

  return nodeType !== "text" || !linkText ? (
    <Text {...props}>{children}</Text>
  ) : (
    <Text {...props}>
      <MarkdownLink text={linkText} />
    </Text>
  );

  //   return link ? (
  //     <p {...props}>
  //       <MarkdownLink text={link} />
  //     </p>
  //   ) : (
  //     <p {...props}>{children}</p>
  //   );
};

export default MarkdownParser;
