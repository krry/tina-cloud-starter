import React from "react";
import Markdown from "react-markdown";
import Image from "next/image";
import type { CoverPage_Doc_Data } from "../.tina/__generated__/types";

export const CoverPage = (props: CoverPage_Doc_Data) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            switch (block.__typename) {
              case "Message_Data":
                return (
                  <React.Fragment key={`block-${block.messageHeader}`}>
                    <h1>{block.messageHeader}</h1>
                    <Markdown>{block.messageBody}</Markdown>
                  </React.Fragment>
                );
              case "Image_Data":
                return (
                  <React.Fragment key={`diagram-${i}`}>
                    <h1>{block.heading}</h1>
                    <Markdown>{block.imgDescription}</Markdown>
                    <Image
                      loading="lazy"
                      src={block.src || "/asdf"}
                      title={block.heading}
                      layout="responsive"
                      width="1070x"
                      height="1220px"
                    />
                  </React.Fragment>
                );
              default:
                return null;
            }
          })
        : null}
    </>
  );
};
