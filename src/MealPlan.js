import React, { useState } from 'react'
import { CButton, CCollapse, CCard, CCardBody } from '@coreui/react'
import './stylesheets/MealPlan.css';

export const MealPlan = (props) => {
  const [visible, setVisible] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <button className="dropdown-btn" onClick={() => setVisible(!visible)}>
        {props.day}
      </button>

      <CCollapse visible={visible}>
        <CCard>
          <CCardBody>
            <div className="dropdown-container">
                <button className="">Add Meal for {props.day}</button>
            </div>
          </CCardBody>
        </CCard>
      </CCollapse>
    </div>
  )
}

export default MealPlan
