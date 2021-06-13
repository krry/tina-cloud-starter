import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import Image from "next/image";
import type { CoverPage_Doc_Data } from "../.tina/__generated__/types";
import styles from "./home.module.css";

export const HomePage = (props: CoverPage_Doc_Data) => {
  let scroller;
  let subtitlesEl = useRef<HTMLDivElement | null>();
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(true);
  const [footerY, setFooterY] = useState("100%");
  const [contentOpacity, setContentOpacity] = useState(0);
  const [subtitlesOpacity, setSubtitlesOpacity] = useState(0);

  useEffect(() => {
    const subtitles = subtitlesEl.current.children;

    setFooterY("0");
    setContentOpacity(1);
    setSubtitlesOpacity(1);
    setPaused(false);

    const timer = setTimeout(() => {
      scroller = setInterval(() => {
        if (subtitlesEl?.current) {
          if (count >= subtitles.length) clearInterval(scroller);
          setCount(count + 1);
          if (!paused) {
            subtitlesEl.current.scrollTop += 100;
          }
        }
      }, 4000);
    }, 5000);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <>
      <div className={styles.content} style={{ opacity: contentOpacity }}>
        <div className={styles.frame}>
          {props.blocks
            ? props.blocks.map((block, i) => {
                if (block.__typename === "Message_Data") {
                  return (
                    <h1 className={styles.title} key={block.messageHeader}>
                      {block.messageHeader}
                    </h1>
                  );
                } else return <h1 className={styles.title}>Teem</h1>;
              })
            : null}
        </div>
        <div
          ref={subtitlesEl}
          className={styles.subtitles}
          style={{ opacity: subtitlesOpacity }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {props.blocks
            ? props.blocks.map(function (block, i) {
                switch (block.__typename) {
                  case "Message_Data":
                    return (
                      <React.Fragment key={`block-${block.messageHeader}`}>
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
        </div>
      </div>
      <footer
        className={styles.homeFooter}
        style={{
          transform: `translateY(${footerY})`,
        }}
      >
        <span>Coming next from</span>
        <Link href="https://krry.dev">krry</Link>
      </footer>
    </>
  );
};
