import { AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout'
import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import { Fragment } from 'react';

function MyApp({ Component, pageProps, router }) {
  return (
    <Fragment>

      <AnimatePresence exitBeforeEnter >
        <Layout pageProps={pageProps} key={router.route} >
          <Component {...pageProps} />
        </Layout>
      </AnimatePresence>
    </Fragment>
  )
}

export default MyApp
