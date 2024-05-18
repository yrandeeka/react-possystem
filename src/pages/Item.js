import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { create, deleteData, getAllData, update } from "../utils/Apiservice";
import Category from "./Category";
import { removeObject, updateObject } from "../utils/Common";

function Item() {
  const unitsArr = ["kg", "litre", "milliliter", "g", "items"];
  const [name, setName] = useState("");
  const [itemId, setItemId] = useState("");
  const [units, setUnits] = useState(unitsArr[0]);
  const [quantity, setQuantity] = useState(0.0);
  const [unitPrice, setUnitPrice] = useState(0.0);
  const [remarks, setRemarks] = useState("");
  const [status, setStatus] = useState("");
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
    status:status
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
    setStatus("stock in");
    create(event, "items", setItems, items, item, clearFields, setEdit);
  }
  function updateItems(updateItem) {
    updateObject(items, updateItem, setItems);
  }
  function updateItem(event) {
    update(event, "item", edit, item, clearFields, updateItems, setEdit);
  }

  function clearFields() {
    setName("");
    setUnits(unitsArr[0]);
    setQuantity(0.0);
    setSupplierId(null);
    setCategoryId(null);
    setCategory([]);
    setSupplier([]);
    setStatus("");
    setUnitPrice(0.0);
    setRemarks("");
  }

  function statusItem(event,itemSts,status) {
    console.log("itemSts-",itemSts);
    setStockStatus(itemSts,status);
    console.log("after update item-",item);
    update(event, "item/status", itemId, item, clearFields, updateItems, setEdit);
  }

  function setStockStatus(itemOld,statusNew) {
    setItemId(itemOld.id);
    setName(itemOld.name);
    setCategory(itemOld.category);
    setStatus(statusNew);
    setSupplier(itemOld.supplier);
    setQuantity(itemOld.quantity);
    setUnits(itemOld.units);
    setUnitPrice(itemOld.unitPrice);
  }

  return (
    <div>
      <Link className="home" to="/">
        Home
      </Link>
      {!edit && (
        <form className="form" onSubmit={saveItem}>
          <h2>Add Item</h2>
          <div>
            <label>Name</label>&emsp;
            <input
              type="text"
              value={name}
              required
              onChange={handleName}
            ></input>
          </div>
          <br />
          <div>
            <label for="drpdwnSupplier" class="inline-label">
              Supplier
            </label>
            &emsp;
            <select id="drpdwnSupplier" required onChange={handleSupplier}>
              <option value="">Select an option</option>
              {suppliers &&
                suppliers.map((supplier) => (
                  <option value={supplier.id} key={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <label for="drpdwnCategory" class="inline-label">
              Category
            </label>
            &emsp;
            <select id="drpdwnCategory" required onChange={handleCategory}>
              <option value="">Select an option</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.description}
                  </option>
                ))}
            </select>
          </div>
          <br />
          <div>
            <label for="drpdwnUnits" class="inline-label">
              Units
            </label>
            &emsp;
            <select
              id="drpdwnUnits"
              required
              value={units}
              onChange={handleUnits}
            >
              {unitsArr.map((unit) => (
                <option value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          <br />
          <div>
            <label>Add Quantity</label>&emsp;
            <input
              type="number"
              required
              value={quantity}
              onChange={handleQuantity}
            ></input>
          </div>
          <br />
          <div>
            <label>Unit Price (Rs.)</label>&emsp;
            <input
              type="number"
              required
              value={unitPrice}
              onChange={handleUnitPrice}
            ></input>
          </div>
          <br />
          <div>
            <label>Remarks</label>&emsp;
            <input
              type="text"
              required
              value={remarks}
              onChange={handleRemarks}
            ></input>
          </div>
          <br />
          <div>
            <button type="Submit">Save</button>&emsp;
            <button type="button" onClick={clearFields}>
              Cancel
            </button>
          </div>
        </form>
      )}
      {edit && (
        <div>
          <form className="form" onSubmit={updateItem}>
            <h2>Update Item</h2>
            <div>
              <label>Name</label>&emsp;
              <input
                type="text"
                required
                value={name !== null ? name : ""}
                onChange={handleName}
              ></input>
            </div>
            <br />
            <div>
              <label for="drpdwnSupplier" class="inline-label">
                Supplier
              </label>
              &emsp;
              <select id="drpdwnSupplier" required onChange={handleSupplier}>
                <option value={supplier && supplier.id}>
                  {supplier && supplier.name}
                </option>
                {suppliers &&
                  suppliers.map((supplier) => (
                    <option value={supplier.id} key={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
              </select>
            </div>
            <br />
            <div>
              <label for="drpdwnCategory" class="inline-label">
                Category
              </label>
              &emsp;
              <select id="drpdwnCategory" required onChange={handleCategory}>
                <option value={category && category.id}>
                  {category && category.description}
                </option>
                {categories &&
                  categories.map((categoryOp) => (
                    <option key={categoryOp.id} value={categoryOp.id}>
                      {categoryOp.description}
                    </option>
                  ))}
              </select>
            </div>
            <br />
            <div>
              <label for="drpdwnUnits" class="inline-label">
                Units
              </label>
              &emsp;
              <select
                id="drpdwnUnits"
                required
                value={units}
                onChange={handleUnits}
              >
                {unitsArr.map((unit) => (
                  <option value={unit}>{unit}</option>
                ))}
              </select>
            </div>
            <br />
            <div>
              <label>Add Quantity</label>&emsp;
              <input
                type="number"
                required
                value={quantity}
                onChange={handleQuantity}
              ></input>
            </div>
            <br />
            <div>
              <label>Unit Price (Rs.)</label>&emsp;
              <input
                type="number"
                required
                value={unitPrice}
                onChange={handleUnitPrice}
              ></input>
            </div>
            <br />
            <div>
              <label>Remarks</label>&emsp;
              <input
                type="text"
                required
                value={remarks}
                onChange={handleRemarks}
              ></input>
            </div>
            <br />
            <div>
              <button type="Submit">Update</button>&emsp;
              <button
                type="Button"
                onClick={() => {
                  clearFields();
                  setEdit(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <table class="container">
        <h2>Items Stock-IN</h2>
        <tr class="responsive-table">
          <th class="col col-3">Item</th>
          <th class="col col-2">Category</th>
          <th class="col col-3">Supplier</th>
          <th class="col col-2">Quantity</th>
          <th class="col col-3">Unit Price(Rs.)</th>
          <th class="col col-3">Action</th>
        </tr>
        {items &&
          items.filter(item=>item.status.includes("stock in")).map((item) => (
            <tr id={item.id}>
              <td>{item.name}</td>
              <td>{item.category.description}</td>
              <td>{item.supplier.name}</td>
              <td>{`${item.quantity} ${item.units}`}</td>
              <td>{item.unitPrice}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    setEdit(item.id);
                    setName(item.name);
                    setCategory(item.category);
                    setSupplier(item.supplier);
                    setQuantity(item.quantity);
                    setUnits(item.units);
                    setUnitPrice(item.unitPrice);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={(event) =>statusItem(event,item,"stock out")}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
      </table>
      <table class="container">
        <h2>Items Stock-OUT</h2>
        <tr class="responsive-table">
          <th class="col col-3">Item</th>
          <th class="col col-2">Category</th>
          <th class="col col-3">Supplier</th>
          <th class="col col-2">Quantity</th>
          <th class="col col-3">Unit Price(Rs.)</th>
          <th class="col col-3">Action</th>
        </tr>
        {items &&
          items.filter(item=>item.status.includes("stock out")).map((item) => (
            <tr id={item.id}>
              <td>{item.name}</td>
              <td>{item.category.description}</td>
              <td>{item.supplier.name}</td>
              <td>{`${item.quantity} ${item.units}`}</td>
              <td>{item.unitPrice}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    setEdit(item.id);
                    setName(item.name);
                    setCategory(item.category);
                    setSupplier(item.supplier);
                    setQuantity(item.quantity);
                    setUnits(item.units);
                    setUnitPrice(item.unitPrice);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={(event) =>statusItem(event,item,"stock in")}
                >
                  Return
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}

export default Item;
