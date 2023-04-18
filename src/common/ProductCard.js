import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const renderStarRating = (rating) => {
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<StarIcon key={i} />);
  }
  return stars;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const ProductCard = ({ name, price, rating,addToCart }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
        //  "&:hover":{backgroundColor:colors.primary},
        maxWidth: 450,
        
        
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        boxshadow="0px 8px 25px rgba(0, 0, 0, 0.25)"
        image="../images/list/p-2.png"
        sx={{mb:5}}
      />

      
      <CardActions sx={{ height: 100,mb:2 }}>
         <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h7" component="div" sx={{ mb:0 , textAlign: "center", fontWeight: "bold" }}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h7" component="div" sx={{ mb:0 , textAlign: "center", fontWeight: "bold" }}>
            Rs  {price}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h7" component="div" sx={{ mt:2 , textAlign: "center", fontWeight: "bold" }}>
            {renderStarRating(rating)}
          </Typography>
       </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h7" component="div" sx={{ mt:2 , textAlign: "center", fontWeight: "bold" }}>
            <button class="btn btn-success" onClick={() => addToCart()}>
                    <i class="fa fa-shopping-cart"></i>
                  </button>
          </Typography>
        </Grid>
      </Grid>
    </Box>  
      </CardActions>
    </Card>
  );
};
export default ProductCard;
