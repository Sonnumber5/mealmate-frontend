import React from "react";
import './stylesheets/HomeScreen.css';
import { Link } from "react-router-dom";
import MealPlanList from "./MealPlanList";

const HomeScreen = (props) => {
    return (
        <div className="main-home-content">
            <div className="left-side">
                <MealPlanList/>
            </div>
            <div className="right-side">
                <Link to='/meals'>
                    <button className="view-meals-btn">All Meals</button>
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