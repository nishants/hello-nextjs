import Head from 'next/head';

import Layout from '../../components/layout';
import Date from '../../components/date'

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
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>

    </Layout>
  )
}
