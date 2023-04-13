import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = ({ list, addToCart }) => {
  return (
    <>
      <section className='recent padding'>
        <div className='container'>
          <Heading title='Recent Herbal Products' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
          <RecentCard list={list} addToCart={addToCart}/>
        </div>
      </section>
    </>
  )
}

export default Recent
