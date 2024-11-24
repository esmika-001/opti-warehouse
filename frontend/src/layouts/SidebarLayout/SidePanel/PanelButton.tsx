import { Box, Typography } from '@mui/material'
import styles from './SidePanel.module.css'

interface props {
    id: Number
    title: string
    image?:string | JSX.Element;
    handleClick: () => void ;
    selected:boolean
}

const PanelButton = (props: props) => {
    const { title, image, handleClick,selected } = props
    return (
        <Box className={styles.items} onClick={handleClick} style={selected ? {backgroundColor:'#dceeff'} : {}}>
            {typeof image === "string" && <img src={image} alt={title} className={styles.itemImg} />}
            {typeof image === "object" && image}
            &nbsp;&nbsp;<Typography fontSize={14}>
                {title} 
            </Typography>
        </Box>
    )
}

export default PanelButton