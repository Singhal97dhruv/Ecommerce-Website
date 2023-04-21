import React from 'react'
import playStore from "../../../images/playstore.png"
import appStore from "../../../images/Appstore.png"
import "./Footer.css"
const Footer = () => {
  return (
    <div>
      <footer id="id">
        <div className="leftFooter">
            <h4>Download our App</h4>
            <p>Download App for Android and IOS mobile phones</p>
            <img src={playStore} alt="playStore" />
            <img src={appStore} alt="appStore" />
        </div>
        <div className="midFooter">
            <h1>Ecommerce</h1>
            <p>Customer Satisfaction is the only thing we care about</p>
            <p>Copyrights reserved &copy;Dhruv Singhal</p>
        </div>
        <div className="rightFooter">
            <h4>Follow Us</h4>

            <a href="https://www.instagram.com/dhruv.singhal.saab/">Instagram</a>
            <a href="https://linkedin.com/in/singhal97">LinkedIn</a>
            <a href="https://github.com/Singhal97dhruv">GitHub</a>

        </div>
      </footer>
    </div>
  )
}

export default Footer
