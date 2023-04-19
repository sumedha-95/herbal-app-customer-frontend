import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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
import { createOrder, processCart } from "../../service/order.service";
import { cartActions } from "../../store/cartSlice";

const SellerCart = () => {
  const { sellerId } = useParams();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const authState = useSelector((state) => state.auth);
  const [pCartResult, setPCartResult] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleQtyChange = (productId, qty) => {
    dispatch(cartActions.changeQuantity({ sellerId, productId, qty }));
  };

  const handleOrderCreate = async () => {
    setIsLoading(true);
    const sellerCartItem = cartState.cart.find(
      (item) => item.sellerId === sellerId
    );
    const body = {
      ...sellerCartItem,
      shipping: {
        name: authState.user.name,
        address: authState.user.address,
        contactNumber: authState.user.contactNumber,
      },
    };

    const response = await createOrder(body);
    setIsLoading(false);

    if (!response.success) {
      // create checkout session
      
    } else console.error(response.data);
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

              <Grid item xs={8}>
                <Box sx={{ background: colors.secondary, borderRadius: 4 }}>
                  <Box
                    sx={{
                      background: colors.secondary,
                      borderRadius: 4,
                      my: 1,
                      py: 2,
                      px: 2,
                    }}
                  >
                    <h3 style={{ marginBottom: 5 }}>Cart Items</h3>

                    {pCartResult?.items?.map((item) => (
                      <Box
                        key={item._id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          p: 1,
                          my: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 1,
                            m: 1,
                            minWidth: 110,
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
                            minWidth: 200,
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
                            minWidth: 300,
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
                            minWidth: 150,
                          }}
                        >
                          <Typography>
                            <span>Rs. {item.total}</span>
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Box
                  sx={{
                    background: colors.secondary,
                    borderRadius: 4,
                    my: 1,
                    py: 2,
                    px: 2,
                  }}
                >
                  <h3 style={{ marginBottom: 5 }}>Delivery Options</h3>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="dhl"
                        control={<Radio />}
                        label="DHL"
                        checked
                      />
                      <FormControlLabel
                        value="ups"
                        control={<Radio />}
                        label="UPS"
                      />
                      <FormControlLabel
                        value="fedex"
                        control={<Radio />}
                        label="FedEx"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    background: colors.secondary,
                    borderRadius: 4,
                    my: 1,
                    py: 2,
                    px: 2,
                  }}
                >
                  <h3 style={{ marginBottom: 5 }}>Payment Details</h3>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 2,
                    }}
                  >
                    <Box>Sub Total</Box>
                    <Box>Rs.{pCartResult.subTotal}</Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 2,
                    }}
                  >
                    <Box>Shipping Cost</Box>
                    <Box>Rs.{pCartResult.shippingCost}</Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 2,
                    }}
                  >
                    <Box>Service Charge</Box>
                    <Box>Rs.{pCartResult.serviceCharge}</Box>
                  </Box>

                  <Divider />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
                  >
                    <Box>Total</Box>
                    <Box>Rs.{pCartResult.total}</Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    background: colors.secondary,
                    borderRadius: 4,
                    my: 1,
                    py: 2,
                    px: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: colors.primary,
                    color: colors.white,
                    fontSize: "1.2rem",
                  }}
                  onClick={() => (isLoading ? {} : handleOrderCreate())}
                >
                  {isLoading ? (
                    <>
                      Continue&nbsp;
                      <CircularProgress color="inherit" size="1.5rem" />
                    </>
                  ) : (
                    <>Continue</>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SellerCart;
