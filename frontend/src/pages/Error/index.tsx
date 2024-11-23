import React from 'react'
import ErrorPage from './ErrorPage'
import Error404 from "../../assets/Images/Error.png"
const Error = () => {
  return <ErrorPage
    buttonRequired={true}
    image={Error404}
    Heading="Page Not Found"
    subheading="OOPS! Looks like you followed a bad link. If you think this is a problem with us , please tell us." />
}

export default Error