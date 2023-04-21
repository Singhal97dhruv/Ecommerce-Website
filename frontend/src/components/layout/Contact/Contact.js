import React from 'react'
import "./Contact.css";
import { Button } from "@material-ui/core";
const Contact = () => {
  return (
    <div className="contactContainer">
    <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
     
      <Button>Mail At: dhruvsinghal9876@gmail.com</Button>
      <Button>Contact: +91 7291023130</Button>

    </a>
  </div>
  )
}

export default Contact
