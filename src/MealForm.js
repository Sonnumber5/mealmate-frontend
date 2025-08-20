import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dataSource from "./DataSource";
import './stylesheets/MealForm.css';

const MealForm = (props) => {
  const navigate = useNavigate();

  // Local state for form inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [mealIngredients, setMealIngredients] = useState([]);

  const isNewMeal = !props.meal;

  // Load existing meal if editing
  useEffect(() => {
    if (props.meal) {
      setName(props.meal.name);
      setDescription(props.meal.description);
      setMealIngredients(props.meal.mealIngredients || []);
      setCategoryId(String(props.meal.defaultCategoryId));
    }
  }, [props.meal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mealData = {
      name,
      description,
      defaultCategoryId: Number(categoryId),
      mealIngredients,
      mealId: props.meal ? props.meal.mealId : 0,
    };

    try {
      if (isNewMeal) {
        await dataSource.post("/meals", mealData);
      } else {
        await dataSource.put("/meals", mealData);
      }

      // Tell parent to reload meals / reset selection
      props.onSubmitMeal();
      navigate("/meals");
    } catch (err) {
      console.error("Error saving meal", err);
      alert("Failed to save meal. Check console for details.");
    }
  };

  const handleDelete = async () => {
    if (!props.meal) return;
    try {
      await dataSource.delete(`/meals/${props.meal.mealId}`);
      props.onSubmitMeal();
      navigate("/meals");
    } catch (err) {
      console.error("Error deleting meal", err);
      alert("Failed to delete meal.");
    }
  };

  const handleCancel = () => navigate("/meals");

  return (
    <div className="manage-meal-form">
      <div className="meal-form-group">
        <form onSubmit={handleSubmit}>
          <h1>{isNewMeal ? "Create Meal" : "Edit Meal"}</h1>

          <div className="meal-name">
            <label htmlFor="name">Meal name:</label>
            <input
              type="text"
              id="name"
              className=""
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="meal-description">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              className=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="meal-category">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              className=""
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="" disabled>Select a category</option>
              {props.categories?.map(cat => (
                <option key={cat.categoryId} value={String(cat.categoryId)}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary" type="submit">
            {isNewMeal ? "Create & Add Ingredients" : "Save Changes"}
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>

          {!isNewMeal && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </form>
      </div>
    </div> 
  );
};

export default MealForm;
