import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { create, getAllData } from "../utils/Apiservice";
import Category from "./Category";

function Item() {
  const unitsArr = ["kg", "litre", "milliliter", "g", "items"];
  const [name, setName] = useState("");
  const [units, setUnits] = useState(unitsArr[0]);
  const [quantity, setQuantity] = useState(0.0);
  const [unitPrice, setUnitPrice] = useState("");
  const [remarks, setRemarks] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [supplierId, setSupplierId] = useState(null);
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    getCategories();
    getSuppliers();
    getItems();
  }, []);

  const item = {
    name: name,
    units: units,
    quantity: quantity,
    unitPrice: unitPrice,
    supplier: supplier,
    category: category,
    remarks: remarks,
  };
  function handleName(event) {
    setName(event.target.value);
  }
  function handleUnits(event) {
    const selected = unitsArr.find(
      (unit) => unit.valueOf() === event.target.value
    );
    setUnits(selected);
  }
  function handleCategory(event) {
    setCategoryId(event.target.value);
    const selected = categories.find(
      (category) => category.id === parseInt(event.target.value)
    );
    console.log("category-", selected);
    setCategory(selected);
  }
  function handleUnitPrice(event) {
    setUnitPrice(event.target.value);
  }
  function handleSupplier(event) {
    console.log("event.target.value-", event.target.value);
    setSupplierId(event.target.value);
    console.log(suppliers);
    const selected = suppliers.find(
      (supplier) => supplier.id === parseInt(event.target.value)
    );
    console.log("supplier-", selected);
    setSupplier(selected);
  }
  function handleQuantity(event) {
    setQuantity(event.target.value);
  }
  function handleRemarks(event) {
    setRemarks(event.target.value);
  }

  function getCategories() {
    getAllData("categories", setCategories);
  }
  function getItems() {
    getAllData("items", setItems);
  }

  function getSuppliers() {
    getAllData("suppliers", setSuppliers);
  }
  function saveItem(event) {
    console.log("item***-", item);
    console.log("category**", category);
    console.log("supplier**", supplier);
    create(event, "items", setItems, items, item, clearFields, setEdit);
  }

  function clearFields() {
    setName("");
    setUnits(unitsArr[0]);
    setQuantity(0.0);
    setSupplier(supplier[0].name);
    setCategories(categories[0].description);
    setUnitPrice(0.0);
  }

  return (
    <div>
      <Link className="home" to="/">
        Home
      </Link>
      <form onSubmit={saveItem}>
        <label>Name</label>&emsp;
        <input type="text" value={name} required onChange={handleName}></input>
        <br />
        <label for="drpdwnSupplier" class="inline-label">
          Supplier
        </label>
        &emsp;
        <select id="drpdwnSupplier"  required onChange={handleSupplier}>
        <option value="">Select an option</option>
          {suppliers &&
            suppliers.map((supplier) => (
              <option value={supplier.id} key={supplier.id} selected={supplierId===supplier.id}>
                {supplier.name}
              </option>
            ))}
        </select>
        <br />
        <label for="drpdwnCategory" class="inline-label">
          Category
        </label>
        &emsp;
        <select
          id="drpdwnCategory"
          required
          onChange={handleCategory}
        >
          <option value="">Select an option</option>
          {categories &&
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.description}
              </option>
            ))}
        </select>
        <br />
        <label for="drpdwnUnits" class="inline-label">
          Units
        </label>
        &emsp;
        <select id="drpdwnUnits" required value={units} onChange={handleUnits}>
          {unitsArr.map((unit) => (
            <option value={unit}>{unit}</option>
          ))}
        </select>
        <br />
        <label>Quantity</label>&emsp;
        <input
          type="number"
          required
          value={quantity}
          onChange={handleQuantity}
        ></input>
        <br />
        <label>Unit Price (Rs.)</label>&emsp;
        <input
          type="number"
          required
          value={unitPrice}
          onChange={handleUnitPrice}
        ></input>
        <br />
        <label>Remarks</label>&emsp;
        <input
          type="text"
          required
          value={remarks}
          onChange={handleRemarks}
        ></input>
        <br />
        <button type="Submit">Save</button>&emsp;
        <button type="Submit" onClick={clearFields}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Item;
