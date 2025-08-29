import React, {useState, useEffect} from "react";
import './stylesheets/HomeScreen.css';
import { Link } from "react-router-dom";
import MealPlanList from "./MealPlanList";
import dataSource from "./DataSource";

const HomeScreen = (props) => {

    const mealPlansElement = () => {
        if (props.mealPlanListLoading){
            return (
                <p>Loading...</p>
            );
        } else{
            return (
                <MealPlanList 
                mealPlanList={props.mealPlanList} 
                addMealToMealPlan={props.addMealToMealPlan}
                deleteSelectedMealPlanMeal={props.deleteSelectedMealPlanMeal}
                onAddMealPlan={props.onAddMealPlan}
                changeSelectedMealId={props.changeSelectedMealId}
                />
            );
        }
    }

    const onAllMealsClick = () => {
        props.onAllMealsClick();
    }


    return (
        <div className="main-home-content">
            <div className="left-side">
                {mealPlansElement()}
            </div>
            <div className="right-side">
                <Link to='/meals'>
                    <button onClick={onAllMealsClick} className="view-meals-btn">All Meals</button>
                </Link>
                <div className="grocery-list-container">
                    <div className="grocery-list-menu">
                        <div>
                        <p>Grocery List</p>
                        </div>
                        <div className="add-item">
                            <button className="add-item-btn">+</button>
                        </div>
                    </div>
                    <div className="grocery-list">
                        <ul>
                            <li>
                                test
                            </li>
                            <li>
                                test
                            </li>
                            <li>
                                test
                            </li>
                            <li>
                                test
                            </li>
                            <li>
                                test
                            </li>
                            <li>
                                test
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;