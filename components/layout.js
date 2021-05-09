import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const profileIMage = '/images/profile.png';

const name = 'nishants'
export const siteTitle = "nishant's blog";

export default function Layout({ children, home, noHeader= false }) {

  let header = <header className={styles.header}>
    {home ? (
      <>
        <img
          src={profileIMage}
          className={utilStyles.borderCircle}
          style={{height: "144px", width: "144px"}}
          alt={name}
        />
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </>
    ) : (
      <>
        <Link href="/">
          <a>
            <img
              src={profileIMage}
              className={utilStyles.borderCircle}
              style={{height: "108px", width: "108px"}}
              alt={name}
            />
          </a>
        </Link>
        <h2 className={utilStyles.headingLg}>
          <Link href="/">
            <a className={utilStyles.colorInherit}>{name}</a>
          </Link>
        </h2>
      </>
    )}
  </header>;
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        <meta
          name="description"
          content="nishant's blog"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle}/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>
      {noHeader ? null : header}
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
