import React from 'react'
import ErrorPage from './ErrorPage'
import Error404 from "../../assets/Images/Error.png"

const Maintaince = () => {
  return <ErrorPage buttonRequired image={Error404} Heading="Network Issue" subheading="OOPS! Looks like your network is disconnected. Please check your internet connection." />
   
}

export default Maintaince