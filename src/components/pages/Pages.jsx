import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
// import Pricing from "../pricing/Pricing"
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Cart from "../Cart/Cart";
import Test from "../Test/Test";
import Search from "../search/Search";
import SignIn from "../Signin/Signin";
import Signup from "../Signup/Signup";
import Checkout from "../Checkout/Checkout";

const Pages = ({ CartItem = [] }) => {
  return (
    <>
      <Router>
        <Header CartItem={CartItem} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/blog" component={Blog} />
          {/* <Route exact path='/pricing' component={Pricing} /> */}
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/cart" component={Cart} />
          <Route
            exact
            path="/checkout/sellers/:sellerId"
            component={Checkout}
          />
          <Route exact path="/test" component={Test} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
