import React, { useState } from 'react'
import { CButton, CCollapse, CCard, CCardBody } from '@coreui/react'
import './stylesheets/MealPlan.css';
import { useNavigate } from 'react-router-dom';
import Meal from './Meal';

export const MealPlan = (props) => {
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    const onAddBtnClick = () => {
        props.onAddMealPlan(props.day);
        navigate("/meals");
    }

    const currentMealPlans = props.plans.map((mealPlan) => {
        return (
            <Meal
            key={mealPlan.mealPlanId}
            mealPlanId={mealPlan.mealPlanId}
            meal={mealPlan.meal} 
            mealOption={"mealPlan"}
            deleteSelectedMealPlanMeal={props.deleteSelectedMealPlanMeal}
            day={props.day}
            addMealToMealPlan={props.addMealToMealPlan}
            changeSelectedMealId={props.changeSelectedMealId}
            />
        );
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
        <button className="dropdown-btn" onClick={() => setVisible(!visible)}>
            {props.day}
        </button>

        <CCollapse visible={visible}>
            <CCard>
            <CCardBody>
                <div className="dropdown-container">
                    <button className="day-btn" type="button" onClick={onAddBtnClick}>Add Meal for {props.day}</button>
                    {currentMealPlans}
                </div>
            </CCardBody>
            </CCard>
        </CCollapse>
        </div>
    );
}

export default MealPlan
