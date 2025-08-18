import React, {useState} from "react"; 
import { useNavigate } from "react-router-dom";
import dataSource from './DataSource';
import './stylesheets/IngredientForm.css';

const IngredientForm = (props) => {
    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [measurementId, setMeasurementId] = useState("");
    const [currentIngredients, setCurrentIngredients] = useState([]);

    let newIngredients = (currentIngredients || []).map((ingredient) => (
        <>
            <p key={ingredient.ingredientId}>{ingredient.name} - {ingredient.qty} - {ingredient.measurement}</p>
            <button className="">Remove</button>
        </>
    ));

    let existingIngredients = (props.selectedMealIngredients || []).map((ingredient) => (
        <>
            <p key={ingredient.ingredientId}>{ingredient.ingredient} - {ingredient.qty}</p>
            <button className="">Remove</button>
        </>
    ));

    let navigate = useNavigate();

    const handleAddIngredientToList = (e) => {
        e.preventDefault();
        if (!name || !qty || !measurementId){
            return;
        }
        let ingredientToAdd = {
            mealId: props.mealId,
            name,
            qty,
            measurementId
        }
        setCurrentIngredients([...currentIngredients, ingredientToAdd]);
        setName("");
        setQty("");
        setMeasurementId("");
    }

    const handleSubmitAllIngredients = async () => {
        if (currentIngredients.length === 0) {
            alert("Add at least one ingredient before submitting.");
            return;
        }
        try{
            for (let ingredientData of currentIngredients){
                await dataSource.post("/mealIngredients", ingredientData);
            }
            props.onSubmitIngredients();
            navigate("/meals");
        }catch (error) {
            console.error("Error saving meal", error);
            alert("Failed to save ingredient. Check console for details.");
        }
    };
    
    return(
        <>
        <div className="ingredients-group">
            <form className="ingredient-form" onSubmit={handleAddIngredientToList}>
                <div className="">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    className="name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>

                <div className="">
                <label htmlFor="qty">Quantity:</label>
                <input
                    type="number"
                    id="qty"
                    className="qty-input"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    min="0"
                    step="0.1"
                    />
                </div>

                <div className="">
                <label htmlFor="measurementId">Measurement:</label>
                <select
                    id="measurementId"
                    className="measurement-input"
                    value={measurementId}
                    onChange={(e) => setMeasurementId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a measurement</option>
                    {props.measurements?.map(measurement => (
                    <option key={measurement.measurementId} value={String(measurement.measurementId)}>
                        {measurement.measurement}
                    </option>
                    ))}
                </select>
                </div>

                <button className="btn btn-primary" type="submit" onClick={handleAddIngredientToList}>
                Add
                </button>
            </form>
        </div>
        {existingIngredients}
        {newIngredients}
        <button className="btn btn-secondary" onClick={handleSubmitAllIngredients}>Add Ingredients</button>
        </>
    );
    /*
    return(
        <>
        <p>{props.mealId}</p>
        <div align="center">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="name">Ingredient:</label>
                <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>

                <div className="form-group">
                <label htmlFor="qty">Quantity:</label>
                <input
                    type="text"
                    id="qty"
                    className="form-control"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                />
                </div>

                <div className="form-group">
                <label htmlFor="measurementId">Measurement:</label>
                <select
                    id="measurementId"
                    className="form-select"
                    value={measurementId}
                    onChange={(e) => setMeasurementId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a measurement</option>
                    {props.measurements?.map(measurement => (
                    <option key={measurement.measurementId} value={String(measurement.measurementId)}>
                        {measurement.measurement}
                    </option>
                    ))}
                </select>
                </div>

                <button className="btn btn-primary" type="submit">
                Add Ingredients
                </button>
            </form>
        </div>
        </>
    );
    */
};

export default IngredientForm;