import React from "react";
import { list } from "../../data/Data";

const RecentCard = ({  addToCart }) => {
  return (
    <>
      <div className="content grid3 mtop">
        {list.map((val, index) => {
          const { cover, category, location, name, price, type } = val;
          return (
            <div className="box shadow" key={index}>
              <div className="img">
                <img src={cover} alt="" />
              </div>
              <div className="text">
                <div className="category flex">
                  <h4>{name}</h4>
                </div>
                <div className="category flex">
                  <h4>${price}.00 </h4>
                  <button class="btn btn-success" onClick={() => addToCart(list)}>
                    <i class="fa fa-shopping-cart"></i>
                  </button>
                </div>
                <p>
                  
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
