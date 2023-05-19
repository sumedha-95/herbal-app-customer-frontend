import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../../../common/ProductCard";
import { getPaginatedProducts } from "../../../service/product.service";
import Heading from "../../common/Heading";
import { cartActions } from "../../../store/cartSlice";

const Recent = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [product, setProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const addToCart = (sellerId, sellerName, productId, productName) => {
    dispatch(
      cartActions.addToCart({ sellerId, sellerName, productId, productName })
    );
  };

  const removeFromCart = (sellerId, productId) => {
    dispatch(cartActions.removeFromCart({ sellerId, productId }));
  };

  const isProductExistInCart = (sellerId, productId) => {
    // find seller cart
    const sellerCartItemIndex = cartState.cart.findIndex(
      (item) => item.sellerId === sellerId
    );
    if (sellerCartItemIndex !== -1) {
      const sellerCart = cartState.cart[sellerCartItemIndex].cartItems;
      // check if seller cart products exists
      const sellerProductIndex = sellerCart.findIndex(
        (item) => item.product._id === productId
      );
      if (sellerProductIndex !== -1) {
        return true;
      }
    }

    return false;
  };

  useEffect(() => {
    let unmounted = false;

    const fetchAndSet = async () => {
      const response = await getPaginatedProducts(page, 8, "desc");

      if (response.success) {
        if (!unmounted) {
          setProduct(response?.data?.content || []);
          setTotalPages(response?.data?.totalPages || 0);
        }
      }
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
  }, [page]);

  return (
    <Box sx={{ flexGrow: 1, px: 8 }}>
      <Box sx={{ mt: 2, p: 3, width: "80%", ml: 15 }}>
        {/* <SearchBar
         onSearch={handleSearch}
         placeholderText="Search Pharmacies..."
         /> */}
      </Box>

      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        <Heading title="Recent Herbal Products" />
      </Typography>

      <Box
        sx={{
          m: 2,
          borderRadius: 15,
        }}
      >
        <Grid container spacing={{ xs: 2, md: 3 }} c>
          {product.map((item) => (
            <Grid item xs={3} key={item._id}>
              <ProductCard
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                isAvailableInCart={isProductExistInCart(
                  item.seller.user,
                  item._id
                )}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          fontWeight={"bold"}
        />
      </Box>
    </Box>
  );
};
export default Recent;
