import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date'

import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../lib/posts';

export async function getStaticProps() {
  return new Promise(resolve => {
    const posts = getSortedPostsData();

    resolve({props: {posts}});
  });
}

export default function Home(props) {
  console.log({props})
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Passionate Programmer</p>
        <p>
          I love coding and building things. <br/>
          My github repo :
          <a
            target="_blank"
            href="https://github.com/nishants"> github.com/nishants</a>
        </p>
      </section>
      <section>
        <h2>Recent posts : </h2>
        <ul>
          {props.posts.map(post => {
            return (
              <li key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={post.date} />
                </small>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  )
}
