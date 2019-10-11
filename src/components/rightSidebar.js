import React from "react";
import { StaticQuery, graphql } from "gatsby";
// import styled from "react-emotion";
import Link from "./link";
import './styles.css';
import config from '../../config';

const forcedNavOrder = config.sidebar.forcedNavOrder;

// eslint-disable-next-line no-unused-vars
const ListItem = (({ className, active, level, ...props }) => {
    return (
      <li className={className + ' ListItem' + ((props.active) ? ' active' : '')}>
        <a style={{padding: `0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem`}} className={(level === 0) ? 'fontBold' : 'fontNormal'} href={props.to} {...props} />
      </li>
    );
});

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
              }
              tableOfContents
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      let navItems = [];
      let finalNavItems;
      if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
        const navItems = allMdx.edges.map((item, index) => {
          let innerItems;
          if(item !== undefined) {
            if ((item.node.fields.slug === location.pathname) || (config.gatsby.pathPrefix + item.node.fields.slug) === location.pathname) {
              if (item.node.tableOfContents.items) {
                innerItems = item.node.tableOfContents.items.map((innerItem, index) => {
                  const itemId = innerItem.title ? innerItem.title.replace(/\s+/g, '').toLowerCase() : '#';
                  return (
                    <ListItem
                      key={index}
                      to={`#${itemId}`}
                      level={1}
                    >
                      {innerItem.title}
                    </ListItem>
                  );
                });
              }
            }
          }
          if (innerItems) {
            finalNavItems = innerItems;
          }
        });
      }

      if (finalNavItems && finalNavItems.length) {
        return (
          <aside className={'Sidebar'}>
            <ul className={'rightSideBarUL'}>
              <div className={'rightSideTitle'}>CONTENTS</div>
              {finalNavItems}
            </ul>
          </aside>
        );
      } else {
        return (
          <aside className={'Sidebar'}>
            <ul></ul>
          </aside>
        );
      }
    }}
  />
);

export default SidebarLayout;
