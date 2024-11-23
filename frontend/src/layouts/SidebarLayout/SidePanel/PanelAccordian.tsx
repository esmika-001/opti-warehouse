import React from 'react'
import styles from './SidePanel.module.css'
import { Accordion, AccordionDetails, AccordionSummary, Typography, MenuItem } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './SidePanal.css'
import { useLocation, useNavigate } from 'react-router';


interface props {
    id?: Number
    title: string
    image: string
    options: {
        id: number,
        title: string,
        image: string,
        redirect: string
    }[]
}

const PanelAccordian = (props: props) => {
    const { image, title, options } = props
    return (
        <Accordion className={`accordian ${styles.accordian}`}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className={styles.accSummary}
            >
                <img src={image} alt={title} className={styles.itemImg} /> &nbsp;{title} 
            </AccordionSummary>
            <AccordionDetails>
                {
                    options?.map((option) =>
                        <AccordianMenuItem id={option.id} image={option.image} title={option.title} redirect={option.redirect} />
                    )
                }

            </AccordionDetails>
        </Accordion>
    )
}

export default PanelAccordian


export const AccordianMenuItem = (props: { id: number, title: string, image: string, redirect: string }) => {
    const { image, title, redirect } = props
    const navigate = useNavigate()
    const location = useLocation();
    return (
        <MenuItem style={location.pathname === redirect ? {backgroundColor:'#dceeff'} : {}} className={styles.menuItems} onClick={() => { navigate(redirect) }}>
            <img src={image} alt={title} className={styles.itemImg} />&nbsp;
            <Typography className={styles.itemText} >
                {title}
            </Typography>
        </MenuItem>
    )
}
