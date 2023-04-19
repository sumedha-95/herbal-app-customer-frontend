import React, { useState } from "react";
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
import { useHistory } from "react-router-dom";

const Cart = () => {
  const cartState = useSelector((state) => state.cart);
  const history = useHistory();

  const getStrigifiedProductNames = (sellerProducts) => {
    return sellerProducts.map((obj) => obj.product.name).join(", ");
  };

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
            width: 1200,
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
                    Cart List
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                {cartState.cart.map((item) => {
                  return (
                    <Grid key={item.sellerId} container marginBottom={4}>
                      <Grid item xs={10}>
                        <h3>{item.sellerName}</h3>
                        {getStrigifiedProductNames(item.cartItems)}
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        container
                        alignItems="flex-end"
                        justifyContent={"flex-end"}
                      >
                        <button
                          class="btn btn-success"
                          onClick={() =>
                            history.push(`/checkout/sellers/${item.sellerId}`)
                          }
                        >
                          View Cart
                        </button>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Cart;
