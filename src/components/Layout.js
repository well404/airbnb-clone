import Head from 'next/head'
import NextNprogress from 'nextjs-progressbar';
import { motion } from 'framer-motion'

//Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Fragment } from 'react'
function Layout({ children, pageProps }) {

    const { headerPlaceholder } = pageProps

    return (
        <Fragment>

            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
            </Head>


            <NextNprogress
                color="#FE595E"
                startPosition={0.3}
                height={3}
                showOnShallow={true}
            />

            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
            >

                <Header placeholer={headerPlaceholder} />

                {children}

                <Footer />

            </motion.div>
        </Fragment>
    )
}

export default Layout
