import React, {useState} from "react"; 
import { useNavigate } from "react-router-dom";
import dataSource from './DataSource';
import './stylesheets/IngredientForm.css';

const IngredientForm = (props) => {
    const [name, setName] = useState("");
    const [qty, setQty] = useState("");
    const [measurementId, setMeasurementId] = useState("");
    const [measurement, setMeasurement] = useState("");
    const [currentIngredients, setCurrentIngredients] = useState([]);

    let newIngredients = (currentIngredients || []).map((ingredient) => (
        <div key={ingredient.ingredientId}>
            <p>
                <i>x{ingredient.qty} {ingredient.measurement}:</i> <b>{ingredient.name}</b>
            </p>
            <button onClick={() => handleRemoveIngredient(ingredient.ingredientId, false)} className="">Remove</button>
        </div>
    ));

    let existingIngredients = (props.selectedMealIngredients || []).map((ingredient) => (
        <div key={ingredient.ingredientId}>
            <p>
                <i>x{ingredient.qty} {ingredient.measurement}:</i> <b>{ingredient.ingredient}</b>
            </p>
            <button onClick={() => handleRemoveIngredient(ingredient.ingredientId, true)} className="">Remove</button>
        </div>
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
            measurement,
            measurementId
        }
        setCurrentIngredients([...currentIngredients, ingredientToAdd]);
        setName("");
        setQty("");
        setMeasurement("");
        setMeasurementId("");
    }

    const handleSelectMeasurement = (e) => {
        e.preventDefault();
        
        const selectedMeasurementId = e.target.value;

        setMeasurementId(selectedMeasurementId);
        const selectedMeasurement = props.measurements.find(m => String(m.measurementId) === selectedMeasurementId);
        setMeasurement(selectedMeasurement?.measurement || "");
    }

    const handleSubmitAllIngredients = async () => {
        if (currentIngredients.length === 0) {
            navigate("/meals");
            return;
        }
        try{
            for (let ingredientData of currentIngredients){
                ingredientData.name = ingredientData.name.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
                await dataSource.post("/mealIngredients", ingredientData);
            }
            props.onSubmitIngredients();
            navigate("/meals");
        }catch (error) {
            console.error("Error saving ingredient", error);
            alert("Failed to save ingredient. Check console for details.");
        }
    };

    const handleRemoveIngredient = async (ingredientId, isExisting) => {
        if (isExisting){
            try{
                await dataSource.delete(`/mealIngredients/${props.mealId}/${ingredientId}`);
                props.onSubmitIngredients();
            }catch (error) {
                console.error("Error removing ingredient", error);
                alert("Failed to remove ingredient. Check console for details.");
            }
        } else {
            setCurrentIngredients(previousState => previousState.filter(ingredient => ingredient.ingredientId !== ingredientId));
        };
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
                    required
                    />
                </div>

                <div className="">
                <label htmlFor="measurementId">Measurement:</label>
                <select
                    id="measurementId"
                    className="measurement-input"
                    value={measurementId}
                    onChange={handleSelectMeasurement}
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
        <button className="btn btn-primary" onClick={handleSubmitAllIngredients}>Update Ingredients</button>
        <button className="btn btn-secondary" onClick={() => {navigate("/meals")}}>Cancel</button>
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