import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'

const UserSettings = () => {
    const navigate = useNavigate()
    return (
        <Box className={styles.root}>
            <Box className={styles.heading}>
                <Box className={styles.headings}>
                    <Typography className={styles.heading1}>page-title</Typography>
                    <Typography className={styles.heading2}>sub-title</Typography>
                </Box>
                <Box className={styles.headingBtns} >
                    <Button onClick={() => {  }} className={`${styles.saveBtn} ${styles.headingBtn}`}>Save Changes</Button>
                    <Button onClick={() => { navigate('/') }} className={`${styles.cancleBtn} ${styles.headingBtn}`} >Cancel</Button>
                </Box>
            </Box>
            <Box className={styles.main}>
                <Box className={styles.mainWrapper}>
                    
                    
                </Box>
            </Box>
        </Box>
    )
}

export default UserSettings