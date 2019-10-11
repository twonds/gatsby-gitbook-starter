import React from "react";
import Tree from './tree';
import {StaticQuery, graphql} from "gatsby";
// import styled from "react-emotion";
import {ExternalLink} from "react-feather";
import '../styles.css';
import config from '../../../config';

const forcedNavOrder = config.sidebar.forcedNavOrder;

// eslint-disable-next-line no-unused-vars
const ListItem = (({ className, active, level, ...props }) => {
    return (
      <li className={className + ' ListItem' + ((props.active) ? ' active' : '')}>
        <a style={{padding: `0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem`}} className={(level === 0) ? 'fontBold' : 'fontNormal'} href={props.to} {...props} />
      </li>
    );
});


const Divider = (props => (
  <li className={'DividerLine'} {...props}>
    <hr />
  </li>
));


const SidebarLayout = ({location}) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={({allMdx}) => {
      return (
        <aside className={'SidebarAside'}>
          <ul className={'sideBarUL'}>
            <Tree
              edges={allMdx.edges}
            />
            <Divider />
            {config.sidebar.links.map((link, key) => {
              if (link.link !== '' && link.text !== '') {
                return (
                  <ListItem key={key} to={link.link}>
                    {link.text}
                    <ExternalLink size={14} />
                  </ListItem>
                );
              }
            })}
          </ul>
        </aside>
      );
    }}
  />
);

export default SidebarLayout;
