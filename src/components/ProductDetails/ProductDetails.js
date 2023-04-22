import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Item,
  Typography,
  TextField,
  Button,
  Rating,
  CircularProgress,
  Pagination,
  Divider,
} from "@mui/material";
import colors from "../assets/colors";
import { useParams } from "react-router-dom";
import { getProductById } from "../../service/product.service";
import {
  getFeedbacks,
  createFeedback,
  deleteFeedback,
} from "../../service/feedback.service";
import feedback from "../../models/feedback";
import { popAlert, popDangerPrompt } from "../../utils/alerts";
import { useSelector } from "react-redux";

const ProductDetails = ({ addToCart }) => {
  //get the product ID
  const { productId } = useParams();

  //get current logged in user
  const authState = useSelector((state) => state.auth);

  console.log("auth is", authState.user._id);

  const [productData, setProductData] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [inputs, setInputs] = useState(feedback);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();

  //create feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await createFeedback(inputs, productId);

    if (response.success) {
      response?.data &&
        popAlert("Success!", response?.data, "success").then((res) => {});
    } else {
      response?.data?.message &&
        popAlert("Error!", response?.data?.message, "error");
      response?.data?.data && setErrors(response.data.data);
    }
    setLoading(false);
  };

  //delete feedback
  const handleFeedbackDelete = (id) => {
    setLoading(true);
    popDangerPrompt("DELETE", "Do you want to delete Feedback?", "error").then(
      async (res) => {
        if (res.isConfirmed) {
          const response = await deleteFeedback(productId, id);

          if (response.success) {
            popAlert(
              "Success!",
              "Feedback Successfully Deleted!",
              "success"
            ).then((res) => {
              window.location.reload();
            });
          } else {
            response?.data?.message &&
              popAlert("Error!", response?.data?.message, "error");
            response?.data?.data && setErrors(response.data.data);
          }
        }
      }
    );
    setLoading(false);
  };

  //get products
  useEffect(() => {
    let unmounted = false;

    const fetchAndSet = async () => {
      const response = await getProductById(productId);

      if (response.success) {
        if (!unmounted) {
          setProductData(response?.data);
        }
      }
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
  }, [productId]);

  //get all feedbacks
  useEffect(() => {
    let unmounted = false;

    const fetchAndSet = async () => {
      const response = await getFeedbacks(productId);

      if (response.success) {
        console.log("response", response.data);
        if (!unmounted) {
          const feedbackData = response.data.filter(
            (feedback) => feedback.product._id === productId
          );
          if (feedbackData.length > 0) {
            setFeedback(feedbackData);
            console.log(feedbackData[0].product._id);
          }
        }
      }
    };

    fetchAndSet();
    return () => {
      unmounted = true;
    };
  }, [productId, loading]);

  return (
    <Box
      sx={{
        display: "flex",
        my: 6,
        mx: 20,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              borderRadius: 4,
              backgroundColor: colors.white,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              p: 5,
              minWidth: 100,
            }}
          >
            <div className="img">
              <img src="http://localhost:3000/images/list/p-2.png" alt="" />
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              borderRadius: 4,
              backgroundColor: colors.white,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              p: 5,
            }}
          >
            <Typography sx={{ fontSize: 28, fontWeight: "bold" }}>
              {productData.name}
            </Typography>
            <Typography sx={{ fontSize: 18 }}>
              {productData.description}
            </Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(e) => setValue(productData.rating)}
              readOnly
            />

            <Typography sx={{ fontSize: 20, fontWeight: "bold", marginTop: 2 }}>
              Price : {productData.price}
            </Typography>
            <Typography>Unit : {productData.unit}</Typography>

            <Button
              variant="contained"
              color="success"
              onClick={() => addToCart(productData)}
              sx={{ marginTop: 2 }}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>

        {/* feedback card */}
        <Grid item xs={6}>
          <Box
            sx={{
              borderRadius: 4,
              backgroundColor: colors.white,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
              p: 4,
              minWidth: 100,
            }}
          >
            {/* feedback form */}
            <form onSubmit={handleSubmit}>
              <Typography
                sx={{ fontSize: 22, fontWeight: "bold", marginBottom: 2 }}
              >
                Ratings & Feedbacks
              </Typography>

              <Box sx={{ marginBottom: 1 }}>
                {/* Rating stars */}
                <Typography sx={{ fontSize: 16 }}>Rating</Typography>
                <Box
                  sx={{
                    fontSize: "10px",
                  }}
                >
                  <Rating
                    defaultValue={0}
                    value={inputs.rating}
                    onChange={(e) =>
                      setInputs({
                        ...inputs,
                        rating: e.target.value,
                      })
                    }
                  />
                </Box>
              </Box>

              <TextField
                id="outlined-textarea"
                label="Feedback"
                placeholder="Give your idea about the product"
                multiline
                fullWidth
                value={inputs.description}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    description: e.target.value,
                  })
                }
              />
              {errors["rating"] && (
                <Typography color="error">{errors["rating"]}</Typography>
              )}
              {errors["description"] && (
                <Typography color="error">{errors["description"]}</Typography>
              )}
              <Button
                sx={{ marginTop: 2 }}
                variant="outlined"
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress color="secondary" /> : "Submit"}
              </Button>
            </form>

            {/* get all feedback for relavent product */}
            {feedback &&
              feedback.map((feedback) => (
                <Box
                  key={feedback._id}
                  sx={{
                    marginTop: 2,
                    backgroundColor: colors.secondary,
                    padding: 1,
                    borderRadius: 2,
                  }}
                >
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                        {feedback.user.name}
                      </Typography>
                    </Grid>

                    {/* active delete button for relavent user */}
                    {authState.user._id === feedback.user._id ? (
                      <Button
                        size="small"
                        color="error"
                        onClick={(e) => handleFeedbackDelete(feedback._id)}
                      >
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}

                    <Grid item xs={2}></Grid>
                  </Grid>
                  <Rating
                    name="simple-controlled"
                    value={feedback.rating}
                    readOnly
                    size="small"
                  />
                  <Typography sx={{ fontSize: 14 }}>
                    {feedback.description}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
