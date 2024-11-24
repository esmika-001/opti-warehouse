import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from './UserSettings.module.css'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks'

const HomePage = () => {
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.persistedReducer?.user)

    return (
        <Box className={styles.root}>
            <Box className={styles.heading}>
                <Box className={styles.headings}>
                    <Typography className={styles.heading1}>Hey {user.name},</Typography>
                    <Typography className={styles.heading2}>Welcome to OptiWarehouse</Typography>
                </Box>
            </Box>
            <Box className={styles.main}>
                <Box className={styles.mainWrapper}>
                    <Box className={styles.children} display={'flex'} flexDirection={"column"} gap={2}>
                        <Typography fontSize={20} fontWeight={600}>About Us</Typography>
                        <Typography fontSize={16} fontWeight={600}>Sustainable logistics:</Typography>
                        <Typography fontSize={14} fontWeight={400}>It involves optimizing transportation to reduce carbon emissions. It focuses on selecting fuel-efficient transport modes, maximizing load capacities, and minimizing empty runs. These practices aim to decrease fuel consumption and reduce the overall carbon footprint of freight operations, contributing to environmental conservation while streamlining freight operations digitally</Typography>
                        <Typography fontSize={16} fontWeight={600}>Greenwashing:</Typography>
                        <Typography fontSize={14} fontWeight={400}>From a competition perspective, greenwashing can raise risk, including where a company claims that its products or services are greener than its competitors' and in doing so, denigrates competitors' products / services, or where competing companies use an environmental claim as a screen to engage in anti-competitive collaboration.</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage