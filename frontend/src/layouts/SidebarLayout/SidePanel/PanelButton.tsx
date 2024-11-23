import { Box, Typography } from '@mui/material'
import styles from './SidePanel.module.css'

interface props {
    id: Number
    title: string
    image?:string;
    handleClick: () => void ;
    selected:boolean
}

const PanelButton = (props: props) => {
    const { title, image, handleClick,selected } = props
    return (
        <Box className={styles.items} onClick={handleClick} style={selected ? {backgroundColor:'#dceeff'} : {}}>
            <img src={image} alt={title} className={styles.itemImg} />
            &nbsp;&nbsp;<Typography>
                {title} 
            </Typography>
        </Box>
    )
}

export default PanelButton