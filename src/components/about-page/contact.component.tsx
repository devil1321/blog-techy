import React from 'react'
import CalendarComp from '../calendar.compoent'

const Contact:React.FC = () => {
  return (
    <div className="about-page__contact">
        <h2 className="title">Make An Appointment</h2>
        <CalendarComp />
    </div>
  )
}

export default Contact