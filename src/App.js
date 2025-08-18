import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import HomeScreen from "./HomeScreen";
import MealSearch from "./MealSearch";
import MealForm from "./MealForm";
import IngredientForm from "./IngredientForm";
import dataSource from "./DataSource";

function App() {
  const [mealList, setMealList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mealLoading, setMealLoading] = useState(true);
  const [ingredientsLoading, setIngredientsLoading] = useState(true);
  const [selectedMealIngredientsLoading, setSelectedMealIngredientsLoading] = useState(true);
  const [measurementsLoading, setMeasurementsLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedMealId, setSelectedMealId] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [selectedMealIngredients, setSelectedMealIngredients] = useState([]);

  // Load all meals
  const loadMeals = async () => {
    try {
      const response = await dataSource.get("/meals");
      setMealList(response.data);
      setMealLoading(false);
    } catch (err) {
      console.error("Error fetching meals", err);
      setMealLoading(false);
    }
  };

  // Load all ingredients
  const loadIngredients = async () => {
    try{
      const response = await dataSource.get("/ingredients");
      setIngredientsList(response);
      setIngredientsLoading(false);
    } catch(error){
      console.error("Error fetching ingredients", error);
      setIngredientsLoading(false);
    }
  };

  // Load ingredients for the selected meal
  const loadSelectedMealIngredients = async () => {
    try{
      const response = await dataSource.get(`/mealIngredients/${selectedMealId}`);
      setSelectedMealIngredients(response.data);
      setSelectedMealIngredientsLoading(false);
    } catch(error){
      console.error("Error fetching ingredients", error);
      setSelectedMealIngredientsLoading(false);
    }
  }

  // Load all measurements
  const loadMeasurements = async () => {
    try{
      const response = await dataSource.get("/measurements");
      setMeasurements(response.data);
      setMeasurementsLoading(false);
    } catch(error){
      console.error("Error fetching measurements", error);
      setMeasurementsLoading(false);
    }
  }

  // Load all categories
  const loadCategories = async () => {
    try {
      const response = await dataSource.get("/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  // Search meals by text
  const searchMeals = async (query) => {
    if (!query) {
      await loadMeals();
      return;
    }
    try {
      const response = await dataSource.get(`/meals/search/${query}`);
      setMealList(response.data);
    } catch (err) {
      console.error("Error searching meals", err);
    }
  };

  // Filter meals by category
  const filterMealsByCategory = async (category) => {
    setSelectedCategory(category);
    if (!category) {
      await loadMeals();
      return;
    }
    try {
      const response = await dataSource.get(`/meals/category/${category}`);
      setMealList(response.data);
    } catch (err) {
      console.error("Error filtering meals by category", err);
    }
  };

  // Handle meal form submission
  const onSubmitMeal = async () => {
    await loadMeals();
    setSelectedMeal(null);
  };

  const onSubmitIngredients = async () => {
    await loadIngredients();
    await loadMeals();
    await loadSelectedMealIngredients();
  }

  const changeSelectedMeal = (meal, navigate) => {
    setSelectedMeal(meal);
    navigate("/meals/edit");
  };

  const changeSelectedMealId = (mealId, navigate) => {
    setSelectedMealId(mealId);

    navigate("/meals/ingredients/manage");
  };

  useEffect(() => {
    loadCategories();
    loadMeals();
    loadIngredients();
    loadMeasurements();
  }, []);

  useEffect(() => {
    loadSelectedMealIngredients();
  }, [selectedMealId]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/meals"
          element={
            <MealSearch
              mealList={mealList}
              mealLoading={mealLoading}
              selectedCategory={selectedCategory}
              categories={categories}
              changeSelectedMeal={changeSelectedMeal}
              changeSelectedMealId={changeSelectedMealId}
              onCategoryChange={filterMealsByCategory}
              onSearch={searchMeals}
            />
          }
        />
        <Route
          path="/meals/create"
          element={
            <MealForm
              categories={categories}
              onSubmitMeal={onSubmitMeal}
            />
          }
        />
        <Route
          path="/meals/edit"
          element={
            <MealForm
              meal={selectedMeal}
              categories={categories}
              onSubmitMeal={onSubmitMeal}
            />
          }
        />
        <Route
          path="/meals/ingredients/manage"
          element={<IngredientForm selectedMealIngredients={selectedMealIngredients} onSubmitIngredients={onSubmitIngredients} measurements={measurements} mealId={selectedMealId} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
