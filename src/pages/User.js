import { useEffect, useState } from "react";
import "../pages/User.css";
import axios from "axios";
function Users() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState(null);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function getUsers(){
    axios.get("http://localhost:8080/users")
    .then(function(response){
      console.log("response-",response.data);
      setUsers(response.data);
    })
    .catch(function(error){
      console.log("error-",error);
    })
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

    const user = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      contactNo: contactNo,
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:8080/users", user)
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
        setEdit(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateUser(event) {
    event.preventDefault();

    const user = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      contactNo: contactNo,
      username: username,
      password: password,
    };

    axios.put("http://localhost:8080/user/"+edit,user)
    .then(function (response) {
      console.log(response.data);
      setUsers(response);
      setEdit(null);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function deleteUser(event,id) {
    event.preventDefault();

    axios.delete("http://localhost:8080/user/"+id)
    .then(function () {
      getUsers();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  return (
    <div>
      {!edit && (
        <div>
          <h2>Create User</h2>
          <form className="userForm" onSubmit={createUser}>
            <div>
              <label>First name</label>
              <br />
              <input type="text" required onChange={handleFirstName}></input>
            </div>
            <div>
              <label>Last name</label>
              <br />
              <input type="text" required onChange={handleLastName}></input>
            </div>
            <div>
              <label>Address</label>
              <br />
              <input type="text" required onChange={handleAddress}></input>
            </div>
            <div>
              <label>Email</label>
              <br />
              <input type="email" required onChange={handleEmail}></input>
            </div>
            <div>
              <label>Contact No</label>
              <br />
              <input type="tel" required onChange={handleContactNo}></input>
            </div>
            <div>
              <label>Username</label>
              <br />
              <input type="text" required onChange={handleUsername}></input>
            </div>
            <div>
              <label>password</label>
              <br />
              <input type="password" required onChange={handlePassword}></input>
            </div>
            <br />
            <button type="submit">
              Save
            </button>
          </form>
        </div>
      )}
       {edit && (
        <div>
          <h2>Update User</h2>
          <form className="userForm" onSubmit={updateUser}>
            <div>
              <label>First name</label>
              <br />
              <input type="text" required value={firstName!==null?firstName:''} onChange={handleFirstName}></input>
            </div>
            <div>
              <label>Last name</label>
              <br />
              <input type="text" required value={lastName!==null?lastName:''} onChange={handleLastName}></input>
            </div>
            <div>
              <label>Address</label>
              <br />
              <input type="text" required value={address!==null?address:''} onChange={handleAddress}></input>
            </div>
            <div>
              <label>Email</label>
              <br />
              <input type="email" required value={email!==null?email:''} onChange={handleEmail}></input>
            </div>
            <div>
              <label>Contact No</label>
              <br />
              <input type="tel" required value={contactNo!==null?contactNo:''} onChange={handleContactNo}></input>
            </div>
            <div>
              <label>Username</label>
              <br />
              <input type="text" required value={username!==null?username:''} onChange={handleUsername}></input>
            </div>
            <div>
              <label>password</label>
              <br />
              <input type="password" required onChange={handlePassword}></input>
            </div>
            <br />
            <button type="submit" onSu>
              Update
            </button>
            &emsp;
            <button type="submit" onClick={()=>setEdit(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
      <table class="container">
        <h2>Users</h2>
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
              <td>{user.first_name}  {user.last_name}</td>
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
                    setPassword(user.password)
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-danger" onClick={(event)=>deleteUser(event,user.id)}>
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
