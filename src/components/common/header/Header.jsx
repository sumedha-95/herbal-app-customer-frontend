// import React, { useState } from "react"
// import "./header.css"
// import { nav } from "../../data/Data"
// import { Link } from "react-router-dom"

// const Header = () => {
//   const [navList, setNavList] = useState(false)

//   return (
//     <>
//       <header>
//         <div className='container flex'>
//           <div className='logo'>
//             <img src='./images/logo.png' alt='' />
//           </div>
//           <div className='nav'>
//             <ul className={navList ? "small" : "flex"}>
//               {nav.map((list, index) => (
//                 <li key={index}>
//                   <Link to={list.path}>{list.text}</Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className='button flex'>
//             <h4>
//                <i className='fa fa-shopping-bag icon-circle'></i>
//               <span>2</span>
//             </h4>
//             <button className='btn1'>
//               {/* <i className='fa fa-sign-out'></i> Sign In */}
//               Sign In
//             </button>
//           </div>

//           <div className='toggle'>
//             <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
//           </div>
//         </div>
//       </header>
//     </>
//   )
// }

// export default Header

import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";

const Header = ({ CartItem = [] }) => {
  const [navList, setNavList] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <img src="./images/logo.png" alt="" />
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className='button flex'>
            <h4>
              <i className='fa fa-shopping-bag icon-circle'></i>
              <span>{cartCount}</span> 
            </h4>
            <button className='btn1' onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div> */}
          <div className="icon f_flex width">
            <div className="cart">
              <Link to="/cart">
                <i className="fa fa-shopping-bag icon-circle"></i>
              </Link>
            </div>
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
