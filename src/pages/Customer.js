import { useEffect, useState } from "react";
import { create, deleteData, getAllData, update } from "../utils/Apiservice";
import { removeObject, updateObject } from "../utils/Common";
import { Link } from "react-router-dom";

function Customer() {
  const jwtToken = localStorage.getItem("jwtToken");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [customers, setCustomers] = useState(null);
  const [edit, setEdit] = useState(null);

  const customer = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    email: email,
    contactNo: contactNo,
  };

  useEffect(() => {
    getAllData("customers", jwtToken, setCustomers);
  }, []);

  function clearFields() {
    setFirstName("");
    setLastName("");
    setAddress("");
    setContactNo("");
    setEmail("");
  }
  function handleFirstName(event) {
    setFirstName(event.target.value);
  }
  function handleLastName(event) {
    setLastName(event.target.value);
  }
  function handleAddress(event) {
    setAddress(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handleContactNo(event) {
    setContactNo(event.target.value);
  }

  function createCustomer(event) {
    event.preventDefault();
    create(
      event,
      "customers",
      jwtToken,
      setCustomers,
      customers,
      customer,
      clearFields,
      setEdit
    );
  }
  function updateCustomers(updateCustomer) {
    updateObject(customers, updateCustomer, setCustomers);
  }
  function removeCustomers(id) {
    removeObject(id, customers, setCustomers);
  }

  function updateCustomer(event) {
    update(
      event,
      "customer",
      edit,
      jwtToken,
      customer,
      clearFields,
      updateCustomers,
      setEdit
    );
  }

  function deleteCustomer(event, id) {
    deleteData(event, "customer", id, jwtToken, removeCustomers);
  }

  return (
    <div>
      <Link className="home" to="/">
        Home
      </Link>
      {!edit && (
          <form className="form" onSubmit={createCustomer}>
          <h2>Create Customer</h2>
            <div>
              <label>First name</label>
              <br />
              <input
                type="text"
                value={firstName}
                required
                onChange={handleFirstName}
              ></input>
            </div>
            <div>
              <label>Last name</label>
              <br />
              <input
                type="text"
                required
                value={lastName}
                onChange={handleLastName}
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
                type="tel"
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
      )}
      {edit && (
          <form className="form" onSubmit={updateCustomer}>
          <h2>Update Customer</h2>
            <div>
              <label>First name</label>
              <br />
              <input
                type="text"
                required
                value={firstName !== null ? firstName : ""}
                onChange={handleFirstName}
              ></input>
            </div>
            <div>
              <label>Last name</label>
              <br />
              <input
                type="text"
                required
                value={lastName !== null ? lastName : ""}
                onChange={handleLastName}
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
      )}
      <table class="container">
        <h3>Customer List</h3>
        <tr class="responsive-table">
          <th class="col col-3">Name</th>
          <th class="col col-2">Address</th>
          <th class="col col-3">Email</th>
          <th class="col col-3">Contact No</th>
          <th class="col col-3">Action</th>
        </tr>
        {customers &&
          customers.map((customer) => (
            <tr id={customer.id}>
              <td>
                {customer.first_name} {customer.last_name}
              </td>
              <td>{customer.address}</td>
              <td>{customer.email}</td>
              <td>{customer.contact_no}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    setEdit(customer.id);
                    setFirstName(customer.first_name);
                    setLastName(customer.last_name);
                    setAddress(customer.address);
                    setEmail(customer.email);
                    setContactNo(customer.contact_no);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={(event) => deleteCustomer(event, customer.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}

export default Customer;
