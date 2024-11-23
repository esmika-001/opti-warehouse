
import { Box, Button, FormGroup, FormHelperText, FormLabel, InputBase, Typography, IconButton, Stack } from '@mui/material'
import React, { useState } from 'react'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import { ArrowBack } from '@mui/icons-material'
import { useNotification } from '../../hooks/useNotification'
import axiosInstance from '../../config/axios'

type Data = {
  email: string
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const showNotification = useNotification();
  const initStage = {
    email: "",
  }
  const [data, setData] = useState<Data>(initStage)
  const [error, setError] = useState({
    email: false,
  });


  const HandleForgotPassword = async () => {
    setError({
      email: false,
    });
    if (data.email === "") {
      // Set errors if fields are empty
      setError((prev) => ({
        ...prev,
        email: data.email === "",
      }));
      return;
    }
    try {
      const res:any = await axiosInstance.post("/auth/forgot-password", { email: data.email });
      if (res.data.message === "Reset Password Link Sent Successfully") {
        showNotification("Reset Password Link Sent Successfully", "success");
        navigate("/auth/login");
      }
      if (res?.meta?.requestStatus === "rejected") {
        // Display error message for invalid login
        showNotification(res?.payload?.response?.data || "Error", "error");

        // Based on the response, set appropriate errors
        if (res?.payload?.response?.data) setError((prev) => ({ ...prev, email: false }));
      }
    } catch (error) {
      showNotification("Error", "error");
      console.log('error: ', error);
    }
  }


  return (
    <Box className={styles.root}>
      <Box className={styles.partition2}>
        <Stack direction={"row"} gap={2} alignContent={"center"} mb={4}>
          <IconButton onClick={() => navigate("/auth/login")}><ArrowBack /></IconButton>
          <Typography className={styles.title}>Forgot Password</Typography>
        </Stack>
        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>Email*</FormLabel>
          <InputBase
            type='email'
            className={`${styles.inputBox} ${error.email ? styles.errorInput : ''}`}
            value={data?.email}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              setData((pre) => ({ ...pre, email: e.target.value }));
            }}
            inputProps={{
              maxLength: 80,
              title: 'No spaces allowed. Only numbers are allowed.', // Tooltip for input rules
            }}
          />
          {error.email ? <FormHelperText className={styles.FormHelperText}>{data.email === "" ? "email is required" : "Invalid email"}</FormHelperText> : null}
        </FormGroup>
        <Button className={styles.signInBtn} onClick={HandleForgotPassword} disabled={(!data.email)}> Forgot Password</Button>
      </Box>

    </Box>
  )
}

export default ForgotPassword

