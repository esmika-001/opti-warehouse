import React, { ReactNode, useEffect, useState } from 'react'
import { Box, Drawer, Menu, MenuItem, useMediaQuery } from '@mui/material'
import { Outlet, useNavigate } from 'react-router';
import SidePanel from './SidePanel/SidePanel';
import SidePanelNavbar from './Navbar';
import styles from './SidebarLayout.module.css'
import { useAppDispatch } from '../../hooks';
import { logout } from '../../features/user/user.slice';
interface LayoutProps {
  children?: ReactNode;
}

const SidebarLayout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [menuAnchorRef, setMenuAnchorRef] = useState<HTMLElement | null>(null)
  const [openDrawer, setOpenDrawer] = useState<boolean>(true)
  const isTablet = useMediaQuery('(max-width: 1024px)')
  const isMobile = useMediaQuery('(max-width: 600px)')
  const open = Boolean(menuAnchorRef);
  const handleClickAvatar = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorRef(event.currentTarget);
  };
  const handleCloseAvatar = () => {
    setMenuAnchorRef(null);
  };
  const handleLogout = () => {
    handleCloseAvatar();
    dispatch(logout())
  }

  useEffect(() => {
    if (isTablet) {
      setOpenDrawer(false)
    } else {
      setOpenDrawer(true)
    }
  }, [isTablet])

  return (
    <Box className={styles.root} sx={{}}>
      <SidePanelNavbar handleClickAvatar={handleClickAvatar} setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
      <Menu
        id="basic-menu"
        anchorEl={menuAnchorRef}
        open={open}
        onClose={handleCloseAvatar}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => navigate('/setting/personal-info')}>Profile</MenuItem>
        <MenuItem onClick={handleLogout} >Logout</MenuItem>
      </Menu>
      <Box className={styles.content}>
        {!isMobile ?
          <Box className={`${openDrawer ? styles.open : styles.closed} ${styles.sidebar}`}>
            <SidePanel handleLogout={handleLogout} />
          </Box>
          :
          <Drawer open={openDrawer} variant='temporary' onClose={() => setOpenDrawer(false)}>
            <SidePanel handleCloseMobileDrawer={() => isMobile && setOpenDrawer(false)} handleLogout={handleLogout} />
          </Drawer>
        }
        {children || <Outlet />}
      </Box>
    </Box>
  )
}

export default SidebarLayout