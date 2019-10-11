import React from "react";
// import styled from "react-emotion";
import { MDXProvider } from "@mdx-js/react";
import ThemeProvider from "./themeProvider";
import mdxComponents from "./mdxComponents";
import Sidebar from "./sidebar";
import RightSidebar from "./rightSidebar";
import './styles.css'
const Layout = ({ children, location }) => (
  <ThemeProvider location={location}>
    <MDXProvider components={mdxComponents}>
      <div className={'Wrapper'}>
        <div className={'hidden-xs LeftSideBarWidth'}>
          <Sidebar location={location} />
        </div>
        <main className={'Content'}>
          <div className={'MaxWidth'}>{children}</div>
        </main>
        <div className={'hidden-xs RightSideBarWidth'}>
          <RightSidebar location={location} />
        </div>
      </div>
    </MDXProvider>
  </ThemeProvider>
);

export default Layout;
