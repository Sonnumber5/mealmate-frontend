import React from "react";
import './stylesheets/Meal.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Meal = (props) => {

    const ingredients = (props.meal.mealIngredients || []).map((mealIngredient) => {
        return (
            <p key={mealIngredient.ingredientId}>
                <em>x{mealIngredient.qty} {mealIngredient.measurement}: </em>
                <b>{mealIngredient.ingredient}</b>
            </p>
        );
    });

    let navigate = useNavigate();

    const handleSelectedMeal = () => {
        props.changeSelectedMeal(props.meal, navigate);
    }

    const handleSelectedMealId = () => {
        props.changeSelectedMealId(props.meal.mealId, navigate);
    }
    

    return (
        <>
            <div className="meal-container">
                <div className="section-1">
                    <p className="meal-header">
                        {props.meal.name}
                    </p>
                </div >
                <div className="section-2">
                    <button type="button" className="detail-button" onClick={handleSelectedMealId}>Manage Ingredients</button>
                    <button type="button" className="detail-button edit-btn" onClick={handleSelectedMeal}>Edit</button>
                </div>
                <div className="section-3">
                    <p>{props.meal.description}</p>
                </div>
                <div className="section-4">
                    {ingredients}
                </div>
            </div>
        </>
    );
};

export default Meal;