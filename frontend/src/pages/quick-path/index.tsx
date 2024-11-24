import { Box, Button, FormLabel, Slider, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from './QuickPathPage.module.css'
import { useNotification } from '../../hooks/useNotification'
import axios from 'axios'
import { BarChart } from '@mui/x-charts'

const QuickPathPage = () => {
    const [data, setData] = useState({
        no_of_lines: 1,
        min_orders: 1,
        max_orders: 1,
        no_of_orders_lines_included: 1,
    })
    const showNotification = useNotification()
    const [result, setResult] = useState<any>()

    const handlePredict = async () => {
        try {
            const resp: any = await axios.post(`${process.env.REACT_APP_MODEL_URL}/quick_path`, data)

            if (resp.data.status === "success") {
                const res = await axios.get(`${process.env.REACT_APP_MODEL_URL}/${resp.data.results_file}`)
                const data = () =>
                    res.data.split('\n')
                        .map((line: string) => line.split(','))
                        .filter((line: string[]) => line.length > 1)
                        .map((line: string[]) => [line[0], line[1].replace(/\r$/, '')])
                        .slice(1);

                setResult(data());
            }

        } catch (error) {
            showNotification("Error in Prediction", "error");
        }
    }

    return (
        <Box className={styles.root}>
            <Box className={styles.heading}>
                <Box className={styles.headings}>
                    <Typography className={styles.heading1}>Quick Path</Typography>
                    <Typography className={styles.heading2}>Find Quick Path</Typography>
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

                                <Stack width={"100%"}>
                                    <FormLabel className={styles.formLabel}>No. of Order Lines: </FormLabel>
                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }} width={{ xs: "100%", sm: "50%" }} >
                                        <Typography fontSize={14}>1</Typography>
                                        <Slider
                                            valueLabelDisplay="auto"
                                            min={1}
                                            max={200}
                                            value={data.no_of_lines}
                                            onChange={(e: any) =>
                                                setData((p: any) => ({ ...p, no_of_lines: e.target.value }))
                                            } />
                                        <Typography fontSize={14}>200</Typography>
                                    </Stack>
                                    <Typography>{1000 * data.no_of_lines} Order Lines</Typography>
                                </Stack>

                            </Stack>

                            <Stack direction={{ sm: "row", xs: "column" }} spacing={2} width={"100%"}>

                                <Stack width={{ xs: "100%", sm: "50%" }}>
                                    <FormLabel className={styles.formLabel}>Min No. of Order per wave: </FormLabel>
                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }} width={"100%"} >
                                        <Typography fontSize={14}>1</Typography>
                                        <Slider
                                            size='small'
                                            valueLabelDisplay="auto"
                                            marks
                                            min={1}
                                            max={20}
                                            value={data.min_orders}
                                            onChange={(e: any) =>
                                                setData((p: any) => ({ ...p, min_orders: e.target.value }))
                                            } />
                                        <Typography fontSize={14}>20</Typography>
                                    </Stack>
                                </Stack>

                                <Stack width={{ xs: "100%", sm: "50%" }}>
                                    <FormLabel className={styles.formLabel}>Max No. of Order per wave: </FormLabel>
                                    <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }} width={"100%"} >
                                        <Typography fontSize={14}>{data.min_orders}</Typography>
                                        <Slider
                                            size='small'
                                            valueLabelDisplay="auto"
                                            marks
                                            min={data.min_orders}
                                            max={20}
                                            value={data.max_orders}
                                            onChange={(e: any) =>
                                                setData((p: any) => ({ ...p, max_orders: e.target.value }))
                                            } />
                                        <Typography fontSize={14}>20</Typography>
                                    </Stack>
                                </Stack>

                            </Stack>
                            
                        </Stack>
                        {result &&
                            <Stack direction={"column"} width={"100%"} gap={2}>
                                <Typography fontSize={"18px"} fontWeight={600}>Predicted path:</Typography>
                                <BarChart
                                    series={[{ data: result.map((d: any) => (d[1])) }]} // data should be an array of arrays
                                    height={290}
                                    xAxis={[{ data: result.map((d: any) => String(d[0])), scaleType: 'band' }]}
                                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                                />
                            </Stack>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default QuickPathPage