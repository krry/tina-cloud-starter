import React from "react";
import { css } from "styled-jsx/css";
import Link from "next/link";
import Head from "next/head";
/**
 * For demonstration purposes, feel free to delete or modify
 * any of these components, no magic going on here!
 */

export const Wrapper = (props: { children: React.ReactNode; data: object }) => {
  return (
    <>
      <Head>
        <title>Teem</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..1000,0..1,0..1,0..1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://pagecdn.io/lib/normalize/8.0.1/normalize.min.css"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </Head>
      <style global jsx>
        {GlobalStyles}
      </style>
      {props.children}
    </>
  );
};

export const Page = (props: { children: React.ReactNode; data: object }) => {
  return (
    <>
      <div className="header">
        <div className="container">
          <Nav />
        </div>
      </div>
      <div className="content">
        <div className="container">
          <div className="card">{props.children}</div>
          <RawRenderer data={props.data} />
        </div>
      </div>
      <style jsx>{PageStyles}</style>
    </>
  );
};

export const GlobalStyles = css.global`
  :root {
    --font: "Recursive", system-ui, -apple-system, BlinkMacSystemFont, Segoe UI,
      Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
      Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;

    --font-weight: 400;
    --font-slant: -4;
    --font-casual: 1;
    --font-mono: 0;
    --font-cursive: 1;

    --white: #fff;
    --gray: #f9f9fb;

    --blue: #241748;
    --blue-light: #2e3258;

    --mint: #b4f4e0;
    --mint-light: #e6faf8;

    --orange: #ec4815;
    --orange-light: #eb6337;

    --flair: hsl(324, 96%, 48%);
    --text: hsl(212, 44%, 92%);
    --bg: hsl(242, 100%, 7%);
    --shade: hsla(242, 10%, 7%, 0.7);
    --shadow: hsla(242, 10%, 7%, 0.2);
    --tint: hsla(212, 44%, 96%, 0.2);
    --accent: hsl(184, 96%, 48%);
    --bold: hsl(224, 96%, 48%);
    --smoke: hsl(212, 27%, 86%);
    --ash: hsl(212, 27%, 66%);
    --jaunt: cubic-bezier(0.618, 0.0618, 0.309, 0.99);
    --breath: 7s;
    --beat: 618ms;
    --beats: 2618ms;
  }

  html {
    background-color: var(--bg);
    color: var(--text);
    font-family: var(--font);
    box-sizing: border-box;
    transition: 404ms var(--jaunt);
  }

  body {
    font-size: clamp(12px, 1.618vw + 1.618vh, 96px);
    background: var(--bg);
    background-size: cover;
    background-image: url("https://images.unsplash.com/photo-1475372674317-8003c861cb6a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2767&q=80");
  }

  * {
    font-variation-settings: "wght" var(--font-weight), "slnt" var(--font-slant),
      "CASL" var(--font-casual), "MONO" var(--font-mono),
      "CRSV" var(--font-cursive);
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    font-family: inherit;
    transition: inherit;
  }
`;

export const PageStyles = css`
  .container {
    display: block;
    max-width: 960px;
    margin: 0 auto;
  }

  .header {
    flex: 0 0 auto;
    padding: 1.5rem;
  }

  .title {
    color: var(--orange);
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
  }

  .content {
    flex: 1 0 auto;
    padding: 0 1.5rem 2rem 1.5rem;
    color: var(--blue);
  }

  .card {
    background: var(--white);
    border-radius: 0.5rem;
    border: 1px solid var(--mint);
    box-shadow: 0 6px 24px rgba(36, 23, 72, 0.03),
      0 2px 4px rgba(36, 23, 72, 0.03);
    margin-bottom: 2rem;
    overflow: hidden;
    padding: 2rem;
  }

  .cardBody {
    background: var(--white);
    padding: 2rem;
  }

  .cardFooter {
    background: var(--gray);
    padding: 1rem 2rem;
  }
`;

