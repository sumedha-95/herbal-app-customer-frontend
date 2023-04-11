import React from "react"
import Heading from "../../common/Heading"
import "./Featured.css"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  return (
    <>
      <section className='featured background'>
        <div className='container'>
          <Heading title='Our Harble Product Category' subtitle='Find All Type of Your Harble Products.' />
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Featured
