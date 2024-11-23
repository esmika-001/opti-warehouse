import { Box } from '@mui/material'
import React from 'react'
import styles from './SidePanel.module.css'
import PanelButton from './PanelButton'
import SettingPng from '../../../assets/Images/setting.png'
import LogoutPng from '../../../assets/Images/logout.png'
import { useLocation, useNavigate } from 'react-router-dom'
import Spng from '../../../assets/Images/settingS.png'

const SidePanel = ({ handleLogout }: { handleLogout: Function }) => {
   const location = useLocation()
   // const leaveSummaryOptions = [
   //    { title: 'Leave Requests', image: leaveRequestImg, id: 11, redirect:"/leave-summary/leave-requests"},
   // ]   
   // const adminOptions = [
   //    { title: 'Admin Dashboard', image: DashboardPng, id: 21, redirect:"/admin/dashboard"},
   // ]
   const Navigate = useNavigate()
   return (
      <Box className={styles.root}>
         <PanelButton selected={location.pathname === "/"} id={4} title={'Home'} image={SettingPng} handleClick={() => { Navigate('/') }} />
         <PanelButton selected={location.pathname === "/setting/personal-info"} id={4} title={'Profile Settings'} image={SettingPng} handleClick={() => { Navigate('setting/personal-info') }} />
         <PanelButton selected={location.pathname === "/setting/security"} title='Security Settings' id={6} image={Spng} handleClick={() => { Navigate('setting/security') }} />
         <PanelButton selected={location.pathname === "/logout"} id={5} title={'Log out'} image={LogoutPng} handleClick={() => { handleLogout() }} />
      </Box>
   )
}

export default SidePanel