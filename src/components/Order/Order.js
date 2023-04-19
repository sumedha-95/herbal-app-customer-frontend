import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Pagination,
  Divider,
} from "@mui/material";
import colors from "../assets/colors";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getOrderById,
  getPaginatedSelfOrders,
} from "../../service/order.service";

const Order = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const history = useHistory();

  useEffect(() => {
    let unmounted = false;

    const fetchAndSet = async () => {
      if (!orderId) return;

      const response = await getOrderById(orderId);

      if (response.success) {
        if (!unmounted) {
          setOrder(response.data);
        }
      } else console.error(response.data);
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
  }, [orderId]);
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
            minWidth: 1400,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary"
                  textAlign={"left"}
                  style={{ color: "black", cursor: "pointer" }}
                  onClick={() => history.push("/my-orders")}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 12 }} /> Back
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="primary"
                    textAlign={"right"}
                    style={{ color: "black" }}
                  >
                    #{orderId}
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

                    {order?.items?.map((item) => (
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
                          {item.quantity} x {item.product.unitAmount}{" "}
                          {item.product.unit}
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
                  <h3 style={{ marginBottom: 5 }}>Payment Details</h3>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 2,
                    }}
                  >
                    <Box>Sub Total</Box>
                    <Box>Rs.{order.subTotal}</Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 2,
                    }}
                  >
                    <Box>Shipping Cost</Box>
                    <Box>Rs.{order.shippingCharge}</Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 2,
                    }}
                  >
                    <Box>Service Charge</Box>
                    <Box>Rs.{order.serviceCharge}</Box>
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
                    <Box>Rs.{order.total}</Box>
                  </Box>
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
                  <h3 style={{ marginBottom: 5 }}>Tracking Details</h3>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 2,
                    }}
                  >
                    <Box>Delivery Service</Box>
                    <Box>DHL</Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: 2,
                    }}
                  >
                    <Box>Status</Box>
                    <Box>{order.status?.toUpperCase()}</Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Order;
