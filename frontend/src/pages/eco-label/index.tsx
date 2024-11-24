import { Box, Button, FormGroup, FormLabel, InputBase, Stack, Typography, } from '@mui/material'
import React, { useState } from 'react'
import styles from './EcoLabelPage.module.css'
import { useNotification } from '../../hooks/useNotification'
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import axios from 'axios';

const EcoLabelPage = () => {
    const [result, setResult] = useState<any>(null)
    const [data, setData] = useState<any>({
        certificate_issued_by: "",
        product_id: "",
        claims: "",
        supplier: "",
        expiry_date: null,
    })
    const showNotification = useNotification()

    const handlePredict = async () => {
        try {
            const resp: any = await axios.post(`${process.env.REACT_APP_MODEL_URL}/verify_eco_label`, {
                ...data,
                expiry_date: data.expiry_date?.format("DD-MM-YYYY")
            })

            if (resp.data.eco_label_status === "Invalid input")
                setResult("Invalid input")

            if (resp.data.eco_label_status === "Verified")
                setResult("Verified")
            else
                setResult("Not Verified")
        } catch (error) {
            showNotification("Error in Prediction", "error");
        }
    }

    return (
        <Box className={styles.root}>
            <Box className={styles.heading}>
                <Box className={styles.headings}>
                    <Typography className={styles.heading1}>Eco Label Verifier</Typography>
                    <Typography className={styles.heading2}>Verifier the Eco Label</Typography>
                </Box>
                <Box className={styles.headingBtns} >
                    <Button onClick={() => { handlePredict() }} className={`${styles.saveBtn} ${styles.headingBtn}`}>Predict</Button>
                </Box>
            </Box>
            <Box className={styles.main}>
                <Box className={styles.mainWrapper}>
                    <Box className={styles.children} gap={3} display={"flex"} flexDirection={"column"}>
                        <Stack direction={"column"} width={"100%"} gap={2}>
                            <Stack direction={{ sm: "row", xs: "column" }} spacing={2} width={"100%"}>
                                <FormGroup className={styles.form}>
                                    <FormLabel className={styles.formLabel}>Product ID</FormLabel>
                                    <InputBase
                                        onChange={(e: any) => {
                                            const value = e.target.value;
                                            setData((pre: typeof data) => ({ ...pre, product_id: value }));
                                        }}
                                        value={data?.product_id}
                                        placeholder='Product ID'
                                        className={`${styles.inputBox}`}
                                    />
                                </FormGroup>
                                <FormGroup className={styles.form}>
                                    <FormLabel className={styles.formLabel}>Certificate Issued By</FormLabel>
                                    <InputBase
                                        onChange={(e: any) => {
                                            const value = e.target.value;
                                            setData((pre: typeof data) => ({ ...pre, certificate_issued_by: value }));
                                        }}
                                        value={data?.certificate_issued_by}
                                        placeholder='Certificate Issued By'
                                        className={`${styles.inputBox}`}
                                    />
                                </FormGroup>
                            </Stack>
                            <Stack direction={{ sm: "row", xs: "column" }} spacing={2} width={"100%"}>
                                <FormGroup className={styles.form}>
                                    <FormLabel className={styles.formLabel}>Claims</FormLabel>
                                    <InputBase
                                        onChange={(e: any) => {
                                            const value = e.target.value;
                                            setData((pre: typeof data) => ({ ...pre, claims: value }));
                                        }}
                                        value={data?.claims}
                                        placeholder='Claims'
                                        className={`${styles.inputBox}`}
                                    />
                                </FormGroup>
                                <FormGroup className={styles.form}>
                                    <FormLabel className={styles.formLabel}>Supplier</FormLabel>
                                    <InputBase
                                        onChange={(e: any) => {
                                            const value = e.target.value;
                                            if (value.length <= 10) {
                                                setData((pre: typeof data) => ({ ...pre, supplier: value }));
                                            }
                                        }}
                                        value={data?.supplier}
                                        placeholder='Supplier'
                                        className={`${styles.inputBox}`}
                                    />
                                </FormGroup>
                            </Stack>
                            <Stack direction={{ sm: "row", xs: "column" }} spacing={2} width={"100%"}>
                                <FormGroup className={styles.form}>
                                    <FormLabel className={styles.formLabel}>Expiry Date</FormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={["DatePicker"]} sx={{ mt: "-6px", pl: 0 }}>
                                            <DatePicker
                                                className={`${styles.inputBoxDate}`}
                                                disableFuture
                                                sx={{ width: "100%", p: 0 }}
                                                value={data.expiry_date ? data.expiry_date : null}
                                                onChange={(newValue: Dayjs | null) => {
                                                    setData((pre: typeof data) => ({
                                                        ...pre,
                                                        expiry_date: dayjs(newValue!),
                                                    }));
                                                }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormGroup>
                                <FormGroup className={styles.form}>

                                </FormGroup>
                            </Stack>
                        </Stack>
                        {result &&
                            <Stack direction={"row"} width={"100%"} gap={2}>
                                <Typography fontSize={"18px"} fontWeight={600}>Prediction:</Typography>
                                <Typography fontSize={"18px"} color={result === 'Verified' ? "green" : "red"} fontWeight={400}>{result}</Typography>
                            </Stack>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default EcoLabelPage