import React from 'react'
import MainCarousel from '../../component/HomeCarousel/MainCarousel'


import HomeSectionCarousel from '../../component/HomeSectionCarousel/HomeSectionCarousel'
import { mens_kurta } from '../../../Data/Mens/mens_kurta'
import { lehngaCholi } from '../../../Data/Womens/LehngaCholi'
import { womens_kurta } from '../../../Data/Womens/womens_kurta'

function HomePage() {
  return (
    <div>
        <MainCarousel/>
        <div className='space-y-10 py-10 flex flex-col justify-center px-5 lg:px-10'>
            <HomeSectionCarousel data={mens_kurta} section={"Men's Kurta"}/>
            <HomeSectionCarousel data={womens_kurta} section={"Women's Kurta"} />
            <HomeSectionCarousel data={mens_kurta} section={"Men's Kurta"}/>
            <HomeSectionCarousel data={womens_kurta} section={"Women's Kurta"} />
            
        </div>

    </div>
  )
}

export default HomePage