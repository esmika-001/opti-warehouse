import { Box, Button, FormGroup, FormLabel, InputBase, Stack, Typography, } from '@mui/material'
import React, { useState } from 'react'
import styles from './InventoryOptimizerPage.module.css'
import { useNotification } from '../../hooks/useNotification'
import axios from 'axios'

const InventoryOptimizerPage = () => {
    const [data, setData] = useState({
        product_id: "",
        month: "",
        year: ""
    })
    const showNotification = useNotification()
    const [result, setResult] = useState<any>(null)

    const handlePredict = async () => {
        try {
            const resp: any = await axios.post(`${process.env.REACT_APP_MODEL_URL}/predict_inventory`, data)
            console.log('resp.payload: ', resp);
            setResult(resp.data)
        } catch (error) {
            showNotification("Error in Prediction", "error");
        }
    }
    return (
        <Box className={styles.root}>
            <Box className={styles.heading}>
                <Box className={styles.headings}>
                    <Typography className={styles.heading1}>Inventory Optimizer</Typography>
                    <Typography className={styles.heading2}>Optimize your Inventory</Typography>
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
                                    <FormLabel className={styles.formLabel}>Month</FormLabel>
                                    <InputBase
                                        onChange={(e: any) => {
                                            const value = e.target.value;
                                            setData((pre: typeof data) => ({ ...pre, month: value }));
                                        }}
                                        value={data?.month}
                                        placeholder='In MM format'
                                        className={`${styles.inputBox}`}
                                    />
                                </FormGroup>
                            </Stack>
                            <Stack direction={{ sm: "row", xs: "column" }} spacing={2} width={{ xs: "100%", sm: "50%" }}>
                                <FormGroup className={styles.form}>
                                    <FormLabel className={styles.formLabel}>Year</FormLabel>
                                    <InputBase
                                        onChange={(e: any) => {
                                            const value = e.target.value;
                                            setData((pre: typeof data) => ({ ...pre, year: value }));
                                        }}
                                        value={data?.year}
                                        placeholder='In YYYY format'
                                        className={`${styles.inputBox}`}
                                    />
                                </FormGroup>
                            </Stack>
                        </Stack>
                        {result &&
                            <Stack direction={"row"} width={"100%"} gap={2}>
                                <Typography fontSize={"18px"} fontWeight={600}>Predicted Quantity:</Typography>
                                <Typography fontSize={"18px"} fontWeight={400}>{result?.predictions}</Typography>
                            </Stack>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default InventoryOptimizerPage