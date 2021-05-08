import Head from 'next/head';
import ReactMarkdown from 'react-markdown';

import Layout from '../../components/layout';
import Date from '../../components/date'
import CodeBlock from "../../components/codeblock"

import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css'

import * as styles from'./posts.scss';

// Return a list of possible value for id https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({params}) {
  const postData = await getPostData(params.id);
  return {
    props: {postData},
  };
}

const components = {
  code({node, inline, className, children, ...props}) {

    if(className === 'inline-code') return children;

    if(inline){
      return <code className="inline-code">{children}</code>;
    }

    const language = className?.replace("language-", "");

    return <CodeBlock
      language={language}
      value={children}
    />
  }
}

export default function Post({ postData }) {
  console.log({styles})
  return (
    <Layout noHeader={true}>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <ReactMarkdown
          children={postData.contentMarkdown}
          components={components}
        />
        {/*<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />*/}
      </article>

    </Layout>
  )
}
