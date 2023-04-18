import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../../../common/ProductCard";
import { getPaginatedProducts } from "../../../service/product.service";
import Heading from "../../common/Heading"

const Recent = () => {
  const authState = useSelector((state) => state.auth);
  const mapState = useSelector((state) => state.map);

  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [product, setProduct] = useState([]);
  const [totalPages, setTotalPages] = useState(0);


  // const handleSearch = (input) => {
  //   setKeyword(input);
  // };

  useEffect(() => {
    let unmounted = false;

    const fetchAndSet = async () => {
      const response = await getPaginatedProducts(page, 8, "desc");
    
      if (response.success) {
        console.log("lllllll",response);
        if(!unmounted){
          setProduct(response?.data?.content || []);
          setTotalPages(response?.data?.totalPages || 0);
        }
      }
    }

    fetchAndSet();

    return () =>{
      unmounted = true;
    }
  }, [authState, mapState, page]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mt: 2, p: 3, width: "80%", ml: 15 }}>
        {/* <SearchBar
         onSearch={handleSearch}
         placeholderText="Search Pharmacies..."
         /> */}
      </Box>
      
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        <Heading title='Recent Herbal Products' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
      </Typography>

      
      <Box
        sx={{
          m: 2,
          borderRadius: 15,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          
          {product.map((item, index) => (
            
            <Grid item xs={12} sm={12} md={4} lg={3} key={index}>
              <Link
                // to={`/pharmacies/${item._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
               
                <ProductCard
                  name={item.name}
                  price={item.price}
                  rating={item.rating}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ ml: 170 }}>
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




