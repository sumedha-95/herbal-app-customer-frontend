import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import colors from "../assets/colors";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { processCart } from "../../service/order.service";
import { cartActions } from "../../store/cartSlice";

const SellerCart = () => {
  const { sellerId } = useParams();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const [pCartResult, setPCartResult] = useState({});

  const handleQtyChange = (productId, qty) => {
    dispatch(cartActions.changeQuantity({ sellerId, productId, qty }));
  };

  useEffect(() => {
    let unmounted = false;

    const fetchAndSet = async () => {
      const sellerCartItem = cartState.cart.find(
        (item) => item.sellerId === sellerId
      );
      if (!sellerCartItem) return;

      const response = await processCart(sellerCartItem);

      if (response.success) {
        if (!unmounted) {
          setPCartResult(response.data);
        }
      } else console.error(response.data);
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
  }, [cartState, sellerId]);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.secondary,
        }}
      >
        <Box
          sx={{
            my: 6,
            borderRadius: 4,
            backgroundColor: colors.white,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
            p: 5,
            minWidth: 1500,
            maxWidth: "80%",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary"
                  textAlign={"left"}
                  style={{ color: "black" }}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 12 }} /> Back to shopping
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary"
                    textAlign={"right"}
                    style={{ color: "black" }}
                  >
                    Cart
                  </Typography>
                </Box>
              </Grid>

              {pCartResult?.items?.map((item) => (
                <Grid key={item._id} item xs={8}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 1,
                      m: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 1,
                        m: 1,
                      }}
                    >
                      <img
                        src="https://media.istockphoto.com/id/1275820756/photo/herbal-and-alternative-medicine-concept.jpg?s=170667a&w=0&k=20&c=RCohvHL4SXHaPKSWwYxgXTrriAg7x5ucRrP82VX8hVc="
                        alt="product-image"
                        style={{
                          height: 100,
                          width: 100,
                          objectFit: "cover",
                          borderRadius: 3,
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 1,
                        m: 1,
                      }}
                    >
                      {item.product.name}
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 1,
                        m: 1,
                      }}
                    >
                      <TextField
                        label="Qty"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        defaultValue={item.quantity}
                        variant="standard"
                        InputProps={{ inputProps: { min: 1 } }}
                        onChange={(e) => {
                          handleQtyChange(item.product._id, e.target.value);
                        }}
                      />
                      <span style={{ marginLeft: 10 }}>
                        x {item.product.unitAmount} {item.product.unit}
                      </span>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 1,
                        m: 1,
                      }}
                    >
                      <Typography>
                        <span>Rs. {item.total}</span>
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}

              <Grid item xs={4}></Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SellerCart;
