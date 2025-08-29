import React from "react";
import Meal from "./Meal";
import './stylesheets/MealList.css';
import { useNavigate } from "react-router-dom";

const MealList = (props) => {

  const meals = (props.mealList || []).map((meal) => (
    <Meal 
      key={meal.mealId}
      meal={meal} 
      changeSelectedMeal={props.changeSelectedMeal}
      changeSelectedMealId={props.changeSelectedMealId}
      mealOption={"meal"}
      addMealToMealPlan={props.addMealToMealPlan}
      selectedMealPlanDay={props.selectedMealPlanDay}
    />
  ));

  return (
    <div className="meal-list-container">
      {meals.length > 0 ? meals : <p>No meals available</p>}
    </div>
  );
};

export default MealList;
