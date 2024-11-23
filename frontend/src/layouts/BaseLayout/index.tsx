import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './BaseLayout.module.css'
import { Box } from '@mui/material';
interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  // const [value,setValue] = useState<String>('1')

  // const handleChange = (event: React.SyntheticEvent,val:String):void =>{
  //   setValue(val)
  // }
  return (
    <Box
      className={styles.BaseLayoutRoot}
      sx={{
        flex: 1,
        minHeight: '100svh',
        maxHeight: '100svh',
      }}
    >
      {/* <Box className={styles.navbar}>
        <Box className={styles.navItems}>
          <img src={logo} alt='' className={styles.logo}/>
          <Tabs
            className={styles.navbarTabs}
            value={value}
            onChange={handleChange}
            aria-label="navbar"
          >
            <Tab value={'1'} label={"Dashboard"} className={styles.tabBtn}/>
            <Tab value={'2'} label={"Team"} className={styles.tabBtn}/>
            <Tab value={'3'} label={"Projects"} className={styles.tabBtn}/>
            <Tab value={'4'} label={"Celendar"} className={styles.tabBtn}/>
          </Tabs>
        </Box>
        <Box className={styles.navbtns}>
          <Typography className={styles.navbtns}  onClick={() => { navigate('/auth/login')}}><LoginOutlinedIcon/>&nbsp;Login/Register</Typography>
        </Box>
      </Box>
      <Box className={styles.children}> */}

        {children || <Outlet />}
      {/* </Box> */}
    </Box>
  );
};


export default BaseLayout;
