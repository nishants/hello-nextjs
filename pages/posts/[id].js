import Head from 'next/head';
import ReactMarkdown from 'react-markdown';

// styling support
import gfm from 'remark-gfm';
import externalLinks from 'remark-external-links';

import Layout from '../../components/layout';
import Date from '../../components/date'
import CodeBlock from "../../components/codeblock"
import {isRunnerBlock} from "../../components/CodeRunner"

import dynamic from 'next/dynamic'
const Editor = dynamic(() => import('../../components/CodeRunner/Editor'))


import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css'

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

    if(isRunnerBlock({language, node, children})){
      return (
        <Editor
          params={{language, node, children}}
        />
      );
    }

    return <CodeBlock
      language={language}
      value={children}
    />
  }
}

export default function Post({ postData }) {
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
          remarkPlugins={[
            [gfm],
            [externalLinks, {target: '_blank', rel: ['nofollow']}]
          ]}
          transformImageUri={(src, alt, title) => {
            return "/assets" + src.substring(src.indexOf('/posts'));
          }}
          transformLinkUri={(href, children, title) => {
            return href;
          }}
          children={postData.contentMarkdown}
          components={components}
        />
      </article>

    </Layout>
  )
}
