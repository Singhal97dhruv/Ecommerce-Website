import React from 'react'
import "./notFound.css"
import { Button } from "@material-ui/core";

const NotFound = () => {
  return (
    <div>
      <div className='container'>
        <div className="containerBox">
          <div className="imgBox">

            <img src="https://res.cloudinary.com/dsk75d0xd/image/upload/v1682051723/avatars/emojipng.com-11460877_day4rf.png" alt="" />

          </div>
          <div className="containerBox2">
            <h1> <span>Bruuh!,</span><br /> You are on a page that not exists for you</h1>
            <a href="/">
              <Button color='secondary' className='btn'>Go Back Home</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
