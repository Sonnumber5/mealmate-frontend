import React, { useState } from 'react';
import MealPlan from './MealPlan';

export const MealPlanList = () => {
  const [visible, setVisible] = useState(false);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  const mealPlans = (days).map((day) => (
    <MealPlan key={day} day={day}/>
  ));

  return (
    <>
      <div>
        {mealPlans}
      </div>
    </>
  )
}

export default MealPlanList;
