import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import styles from './UserSettings.module.css'
// import Bntpng from '../../assets/Images/settingB&t.png'
// import Ppng from '../../assets/Images/settingP.png'
// import Lpng from '../../assets/Images/settingL.png'
import { useNavigate } from 'react-router-dom'
import PersonalInfo from './PersonalInfo'
import { useAppDispatch } from '../../hooks'
import { updateUserAction } from '../../features/user/user.action'
import { useNotification } from '../../hooks/useNotification'

const UserSettings = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [reqData, setReqData] = useState<any>()
    const showNotification = useNotification()

    const handleSave = async () => {
        const data = {
            city: reqData.city,
            country: reqData.country,
            state: reqData.state,
            phone_no: reqData.phone,
            pincode: reqData.pincode
        }
        const resp: any = await dispatch(updateUserAction({ data: data }))
        if (resp.meta.requestStatus === 'fulfilled') {
            showNotification(" Profile Updated", "success");
            navigate("/setting/personal-info");
            // window.location.reload();
        }
        if (resp.meta.requestStatus === 'rejected') {
            console.log('resp: ', resp);
            showNotification(resp?.payload?.response?.data || "Error", "error");
        }
    }
    return (
        <Box className={styles.root}>
            <Box className={styles.heading}>
                <Box className={styles.headings}>
                    <Typography className={styles.heading1}>Profile Settings</Typography>
                    <Typography className={styles.heading2}>Manage your account settings</Typography>
                </Box>
                <Box className={styles.headingBtns} >
                    <Button onClick={() => { handleSave() }} className={`${styles.saveBtn} ${styles.headingBtn}`}>Save Changes</Button>
                    <Button onClick={() => { navigate('/') }} className={`${styles.cancleBtn} ${styles.headingBtn}`} >Cancel</Button>
                </Box>
            </Box>
            <Box className={styles.main}>
                <Box className={styles.mainWrapper}>
                    <Box className={styles.children}>
                        <PersonalInfo setReqData={setReqData} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default UserSettings