export const RawRenderer = ({ data }) => {
  return (
    <>
      <details className="wrapper">
        <summary className="summary">Raw JSON</summary>
        <pre className="code">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </details>
      <style jsx>{`
        .wrapper {
          display: block;
          border: 1px solid var(--mint);
          border-radius: 0.5rem;
          background: rgba(180, 244, 224, 0.3);
          font-size: 0.75rem;
        }

        .code {
          padding: 0 1rem 1rem 1rem;
          white-space: pre-wrap;
        }

        .summary {
          display: inline-block;
          cursor: pointer;
          display: block;
          font-weight: bold;
          padding: 1rem;
          outline: none;
          user-select: none;
        }

        .summary:hover {
          color: var(--orange);
        }

        .summary::marker {
          display: none;
        }
      `}</style>
    </>
  );
};

const Nav = () => {
  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");

  React.useEffect(() => {
    if (window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  });

  return (
    <div className="nav">
      <h4>
        <Link href="/" passHref>
          <a>Teem</a>
        </Link>
      </h4>
      <ul className="menu">
        <li>
          <Link href={`${prefix}/`} passHref>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href={`${prefix}/flow`} passHref>
            <a className="summary">Flow</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
        .nav {
          display: flex;
          justify-content: space-between;
          font-size: 20px;
        }
        .menu {
          display: flex;
        }
        ul {
          padding-left: 0;
        }
        li {
          list-style-type: none;
        }
        .menu > li {
          margin-left: 20px;
        }
        a {
          text-decoration: none;
          font-weight: bold;
          color: var(--orange);
        }
        a:hover {
          color: var(--orange-light);
        }
      `}</style>
    </div>
  );
};

export const SidebarPlaceholder = () => (
  <div className="sidebar-placeholder">
    <span className="emoji">👋</span>
    <h3>
      Welcome to the
      <br />
      <b>Tina Cloud Starter</b>!
    </h3>
    <p>
      Let's get a form set up
      <br />
      so you can start editing.
    </p>
    <p>
      <a
        href="https://tinacms-site-next-git-tina-cloud-docs-tinacms.vercel.app/docs/tina-cloud/client/"
        target="_blank"
      >
        <span className="emoji">📖</span> Client Setup Guide
      </a>
    </p>
    <style jsx>{`
      .sidebar-placeholder {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: var(--tina-padding-big) var(--tina-padding-big) 64px
          var(--tina-padding-big);
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }

      .sidebar-placeholder > .emoji {
        display: block;
      }

      .sidebar-placeholder > *:first-child {
        margin: 0 0 var(--tina-padding-big) 0;
      }

      .sidebar-placeholder h3 {
        font-size: var(--tina-font-size-5);
        font-weight: normal;
        color: inherit;
        display: block;
        margin: 0 0 var(--tina-padding-big) 0;
      }

      .sidebar-placeholder p {
        display: block;
        margin: 0 0 var(--tina-padding-big) 0;
      }

      .sidebar-placeholder .emoji {
        font-size: 40px;
        line-height: 1;
        display: inline-block;
      }

      .sidebar-placeholder a {
        text-align: center;
        border: 0;
        border-radius: var(--tina-radius-big);
        border: 1px solid var(--tina-color-grey-2);
        box-shadow: var(--tina-shadow-small);
        font-weight: var(--tina-font-weight-regular);
        cursor: pointer;
        font-size: var(--tina-font-size-0);
        background-color: white;
        color: var(--tina-color-grey-8);
        padding: var(--tina-padding-small) var(--tina-padding-big)
          var(--tina-padding-small) 56px;
        position: relative;
        text-decoration: none;
        display: inline-block;
      }

      .sidebar-placeholder a .emoji {
        font-size: 24px;
        position: absolute;
        left: var(--tina-padding-big);
        top: 50%;
        transform-origin: 50% 50%;
        transform: translate3d(0, -50%, 0);
        transition: all var(--tina-timing-short) ease-out;
      }

      .sidebar-placeholder a:hover {
        color: var(--tina-color-primary);
      }
    `}</style>
  </div>
);
