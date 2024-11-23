import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import calenderSvg from '../../../assets/Images/Calendar.png';
import { useAppSelector } from '../../../hooks';
import { RootState } from '../../../store/store';
import styles from './SidePanelNavbar.module.css';
interface propsType {
    handleClickAvatar: any;
    setOpenDrawer: (data: boolean) => void;
    openDrawer: boolean;
}

const SidePanelNavbar = (props: propsType) => {
    const user = useAppSelector((state: RootState) => state.persistedReducer.user)
    const { handleClickAvatar, setOpenDrawer, openDrawer } = props

    const getWeekDay = () => {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const curr_date = new Date(Date.now())
        var date: string | number = curr_date.getDate()
        date = date === 1 ? "1st" : date === 2 ? "2nd" : date === 3 ? "3rd" : `${date}th`

        return `${weekday[curr_date.getDay()]}, ${date} ${months[curr_date.getMonth()]} `
    }

    return (
        <Box className={styles.root}>
            <Box className={styles.left}>
                <IconButton onClick={() => setOpenDrawer(!openDrawer)} sx={{ p: 1.5, mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                {/* <img height={40} width={40} src={logo} alt="logo" className={styles.logo} /> &nbsp; */}
                OptiWarehouse
            </Box>
            <Box className={styles.right}>
                <Box className={styles.dateBox}>
                    <img src={calenderSvg} alt='calender' /> &nbsp;
                    <Typography className={styles.dateText}>{getWeekDay()}</Typography>
                </Box>
                <Box sx={{ cursor: 'pointer', color: "black" }} className={styles.notificationBox}
                    onClick={() => { }} >

                </Box>
                <Box className={styles.profileBox}>
                    <Box className={styles.profileTextBox}>
                        <Typography className={styles.userName}>{user.name}</Typography>
                    </Box>
                    <Avatar
                        className={styles.userAvatar}
                        src={user.image ? `${process.env.REACT_APP_BACKEND_URL}/${user.image}` : ""}
                        onClick={(event: any) => { handleClickAvatar(event) }} />
                </Box>
            </Box>
        </Box>
    )
}

export default SidePanelNavbar
