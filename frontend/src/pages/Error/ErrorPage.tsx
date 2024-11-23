import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import Arrow from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

type pageProps = {
    image: any,
    Heading: string,
    subheading: string,
    buttonRequired: boolean
}

const ErrorPage = (props: pageProps) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        navigate(-1);
    }
    return (
        <Stack sx={{ bgcolor: "#F9FAFB", justifyContent: "center", alignItems: "center", minHeight: "100%" }} padding={4} direction={"column"}>
            <img className='errorImg' style={{ height: "100%", width: 'auto', maxWidth: "100%" }} src={props.image} alt='' />
            <Typography sx={{ fontFamily: "sans-serif", fontSize: { sm: "55px", xs: "32px" }, color: "rgba(0,0,0,0.898)", fontWeight: 600, lineHeight: { sm: "80px", xs: "40px" } }} textAlign={"center"}>{props.Heading}</Typography>
            <Typography sx={{
                fontFamily: "sans-serif", fontSize: "20px", color: "rgba(0,0,0,0.578)", fontWeight: 500, lineHeight: "32px", py: 2
            }} textAlign={"center"} display={{sm:"block", xs:"none"}}> {props.subheading} </Typography>
            {props.buttonRequired && <Button onClick={handleClick} sx={{
                bgcolor: "#1C64F2",
                color: "white",
                padding: "12px",
                borderRadius: "15px",
                textTransform: "none",
                fontSize: "16px",
                my:2,
                "&:hover": {
                    backgroundColor: "#004182",
                }
            }}
                startIcon={<Arrow sx={{ height: "12px" }}
                />}>
                Go back to home
            </Button>}
        </Stack>
    )
}

export default ErrorPage