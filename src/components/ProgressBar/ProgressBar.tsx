import React from 'react'
import './ProgressBar.scss'
// rgb(141, 181, 145)
// rgb(255, 175, 163);
const ProgressBar = ({progress}: {progress:number}) => {
  return (
    <div className='outer-bar' >
      <div className="inner-bar"
        style={{width: `${progress}%`, backgroundColor: `${progress > 70 ? 'rgb(141, 181, 145)' : progress <= 35 ? 'rgb(255, 175, 163)' : 'rgb(255, 219, 141)'}`}}
      >
      </div>
    </div>
  )
}

export default ProgressBar