import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Pagination,
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
import { getPaginatedSelfOrders } from "../../service/order.service";

const MyOrders = () => {
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getStrigifiedProductNames = (products) => {
    return products.map((obj) => obj.product.name).join(", ");
  };

  useEffect(() => {
    let unmounted = false;

    const fetchAndSet = async () => {
      const response = await getPaginatedSelfOrders(page, 8, "desc");

      if (response.success) {
        if (!unmounted) {
          setOrders(response?.data?.content || []);
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
            width: 600,
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
                  style={{ color: "black" }}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 12 }} /> Back to shopping
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary"
                    textAlign={"right"}
                    style={{ color: "black" }}
                  >
                    My Orders
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
                {orders?.map((order) => (
                  <Grid key={order._id} container marginBottom={4}>
                    <Grid item xs={8}>
                      <h3>{order?.seller?.name}</h3>
                      <p
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {getStrigifiedProductNames(order.items)}
                      </p>
                      <p> Rs. {order?.total}</p>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      container
                      alignItems="flex-end"
                      justifyContent={"flex-end"}
                    >
                      <button
                        class="btn btn-success"
                        //   onClick={() =>
                        //     history.push(`/checkout/sellers/${item.sellerId}`)
                        //   }
                      >
                        View Order
                      </button>
                    </Grid>
                  </Grid>
                ))}

                <Box sx={{ display: "flex", justifyContent: "right" }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    fontWeight={"bold"}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default MyOrders;
