import React from "react";
import './stylesheets/Meal.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Meal = (props) => {
    //used to display or hide the `confirm delete` button when delete button is pressed
    const [confirmDeleteMealPlan, setConfirmDeleteMealPlan] = useState(false);

    //formats all the ingredients in each meal in a format that is easier to read
    const ingredients = (props.meal.mealIngredients || []).map((mealIngredient) => {
        return (
            <p className="ingredients-list-element" key={mealIngredient.ingredientId}>
                <em>x{mealIngredient.qty} {mealIngredient.measurement}: </em>
                <b>{mealIngredient.ingredient}</b>
            </p>
        );
    });

    let navigate = useNavigate();

    //changeSelectedMeal is passed down from App.js to br used here. 
    //Sets the currently selected meal in the root of the app in order to retrieve the selected Meal's ingredients
    const handleSelectedMeal = () => {
        props.changeSelectedMeal(props.meal, navigate);
    }

    const handleSelectedMealId = () => {
        props.changeSelectedMealId(props.meal.mealId, navigate);
    }

    const handleDeleteSelectedMealPlanMeal = () => {
        props.deleteSelectedMealPlanMeal(props.mealPlanId);
    }

    const handleConfirmDeleteMealPlan = () => {
        setConfirmDeleteMealPlan(true);
    }

    const handleCancelDeleteMealPlan = () => {
        setConfirmDeleteMealPlan(false);
    }

    const handleAddMealToMealPlan = () => {
        props.addMealToMealPlan(props.meal.mealId, props.selectedMealPlanDay);
        navigate("/");
    }

    const populateMealButtons = () => {
        if (props.mealOption === "meal" && props.selectedMealPlanDay === ""){
            return (
                <>
                    <button type="button" className="detail-button" onClick={handleSelectedMealId}>Manage Ingredients</button>
                    <button type="button" className="detail-button edit-btn" onClick={handleSelectedMeal}>Edit</button>
                </>
            )
        } else if (props.mealOption === "mealPlan"){
            if (confirmDeleteMealPlan){
                return (
                    <>
                        <button type="button" className="detail-button" onClick={handleDeleteSelectedMealPlanMeal}>Confirm</button>
                        <button type="button" className="detail-button" onClick={handleCancelDeleteMealPlan}>Cancel</button>
                    </>
                )
            } else{
                return (
                    <>
                        <button type="button" className="detail-button" onClick={handleSelectedMealId}>Manage Ingredients</button>
                        <button type="button" className="detail-button" onClick={handleConfirmDeleteMealPlan}>Remove from {props.day}</button>
                    </>
                )
            }
        } else if (props.selectedMealPlanDay !== ""){
            return (
                <>
                    <button type="button" className="detail-button" onClick={handleSelectedMealId}>Manage Ingredients</button>
                    <button type="button" className="detail-button" onClick={handleAddMealToMealPlan}>Add</button>
                </>
            )
        }
    }
    

    return (
        <>
        <div className="meal-container">
            <div className="meal-content">
                <div className="section-1">
                    <p className="meal-header">
                        {props.meal.name}
                    </p>
                </div >
                <div className="section-2">
                    {populateMealButtons()}
                </div>
                <div className="section-3">
                    <p className="meal-description-element">{props.meal.description}</p>
                </div>
                <div className="section-4">
                    {ingredients}
                </div>
            </div>
        </div>
            
        </>
    );
};

export default Meal;