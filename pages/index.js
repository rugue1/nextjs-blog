import { useState } from 'react';
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function Home({ allPostsData }) {

  const [pokemonNumber] = useState(Math.floor(Math.random() * 100 + 1));

  const { data: pokemonData, error } = useSWR(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`, fetcher);

  let pokemonView = null;
  if(pokemonData) {
    
    pokemonView = (
      <>
        <p>My pokemon for you today: <b>{pokemonData.name}</b></p>
        <Link href={`pokemon\\${pokemonNumber}`}><img src={pokemonData.sprites.front_default} /></Link>
      </>
    )
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Yo, Manuel in da haus</p>
        {pokemonView}
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}