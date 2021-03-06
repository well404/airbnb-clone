import { Fragment } from 'react'
import { v4 as keyGen } from 'uuid'
import Head from 'next/head'
import favicon from '../../public/favicon.svg'
//Components
import Banner from '../components/Banner'
import SmallCard from '../components/SmallCard'
import MediumCard from '../components/MediumCard'
import LargeCard from '../components/LargeCard'

function Home({ explorerDate, cardsData }) {
  return (
    <Fragment>
      <Head>
        <title>Airbnb Clone - Wellzin xD</title>
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <section>
        <Banner />
      </section>

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* Get data with Server Side Rendering */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {
              explorerDate?.map(({ img, location, distance }) => (
                <SmallCard
                  key={keyGen()}
                  img={img}
                  location={location}
                  distance={distance}
                />
              ))
            }
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">

            {
              cardsData?.map(({ img, title }) => (
                <MediumCard
                  key={keyGen()}
                  img={img}
                  title={title}
                />
              ))
            }
          </div>
        </section>

        <section>
          <LargeCard
            img="https://links.papareact.com/4cj"
            title="The Greatest Outdoors"
            description="Wishlists curated by Airbnb."
            buttonText="Get Inspired"
          />
        </section>


      </main>
    </Fragment>
  )
}


export async function getStaticProps() {
  const explorerDate = await fetch('https://links.papareact.com/pyp').then(res => res.json())
  const cardsData = await fetch('https://links.papareact.com/zp1').then(res => res.json())

  return {
    props: {
      explorerDate: explorerDate || [],
      cardsData: cardsData || [],
    }
  }
}

export default Home