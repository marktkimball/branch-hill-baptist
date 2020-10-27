import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Content, { HTMLContent } from '../components/Content';
import Layout from '../components/Layout';
import MiniHero from '../components/MiniHero';
import StaffMembers from '../components/StaffMembers';
import MissionsImage from '../img/missions.jpg';

export const MissionsPageTemplate = ({
  content,
  contentComponent,
  lead,
  missionaries,
  precontent,
  subtitle,
  title,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <>
      <MiniHero image={MissionsImage} title={title} subtitle={subtitle} />
      <p className="about-page-lead">{lead}</p>
      <section className="section section--gradient">
        {precontent.map(({ text }) => <PageContent
          className="content about-subsection"
          content={text}
        />)}
        <div className="content missionaries-container">
          <StaffMembers staff={missionaries} />
        </div>
        <PageContent className="content about-subsection" content={content} />
      </section>
    </>
  );
};

MissionsPageTemplate.propTypes = {
  content: PropTypes.node,
  lead: PropTypes.string,
  missionaries: PropTypes.array,
  precontent: PropTypes.arrayOf(PropTypes.object),
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

const MissionsPage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <MissionsPageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        lead={post.frontmatter.lead}
        missionaries={post.frontmatter.missionaries}
        precontent={post.frontmatter.precontent}
        subtitle={post.frontmatter.subtitle}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

MissionsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default MissionsPage;

export const MissionsPageQuery = graphql`
  query MissionsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        precontent {
          text
        }
        lead
        missionaries {
          name
          subtitle
          image {
            childImageSharp {
              fluid(maxWidth: 300, quality: 90) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
