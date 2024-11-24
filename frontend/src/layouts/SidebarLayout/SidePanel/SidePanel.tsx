import { Box } from '@mui/material'
import React from 'react'
import styles from './SidePanel.module.css'
import PanelButton from './PanelButton'
import SettingPng from '../../../assets/Images/setting.png'
import LogoutPng from '../../../assets/Images/logout.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dashboard } from '@mui/icons-material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RouteIcon from '@mui/icons-material/Route';
import Leaves from '../../../assets/svg/leaves.svg'
import SecurityIcon from '@mui/icons-material/Security';
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
         <PanelButton selected={location.pathname === "/"} id={1} title={'Home'} image={<Dashboard />} handleClick={() => { Navigate('/') }} />
         <PanelButton selected={location.pathname === "/eco-label-verifier"} id={2} title={'Eco Label Verifier'} image={Leaves} handleClick={() => { Navigate('/eco-label-verifier') }} />
         <PanelButton selected={location.pathname === "/quick-path"} id={3} title={'Quick Path'} image={<RouteIcon />} handleClick={() => { Navigate('/quick-path') }} />
         <PanelButton selected={location.pathname === "/inventory-optimizer"} id={4} title={'Inventory Optimizer'} image={<ShoppingCartIcon />} handleClick={() => { Navigate('/inventory-optimizer') }} />
         <PanelButton selected={location.pathname === "/setting/personal-info"} id={5} title={'Profile Settings'} image={SettingPng} handleClick={() => { Navigate('setting/personal-info') }} />
         {/* <PanelButton selected={location.pathname === "/setting/security"} title='Security Settings' id={6} image={<SecurityIcon />} handleClick={() => { Navigate('setting/security') }} /> */}
         <PanelButton selected={location.pathname === "/logout"} id={7} title={'Log out'} image={LogoutPng} handleClick={() => { handleLogout() }} />
      </Box>
   )
}

export default SidePanel