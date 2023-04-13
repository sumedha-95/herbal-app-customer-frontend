import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import colors from "../assets/colors";


const Signup = () => {

const handleSubmit = async (e) => {
    e.preventDefault();
  };
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [conError, setConError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleClear = () => { };
      const handleRegisterSubmit = () => {};
    
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
            borderRadius: 6,
            backgroundColor: colors.white,
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
            p: 5,
            width: 650,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="primary"
              textAlign={"center"}
              sx={{ mb: 6 }}
              style={{  color: "black" }}
            >
              Sign Up
            </Typography>
            <form onSubmit={handleRegisterSubmit}>
              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="First Name"
                  fullWidth
                //   value={RegInputs.firstName}
                //   onChange={(e) =>
                //     setRegInputs({
                //       ...RegInputs,
                //       firstName: e.target.value,
                //     })
                //   }
                />
                {errors["firstName"] && (
                  <Typography color="error">{errors["firstName"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Last Name"
                  fullWidth
                //   value={RegInputs.lastName}
                //   onChange={(e) =>
                //     setRegInputs({
                //       ...RegInputs,
                //       lastName: e.target.value,
                //     })
                //   }
                />
                {errors["lastName"] && (
                  <Typography color="error">{errors["lastName"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="NIC"
                  fullWidth
                //   value={RegInputs.NIC}
                //   onChange={(e) =>
                //     setRegInputs({
                //       ...RegInputs,
                //       NIC: e.target.value,
                //     })
                //   }
                />
                {errors["NIC"] && (
                  <Typography color="error">{errors["NIC"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Address"
                  fullWidth
                //   value={RegInputs.address}
                //   onChange={(e) =>
                //     setRegInputs({
                //       ...RegInputs,
                //       address: e.target.value,
                //     })
                //   }
                />
                {errors["address"] && (
                  <Typography color="error">{errors["address"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Mobile"
                  fullWidth
                //   value={RegInputs.mobile}
                //   onChange={(e) =>
                //     setRegInputs({
                //       ...RegInputs,
                //       mobile: e.target.value,
                //     })
                //   }
                />
                {errors["mobile"] && (
                  <Typography color="error">{errors["mobile"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="E-mail"
                  type="email"
                  fullWidth
                //   value={RegInputs.email}
                //   onChange={(e) =>
                //     setRegInputs({
                //       ...RegInputs,
                //       email: e.target.value,
                //     })
                //   }
                />
                {errors["email"] && (
                  <Typography color="error">{errors["email"]}</Typography>
                )}
              </Box>

              {/* <Box sx={{ mb: 2, m: 3 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}> 
                  <DatePicker
                    disableFuture
                    label="Birth Date"
                    fullWidth
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={RegInputs.birthday}
                    onChange={(nValue) =>
                      setRegInputs({
                        ...RegInputs,
                        birthday: nValue,
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
                {errors["birthday"] && (
                  <Typography color="error">{errors["birthday"]}</Typography>
                )}
              </Box> */}

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Password"
                  type="password"
                  fullWidth
                //   value={RegInputs.password}
                //   onChange={(e) =>
                //     setRegInputs({
                //       ...RegInputs,
                //       password: e.target.value,
                //     })
                //   }
                />
                {errors["password"] && (
                  <Typography color="error">{errors["password"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {conError && <Typography color="error">{conError}</Typography>}
              </Box>

              <Box
                sx={{
                  mb: 2,
                  mr: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="reset"
                  variant="contained"
                  onClick={handleClear}
                  sx={{ py: 2, px: 5, mr: 2, backgroundColor: colors.grey }}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ py: 2, px: 5 }}
                  disabled={loading}
                  style={{ backgroundColor: "#28ac64" }}
                >
                  {loading ? <CircularProgress color="secondary" /> : "Save"}
                </Button>
              </Box>
            </form>
            <Box textAlign={"center"} sx={{ cursor: "pointer" }}>
              <Typography variant="h7" color="primary">
                Already have an account?
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Signup;
