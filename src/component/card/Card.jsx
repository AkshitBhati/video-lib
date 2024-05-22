import React from 'react'
import ReactPlayer from "react-player"
import "./Card.css"

const Card = ({ url, caption, timestamp }) => {
    
  return (
    <div className='card__container'>
         <ReactPlayer
        className='react-player'
        url={url}
        width='300px'
        height='150px'
        controls={true}
      />
      <p style={{marginTop:"5px"}}>{caption}</p>
      <p>Timestamp Delay- {timestamp} seconds</p>
    </div>
  )
}

export default Card

