import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import colors from "../../components/assets/colors";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = ({list,addToCart,decreaseQty}) => {

const handleSubmit = async (e) => {
    e.preventDefault();
  };
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [conError, setConError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleClear = () => { };
      const handleRegisterSubmit = () => {};
    
  const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

  
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
              
              style={{  color: "black" }}
                  >
                     <ArrowBackIosNewIcon sx={{ fontSize: 12}} />
                    Back to shopping
                   
            </Typography>
         
        </Grid>
        <Grid item xs={8}>
            <Box >
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              textAlign={"center"}
              style={{  color: "black" }}
            >
              Cart
            </Typography>
          </Box>
        </Grid>
              
        <Grid item xs={12}>

                <section className='cart-items'>
                  <div className='container d_flex'>
                    <div className='cart-details'>
                      {/* {list.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>} */}
                      {list && list.length === 0 && <h1 className='no-items product'>No Items are add in Cart</h1>}

                      
                       {list && list.map((item) => {
              const productQty = item.price * item.qty

              return (
                <div className='cart-list product d_flex' key={item.id}>
                  <div className='img'>
                    <img src={item.cover} alt='' />
                  </div>
                  <div className='cart-details'>
                    <h3>{item.name}</h3>
                    <h4>
                      ${item.price}.00 * {item.qty}
                      <span>${productQty}.00</span>
                    </h4>
                  </div>
                  <div className='cart-items-function'>
                    <div className='removeCart'>
                      <button className='removeCart'>
                        <i className='fa-solid fa-xmark'></i>
                      </button>
                    </div>
                    {/* stpe: 5 
                    product ko qty lai inc ra des garne
                    */}
                    <div className='cartControl d_flex'>
                      <button className='incCart' onClick={() => addToCart(item)}>
                        <i className='fa-solid fa-plus'></i>
                      </button>
                      <button className='desCart' onClick={() => decreaseQty(item)}>
                        <i className='fa-solid fa-minus'></i>
                      </button>
                    </div>
                  </div>

                  <div className='cart-item-price'></div>
                </div>
              )
                       })}
                      
                    </div>

                    <div className='cart-total product'>
            <h2>Cart Summary</h2>
            <div className=' d_flex'>
              <h4>Total Price :</h4>
              {/* <h3>${totalPrice}.00</h3> */}
            </div>
          </div>
                </div>
                </section>       
               
        </Grid>
        {/* <Grid item xs={8}>
          <Item>xs=4</Item>
        </Grid> */}
        

      </Grid>
            
    </Box>

          
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Cart;

