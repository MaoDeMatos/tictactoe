import { Global, css } from "@emotion/react";
import { Fragment } from "react";
import tw, { GlobalStyles as BaseStyles, theme } from "twin.macro";

const customStyles = css({
  "html, body, body > div#root, #root > div:first-of-type": {
    ...tw`h-full`,
  },
  body: {
    WebkitTapHighlightColor: theme`colors.primary.700` + "80", // for mobile devices, 80 = opacity 50%
    ...tw`antialiased overflow-hidden bg-slate-900 text-slate-100`,
  },
  a: {
    ...tw`transition-colors underline hover:text-primary-400`,
  },
  code: {
    ...tw`px-2 py-1 bg-slate-600 rounded-lg text-slate-100`,
  },
  "::selection": {
    ...tw`bg-primary-300 text-slate-900`,
  },
  "::-webkit-scrollbar": {
    paddingLeft: "2px",
    width: "0.5rem",
    height: "0.5rem",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: theme`colors.primary.600`,
    borderRadius: "1rem",
  },
  // "::-webkit-scrollbar-button,::-webkit-scrollbar-track,::-webkit-scrollbar-track-piece":
  //   {
  // background: "transparent",
  // },
});

const GlobalStyles = () => (
  <Fragment>
    <BaseStyles />
    <Global styles={customStyles} />
  </Fragment>
);

export default GlobalStyles;
