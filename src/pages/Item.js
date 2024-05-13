import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { getAllData } from "../utils/Apiservice";
import Category from "./Category";

function Item() {
  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitprice, setUnitprice] = useState("");
  const [categories,setCategories]=useState(null);
  const [suppliers,setSuppliers]=useState(null);

  useEffect(()=>{
    getCategories();
    getSuppliers();
  },[])

  function getCategories() {
    getAllData("categories",setCategories);
  }

  function getSuppliers() {
    getAllData("suppliers",setSuppliers);
  }

  return (
    <div>
      <Link className="home" to="/">
        Home
      </Link>
      <form>
        <label>Name</label>&emsp;
        <input type="text" required></input>
        <br />
        <label for="dropdown" class="inline-label">
          Supplier
        </label>&emsp;
        {console.log("suppliers",suppliers)}
        <select id="dropdown">
           {suppliers && suppliers.map((supplier)=>(
                <option value={supplier.name} id={supplier.id}>{supplier.name}</option>
           ))} 
        </select>
        <br />
        <label for="dropdown" class="inline-label">
          Description
        </label>&emsp;
        <select id="dropdown">
           {categories && categories.map((category)=>(
                <option value={category.description} id={category.id}>{category.description}</option>
           ))} 
        </select>
        <br />
        <label for="dropdown" class="inline-label">
          Units
        </label>&emsp;
        <select id="dropdown">
                <option value="kg">kg</option>
                <option value="litre">litre</option>
                <option value="milliliter">milliliter</option>
                <option value="g">g</option>
                <option value="items">items</option>
        </select>
        <br/>
        <label>Quantity</label>&emsp;
        <input type="text" required></input>
        <br />
        <label>Unit Price (Rs.)</label>&emsp;
        <input type="text" required></input>
        <br />
      </form>
    </div>
  );
}

export default Item;
