import React, { useState } from 'react';
import MealPlan from './MealPlan';

const MealPlanList = (props) => {
  const [visible, setVisible] = useState(false);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const mealPlansByDay = () => {
    return days.map((day) => {
        const plansForDay = (props.mealPlanList || []).filter((plan) => plan.day === day);
        return (
            <MealPlan 
            key={day} 
            day={day} 
            plans={plansForDay} 
            onAddMealPlan={props.onAddMealPlan}
            addMealToMealPlan={props.addMealToMealPlan}
            deleteSelectedMealPlanMeal={props.deleteSelectedMealPlanMeal}
            changeSelectedMealId={props.changeSelectedMealId}
            />
        );
    });
  };


  return (
    <>
      <div>
        {mealPlansByDay()}
      </div>
    </>
  )
}

export default MealPlanList;
