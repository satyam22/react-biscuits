import React, { useState } from 'react'
import './index.css'

const ProgressBar = ({percentage}) => {
    console.log('progress bar', percentage)
    return (
    <div className="progress-bar">
        <div className="filler" style={{width: `${percentage}%`}}/>
    </div>)
}

export default ProgressBar