
import { Box, Button, FormGroup, FormHelperText, FormLabel, InputBase, Typography, IconButton, InputAdornment, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { Link } from 'react-router-dom'
import { LoginApi, VerifyLoginApi } from '../../features/user/user.action'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store/store'
import { reset } from '../../features/user/user.slice'
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material'
import { detectBrowser } from '../../libs/commonFxn'
import { useNotification } from '../../hooks/useNotification'

type Data = {
  email: string
  password: string
  OTP: string
}

const Login = () => {
  const dispatch = useAppDispatch();
  const showNotification = useNotification();
  const initStage = {
    email: "",
    password: '',
    OTP: ''
  }
  const state = useAppSelector((state: RootState) => state.persistedReducer)
  const [data, setData] = useState<Data>(initStage)
  const [error, setError] = useState({
    email: false,
    password: false,
    OTP: false
  });
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const browser = detectBrowser();
  useEffect(() => {
    (async () => {
      if (state.error)
        await dispatch(reset());
    })()
    if (state.error)
      setError({
        email: true,
        password: true,
        OTP: true
      })
  }, [state.error])


  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const HandleLogin = async () => {
    // Clear previous errors before making a new login attempt
    setError({
      email: false,
      password: false,
      OTP: false
    });

    if (data.email === "" || data.password === "") {
      // Set errors if fields are empty
      setError((prev) => ({
        ...prev,
        email: data.email === "",
        password: data.password === "",
      }));
      return;
    }

    try {
      const res: any = await dispatch(LoginApi({ email: data.email, password: data.password }));
      if (res?.meta?.requestStatus === "fulfilled") {
        // showNotification("Login successfully", "success");
        setStep(2);
      }
      if (res?.meta?.requestStatus === "rejected") {
        // Display error message for invalid login
        showNotification(res?.payload?.response?.data || "Error", "error");

        // Based on the response, set appropriate errors
        if (res?.payload?.response?.data) {
          setError((prev) => ({ ...prev, email: false, password: false }));
        }

      }
    } catch (error) {
      showNotification("Error", "error");
      console.log('error: ', error);
    }
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password: string) => {
    return String(password).match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);
  };

  function check_password(data: string) {
    const isValid = data !== "" && validatePassword(data) && data.length >= 6;
    setError((pre) => ({ ...pre, password: !isValid }));
    if (isValid && !error.email) {
      setError((pre) => ({ ...pre, password: false }));
    }
  }

  function check_email(data: string) {
    const isValid = data !== "" && validateEmail(data);
    setError((pre) => ({ ...pre, email: !isValid }));
    if (isValid && !error.password) {
      setError((pre) => ({ ...pre, email: false }));
    }
  }

  const HandleVerifyOtp = async () => {
    setError({
      email: false,
      password: false,
      OTP: false
    });
    if (data.OTP === "") {
      // Set errors if fields are empty
      setError((prev) => ({
        ...prev,
        OTP: data.OTP === "",
      }));
      return;
    }
    try {
      const res: any = await dispatch(VerifyLoginApi({ email: data.email, otp: data.OTP }));
      if (res?.meta?.requestStatus === "fulfilled") {
        showNotification("Login successfully", "success");
      }
      if (res?.meta?.requestStatus === "rejected") {
        // Display error message for invalid login
        showNotification(res?.payload?.response?.data || "Error", "error");

        // Based on the response, set appropriate errors
        if (res?.payload?.response?.data) setError((prev) => ({ ...prev, OTP: false }));
      }
    } catch (error) {
      showNotification("Error", "error");
      console.log('error: ', error);
    }
  }


  return (
    <Box className={styles.root}>
      {step === 1 && <Box className={styles.partition2}>
        <Typography className={styles.title}>Sign In</Typography>

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
              const value = e.target.value.replace(/\s+/g, '');
              check_email(value);
              setData((pre) => ({ ...pre, email: value }));
            }}
            inputProps={{
              maxLength: 50,
              title: 'No spaces allowed. Only letters, numbers, and special characters are allowed.', // Tooltip for input rules
            }}
          />
          {error.email ? <FormHelperText className={styles.FormHelperText}>{data.email === "" ? "Email is required" : "Invalid Email"}</FormHelperText> : null}
        </FormGroup>

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
        <Box className={styles.rememberMeWrap}>
          <Typography className={`${styles.rememberMeText} ${styles.loginRedirect}`}><Link to='/auth/forgot-password'> Forgot Password?</Link></Typography>
          <Typography className={`${styles.rememberMeText} ${styles.loginRedirect}`}>New User? <Link to='/auth/signup'> Signup here</Link></Typography>
        </Box>
        <Button className={styles.signInBtn} onClick={HandleLogin} disabled={(data.email.length === 0 || data.password.length === 0 || state.isLoading === true || (state.token !== ''))}> Sign In</Button>
      </Box>}
      {step === 2 && <Box className={styles.partition2}>
        <Typography className={styles.title}>Verify using OTP</Typography>
        <Stack direction={"row"} gap={2} alignItems={"center"} mb={2}>
          <IconButton onClick={() => setStep(1)}><ArrowBack /></IconButton>
          <Typography className={styles.email}>{data.email}</Typography>
        </Stack>
        <FormGroup className={styles.inputWraper}>
          <FormLabel className={styles.inputlabel}>OTP*</FormLabel>
          <InputBase
            type='number'
            className={`${styles.inputBox} ${error.email ? styles.errorInput : ''}`}
            value={data?.OTP}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
              }
            }}
            onChange={(e) => {
              const value = e.target.value.length > 6 ? data.OTP : e.target.value;
              setData((pre) => ({ ...pre, OTP: value }));
            }}
            inputProps={{
              maxLength: 6,
              title: 'No spaces allowed. Only numbers are allowed.', // Tooltip for input rules
            }}
          />
          {error.OTP ? <FormHelperText className={styles.FormHelperText}>{data.OTP === "" ? "OTP is required" : "Invalid OTP"}</FormHelperText> : null}
        </FormGroup>
        <Button className={styles.signInBtn} onClick={HandleVerifyOtp} disabled={(!data.OTP || state.isLoading || (state.token !== ''))}> Verify OTP</Button>
      </Box>
      }
    </Box>
  )
}

export default Login

