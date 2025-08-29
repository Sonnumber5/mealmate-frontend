import React, { useState } from "react";
import { Link } from "react-router-dom";
import MealList from "./MealList";
import './stylesheets/MealSearch.css';
import './stylesheets/App.css';

const MealSearch = (props) => {
  const [searchParam, setSearchParam] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    await props.onSearch(searchParam);
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    await props.onCategoryChange(category);
  };

  if (props.mealLoading) return <p>Loading...</p>;

  return (
    <div className="main-content-meal-search">
      <div className="search-filters-section">
        <form className="filters-section" onSubmit={handleSearch}>
          <input
            className="search-bar"
            placeholder="Search meals..."
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <div className="filter-options">
            <select
              className="form-select"
              value={props.selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {props.categories?.map(cat => (
                <option key={cat.categoryId} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <button type="submit">Search</button>
          </div>
        </form>
        <Link to="/meals/create">
          <button type="button">Add Meal</button>
        </Link>
      </div>
      <MealList
        mealList={props.mealList}
        changeSelectedMeal={props.changeSelectedMeal}
        changeSelectedMealId={props.changeSelectedMealId}
        addMealToMealPlan={props.addMealToMealPlan}
        selectedMealPlanDay={props.selectedMealPlanDay}
      />
    </div>
  );
};

export default MealSearch;
