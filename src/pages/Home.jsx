import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Meta, Header } from '../components'
import { heroWave, ArrowRightIcon } from '../assets'

function Home () {
  const { t } = useTranslation()

  return (
    <>
      <Meta title="home.META_TITLE" description="home.META_DESCRIPTION" />
      <Header />
      <main>
        <section id="hero_section" className="pt-24 pb-13 lg:pb-16 md:pt-44">
          <div className="relative overflow-hidden">
            <img className="fixed top-0 left-0 -z-10 h-full w-full object-cover" src={heroWave} alt="White Background Passwise Hero" />
            <div className="col-span-full mb-7 text-center lg:col-start-1 lg:col-end-9 lg:text-left">
              <h1>{ t('home.TITLE') }</h1>
            </div>
            <div className="relative col-span-full mb-3 flex flex-col justify-center lg:justify-start lg:pb-96">
              <div className="flex justify-center lg:justify-start">
                <Link to="/signup" className="hero-button group flex items-center uppercase transition-color duration-300 ease-in-out hover:bg-primaryBleu800 px-4 py-3">
                  { t('home.ACTION_BUTTON') }
                  <span className="group relative ml-2 translate-y-[-2px]">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </div>
              <div className="images col-span-full mb-6 lg:absolute lg:right-0 lg:-top-[150px] lg:col-start-6 lg:col-end-13 lg:w-[66%]">
              </div>
            </div>
            <div className="col-start-2 col-end-5 mb-13 md:col-start-5 md:col-end-10 lg:col-start-4 lg:col-end-8 lg:mb-19">
              <div className="text-body-l relative before:absolute before:left-[-16px] before:h-full before:w-[2px] before:bg-primaryBleu800">
                <p><b>{ t('home.SUBTITLE') }</b></p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-9 flex justify-center lg:mt-10">Copyright © Passwise { new Date().getFullYear() }</footer>
    </>
  )
}

export default Home