import { Box, Typography } from '@mui/material'
import React from 'react'
import styles from './UserSettings.module.css'
// import Bntpng from '../../assets/Images/settingB&t.png'
// import Ppng from '../../assets/Images/settingP.png'
// import Lpng from '../../assets/Images/settingL.png'
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
                    <Box className={styles.children}>
                        
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default HomePage