import React, { useRef } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const renderStarRating = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<StarIcon key={i} />);
  }
  return stars;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ProductCard = ({
  item,
  addToCart,
  removeFromCart,
  isAvailableInCart,
}) => {
  const BtnRef = useRef(null);
  const history = useHistory();

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
        //  "&:hover":{backgroundColor:colors.primary},
        maxWidth: 450,
      }}
      onClick={(e) => {
        if (!BtnRef.current.contains(e.target))
          history.push(`/product/${item._id}`);
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        boxshadow="0px 8px 25px rgba(0, 0, 0, 0.25)"
        image="../images/list/p-2.png"
        sx={{ my: 5 }}
      />

      <CardActions sx={{ height: 100, mb: 2 }}>
        <Box sx={{ width: "100%" }}>
          <Grid container rowSpacing={1}>
            <Grid item xs={6}>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ ml: 2, fontWeight: "bold" }}
              >
                {item.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{
                  mr: 2,

                  textAlign: "right",
                }}
              >
                Rs {item.price}
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ ml: 2 }}
              >
                {renderStarRating(item.rating)}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                gutterBottom
                fullWidth
                variant="h7"
                component="div"
                sx={{ mr: 2, textAlign: "right" }}
              >
                {isAvailableInCart ? (
                  <Button
                    ref={BtnRef}
                    variant="contained"
                    color="error"
                    type="button"
                    sx={{ py: 2, width: "100%" }}
                    onClick={() => removeFromCart(item.seller.user, item._id)}
                  >
                    <i class="fa fa fa-minus"></i>
                  </Button>
                ) : (
                  <Button
                    ref={BtnRef}
                    variant="contained"
                    color="success"
                    type="button"
                    sx={{ py: 2, width: "100%" }}
                    onClick={() =>
                      addToCart(
                        item.seller.user,
                        item.seller.name,
                        item._id,
                        item.name
                      )
                    }
                  >
                    <i class="fa fa-shopping-cart"></i>
                  </Button>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardActions>
    </Card>
  );
};
export default ProductCard;
