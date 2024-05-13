import axios from "axios";
import { useEffect, useState } from "react";
import { create, deleteData, getAllData, update } from "../utils/Apiservice";
import { removeObject, updateObject } from "../utils/Common";
import { Link } from "react-router-dom";

function Category() {
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState(null);
  const [edit, setEdit] = useState(null);

  const category = {
    description: description,
  };

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    getAllData("categories", setCategories);
  }

  function clearFields() {
    setDescription("");
  }

  function handleDescription(event) {
    setDescription(event.target.value);
  }
  function createCategory(event) {
    event.preventDefault();
    create(
      event,
      "categories",
      setCategories,
      categories,
      category,
      clearFields,
      setEdit
    );
  }

  function updateCategories(updateCategory) {
    updateObject(categories, updateCategory, setCategories);
  }
  function removeCategories(id) {
    removeObject(id, categories, setCategories);
  }

  function updateCategory(event) {
    update(
      event,
      "user",
      edit,
      category,
      clearFields,
      updateCategories,
      setEdit
    );
  }

  function deleteUser(event, id) {
    deleteData(event, "category", id, removeCategories);
  }

  return (
    <div>
      {!edit && (
        <div>
          <h2>Create Category</h2>
          <Link className="home" to="/">
            Home
          </Link>
          <form className="form" onSubmit={createCategory}>
            <div>
              <label>Description</label>
              <br />
              <input
                type="text"
                value={description}
                required
                onChange={handleDescription}
              ></input>
            </div>
            <button type="submit">Save</button>&emsp;
            <button type="submit" onClick={clearFields}>
              Clear
            </button>
          </form>
        </div>
      )}
      {edit && (
        <div>
          <h2>Update Category</h2>
          <Link className="home" to="/">
            Home
          </Link>
          <form className="form" onSubmit={updateCategory}>
            <div>
              <label>Description</label>
              <br />
              <input
                type="text"
                value={description !== null ? description : ""}
                required
                onChange={handleDescription}
              ></input>
            </div>
            <br />
            <button type="submit">Update</button>
            &emsp;
            <button type="submit" onClick={() => setEdit(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
      <table>
        <h2>Categories</h2>
      </table>
      <tr class="responsive-table">
        <th class="col col-3">Description</th>
      </tr>
      {categories && categories.map((category)=>(
        <tr id={category.id}>
            <td>{category.description}</td>
            <td>
                <button 
                type="button"
                class="btn btn-primary"
                onClick={()=>{
                    setEdit(category.id);
                    setDescription(category.description);
                }}>
                    Edit
                </button>
            </td>
            <td
            type="button"
            class="btn btn-danger"
            onClick={(event) => deleteUser(event, category.id)}>
                Delete
            </td>
        </tr>
      ))}
    </div>
  );
}

export default Category;
