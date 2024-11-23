
import { Box, Button, FormGroup, FormHelperText, FormLabel, InputBase, Typography, IconButton, Stack, InputAdornment, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material'
import { useNotification } from '../../hooks/useNotification'
import axiosInstance from '../../config/axios'
import { detectBrowser } from '../../libs/commonFxn'

type Data = {
  password: string
}

const ResetPassword = () => {
  const { token } = useParams<{ token: string, email: string }>()
  const navigate = useNavigate();
  const showNotification = useNotification();
  const initStage = {
    password: "",
  }
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<Data>(initStage)
  const [error, setError] = useState({
    password: false,
  });
  const browser = detectBrowser();


  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get(`/auth/reset-password/${token}`);
        if (response) {
          setLoading(false)
        }
        else {
          showNotification("Error", "error");
          setLoading(false)
        }
      }
      catch (error) {
        showNotification("Error", "error");
        console.log('error: ', error);
      }

    })()
  }, [])

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const HandleResetPassword = async () => {
    setError({
      password: false,
    });
    if (data.password === "") {
      // Set errors if fields are empty
      setError((prev) => ({
        ...prev,
        password: data.password === "",
      }));
      return;
    }
    try {
      const res: any = await axiosInstance.post(`/auth/reset-password/${token}`, { password: data.password });
      if (res.data.token) {
        showNotification("Password Reset Successfully", "success");
        navigate("/auth/login");
      }
      if (res?.meta?.requestStatus === "rejected") {
        // Display error message for invalid login
        showNotification(res?.payload?.response?.data || "Error", "error");

        // Based on the response, set appropriate errors
        if (res?.payload?.response?.data) setError((prev) => ({ ...prev, password: false }));
      }
    } catch (error) {
      showNotification("Error", "error");
      console.log('error: ', error);
    }
  }
  const validatePassword = (password: string) => {
    return String(password).match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);
  };

  function check_password(data: string) {
    const isValid = data !== "" && validatePassword(data) && data.length >= 6;
    setError((pre) => ({ ...pre, password: !isValid }));

  }

  return (
    <Box className={styles.root}>
      <Box className={styles.partition2}>
        <Stack direction={"row"} gap={2} alignItems={"center"} mb={4}>
          <IconButton onClick={() => navigate("/auth/login")}><ArrowBack /></IconButton>
          <Typography className={styles.title}>Reset Password</Typography>
        </Stack>
        {!loading && <>
          <FormGroup className={styles.inputWraper}>
            <FormLabel className={styles.inputlabel}>Password*</FormLabel>
            <Box className={styles.passwordWrapper}>
              <InputBase type={showPassword ? 'text' : 'password'} className={`${styles.inputBox} ${error.password ? styles.errorInput : ''}`} error={error.password} value={data?.password}

                onChange={(e) => {
                  const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+={}\[\]:;<>,.?~\\/-]/g, '');
                  check_password(value);
                  setData((pre) => ({ ...pre, password: value }));
                }}
                inputProps={{
                  maxLength: 50,
                  title: 'No spaces allowed. Only letters, numbers, and special characters are allowed.', // Tooltip for input rules
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {browser === 'Microsoft Edge' ? <Visibility sx={{ display: 'none', cursor: 'none', }} /> : showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              ></InputBase>
            </Box>
            {error.password ? <FormHelperText className={styles.FormHelperText}>{data.password === "" ? "Password is required" : "Invalid Password"}</FormHelperText> : null}
          </FormGroup>
          <Button className={styles.signInBtn} onClick={HandleResetPassword} disabled={(!data.password)}> Reset Password</Button>
        </>}
        {loading && <Stack direction={"row"} gap={2} justifyContent={"center"} alignItems={"center"} minHeight={"100%"} mb={4}>
          <CircularProgress size={20} />
        </Stack>}
      </Box>

    </Box>
  )
}

export default ResetPassword

