import { useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { create, deleteData, getAllData, update } from "../utils/Apiservice";
import { removeObject, updateObject } from "../utils/Common";
function Users() {
  const jwtToken = localStorage.getItem("jwtToken");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState(null);
  const [edit, setEdit] = useState(null);

  const user = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    email: email,
    contactNo: contactNo,
    username: username,
    password: password,
  };

  useEffect(() => {
    getAllData("users", jwtToken, setUsers);
  }, []);

  function clearFields() {
    setFirstName("");
    setLastName("");
    setAddress("");
    setContactNo("");
    setEmail("");
    setUsername("");
    setPassword("");
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
  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function createUser(event) {
    event.preventDefault();
    create(
      event,
      "users",
      jwtToken,
      setUsers,
      users,
      user,
      clearFields,
      setEdit
    );
  }
  function updateUsers(updateUser) {
    updateObject(users, updateUser, setUsers);
  }
  function removeUsers(id) {
    removeObject(id, users, setUsers);
  }

  function updateUser(event) {
    update(
      event,
      "user",
      edit,
      jwtToken,
      user,
      clearFields,
      updateUsers,
      setEdit
    );
  }

  function deleteUser(event, id) {
    deleteData(event, "user", id, jwtToken, removeUsers);
  }

  return (
    <div>
      <Link className="home" to="/">
        Home
      </Link>
      {!edit && (
          <form className="form" onSubmit={createUser}>
            <h2>Create User</h2>
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
                placeholder="email@example.com"
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
            <div>
              <label>Username</label>
              <br />
              <input
                type="text"
                required
                value={username}
                onChange={handleUsername}
              ></input>
            </div>
            <div>
              <label>password</label>
              <br />
              <input
                type="password"
                required
                value={password}
                onChange={handlePassword}
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

          <form className="form" onSubmit={updateUser}>
            <h2>Update User</h2>
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
            <div>
              <label>Username</label>
              <br />
              <input
                type="text"
                required
                value={username !== null ? username : ""}
                onChange={handleUsername}
              ></input>
            </div>
            <div>
              <label>password</label>
              <br />
              <input type="password" required onChange={handlePassword}></input>
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
        <h3>Users</h3>
        <tr class="responsive-table">
          <th class="col col-3">Name</th>
          <th class="col col-2">Address</th>
          <th class="col col-3">Email</th>
          <th class="col col-3">Contact No</th>
          <th class="col col-3">Username</th>
          <th class="col col-3">Action</th>
        </tr>
        {users &&
          users.map((user) => (
            <tr id={user.id}>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.contact_no}</td>
              <td>{user.username}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    setEdit(user.id);
                    setFirstName(user.first_name);
                    setLastName(user.last_name);
                    setAddress(user.address);
                    setEmail(user.email);
                    setContactNo(user.contact_no);
                    setUsername(user.username);
                    setPassword(user.password);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={(event) => deleteUser(event, user.id)}
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
export default Users;
