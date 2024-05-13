import axios from "axios";
import { useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { create, deleteData, getAllData, update } from "../utils/Apiservice";
import config from "../utils/Config";
import { removeObject, updateObject } from "../utils/Common";

function Supplier() {
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState(null);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [suppliers, setSuppliers] = useState(null);
  const [edit, setEdit] = useState(null);

  const supplier = {
    name: name,
    contactNo: contactNo,
    address: address,
    email: email,
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  function getSuppliers() {
    getAllData("suppliers", setSuppliers);
  }

  function handleName(event) {
    setName(event.target.value);
  }
  function handleContactNo(event) {
    setContactNo(event.target.value);
  }
  function handleAddress(event) {
    setAddress(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function clearFields() {
    setName("");
    setAddress("");
    setContactNo("");
    setEmail("");
  }

  function updateSuppliers() {
    updateObject(edit, suppliers, setSuppliers);
  }

  function removeSuppliers() {
    removeObject(edit, suppliers, setSuppliers);
  }

  function createSupplier(event) {
    create(
      event,
      "suppliers",
      setSuppliers,
      suppliers,
      supplier,
      clearFields,
      setEdit
    );
  }
  function updateSupplier(event) {
    update(
      event,
      "supplier",
      edit,
      supplier,
      clearFields,
      updateSuppliers,
      setEdit
    );
  }

  function deleteUser(event, id) {
    deleteData(event, "user", id, removeSuppliers);
  }

  return (
    <div>
      <div>
        <Link className="home" to="/">
          Home
        </Link>
        {!edit && (
          <>
            <h2>Create Supplier</h2>
            <form className="form" onSubmit={createSupplier}>
              <div>
                <label>Name</label>
                <br />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleName}
                ></input>
              </div>
              <div>
                <label>Address</label>
                <br />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={handleAddress}
                ></input>
              </div>
              <div>
                <label>Email</label>
                <br />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={handleEmail}
                ></input>
              </div>
              <div>
                <label>Contact No</label>
                <br />
                <input
                  type="text"
                  required
                  value={contactNo}
                  onChange={handleContactNo}
                ></input>
              </div>
              <br />
              <button type="submit">Save</button>&emsp;
              <button type="submit" onClick={clearFields}>
                Clear
              </button>
            </form>
          </>
        )}
        {edit && (
          <>
            <h2>Update Supplier</h2>
            <form className="form" onSubmit={updateSupplier}>
              <div>
                <label>Name</label>
                <br />
                <input
                  type="text"
                  required
                  value={name !== null ? name : ""}
                  onChange={handleName}
                ></input>
              </div>
              <div>
                <label>Address</label>
                <br />
                <input
                  type="text"
                  required
                  value={address !== null ? address : ""}
                  onChange={handleAddress}
                ></input>
              </div>
              <div>
                <label>Email</label>
                <br />
                <input
                  type="email"
                  required
                  value={email !== null ? email : ""}
                  onChange={handleEmail}
                ></input>
              </div>
              <div>
                <label>Contact No</label>
                <br />
                <input
                  type="tel"
                  required
                  value={contactNo !== null ? contactNo : ""}
                  onChange={handleContactNo}
                ></input>
              </div>
              <br />
              <button type="submit">Update</button>
              &emsp;
              <button type="submit" onClick={() => setEdit(null)}>
                Cancel
              </button>
            </form>
          </>
        )}
        <table class="container">
          <h2>Suppliers</h2>
          <tr class="responsive-table">
            <th class="col col-3">Company Name</th>
            <th class="col col-2">Address</th>
            <th class="col col-3">Email</th>
            <th class="col col-3">Contact No</th>
          </tr>
          {suppliers &&
            suppliers.map((supplier) => (
              <tr id={supplier.id}>
                <td>{supplier.name}</td>
                <td>{supplier.address}</td>
                <td>{supplier.email}</td>
                <td>{supplier.contact_no}</td>
                {console.log("supplier:", supplier)}
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => {
                      setEdit(supplier.id);
                      setName(supplier.name);
                      setAddress(supplier.address);
                      setEmail(supplier.email);
                      setContactNo(supplier.contact_no);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={(event) => deleteUser(event, supplier.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}

export default Supplier;
