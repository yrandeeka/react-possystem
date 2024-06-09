import { useEffect, useRef, useState } from "react";
import { create, getAllData } from "../utils/Apiservice";
import "../index.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { removeObject, updateObject } from "../utils/Common";
import axios from "axios";
import config from "../utils/Config";

function Payment() {
  const jwtToken = localStorage.getItem("jwtToken");
  const userId = localStorage.getItem("userId");
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartQty, setCartQty] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [tempCart, setTempCart] = useState([]);
  const toast = useRef(null);

  const navigate = useNavigate();
  const authConfig = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };

  useEffect(() => {
    getItems();
    getUser();
    getCart();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [cart]);

  async function getCartItems() {
    if (cart.id===null) {
      return;
    }
    await axios
      .get(config.baseUrl+"cartitem/" + cart.id,authConfig)
      .then(function (response) {
        console.log("cart item", response.data);
        setCartItems(response.data);
      })
      .catch(function (error) {
        console.log("cart item error", error);
      });
  }

  function getUser() {

    axios
      .get(config.baseUrl+"user/" + userId,authConfig)
      .then(function (response) {
        console.log("user-", response.data);
        setUser(response.data);
      })
      .catch(function (error) {
        return error;
      });
  }
  function getCart() {
    axios
      .get(config.baseUrl+"cart/" + userId,authConfig)
      .then(function (response) {
        console.log("cart-->", response.data);
        setCart(response.data);
      })
      .catch(function (error) {
        return error;
      });
  }

  function getCategories(items) {
    // eslint-disable-next-line array-callback-return
    items.map((item) => {
      if (!categories.includes(item.category.description)) {
        categories.push(item.category.description);
      }
    });
  }

  useEffect(() => {
    if (items.length > 0) {
      getCategories(items);
    }
  }, [items]);
  function getItems() {
    getAllData("items", jwtToken,setItems);
  }
  function handlePurchaseQTy(event, id) {
    setCartQty([{ id: id, qty: parseFloat(event.target.value) }]);
  }

  const showMsg = (_severity, _summary, _detail, _life) => {
    toast.current.show({
      severity: _severity,
      summary: _summary,
      detail: _detail,
      life: _life,
    });
  };
  function addToCart(event, item) {
    event.preventDefault();
    if (
      cartQty[0].id === null ||
      (cartQty[0].id === item.id && cartQty[0].qty === null)
    ) {
      showMsg("error", "Error", "Please Add Qty", 3000);
      clearFields();
      return;
    }
    if (cartQty[0].id !== item.id) {
      showMsg("error", "Error", "Add One by One Item to Cart", 3000);
      clearFields();
      return;
    } else if (cartQty[0].id === item.id && cartQty[0].qty !== null) {
      const cartItem = {
        itemId: item.id,
        cartQty: cartQty[0].qty,
        cartId: cart.id,
      };

      if (cartItems.findIndex((cItem) => cItem.item.id === cartItem.itemId) === -1) {
        axios
          .post(config.baseUrl+"cartitem", cartItem,authConfig)
          .then(function (response) {
            console.log(response.data);
            clearFields();
            const createItem = response.data;
            setCartItems([...cartItems, createItem]);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .put(config.baseUrl+"updatecartitem", cartItem,authConfig)
          .then(function (response) {
            console.log(response.data);
            clearFields();
            const updateItem = response.data;
            /*updating the cartItems when change qtys*/
            const update = cartItems.map((item) => (
             item.id === updateItem.id ? updateItem : item
            ));
            setCartItems(update);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }

  function clearFields() {
    setCartQty([{ id: null, qty: null }]);
  }

  function createCart(event) {
    create(event, "carts", jwtToken,setCart, cart, user, clearFields, null);
  }

  function removeCartItem(event,itemId) {
    event.preventDefault();

    axios.put(config.baseUrl+"removecartitem/"+itemId,null,authConfig)
    .then(function (response) {
      console.log("removeItem");
      const rvmdItem=response.data;
      if (rvmdItem.id===itemId) {
        removeObject(itemId,cartItems,setCartItems);  
      }
    })
  }

  function toInvoice() {
    navigate('/invoice');
  }

  return (
    <div>
      <Link className="home" to="/">
        Home
      </Link>&emsp;&emsp;
      {cart.length === 0 && (
        <button type="submit" onClick={createCart}>
          {" "}
          Create Cart
        </button>
      )}
      {categories &&
        categories.map((category) => (
          <table class="container">
            <h4>{`${category}`}</h4>
            <tr class="responsive-table">
              <th class="col col-2">Item</th>
              <th class="col col-2">Supplier</th>
              <th class="col col-2">Stock QTY</th>
              <th class="col col-2">Unit Price(Rs.)</th>
              <th class="col col-2">Purchase QTY</th>
              <th class="col col-3">Action</th>
            </tr>
            {items &&
              items
                .filter(
                  (item) =>
                    item.status === "stock in" &&
                    item.category.description === category
                )
                .map((item) => (
                  <tr id={item.id}>
                    <td>{item.name}</td>
                    <td>{item.supplier.name}</td>
                    <td>{`${item.quantity} ${item.units}`}</td>
                    <td>{item.unitPrice}</td>
                    <input
                      type="number"
                      required
                      onChange={(e) => handlePurchaseQTy(e, item.id)}
                      placeholder="add qty"
                    ></input>
                    <td>
                      <button
                        type="submit"
                        class="btn btn-primary"
                        onClick={(event) => addToCart(event, item)}
                      >
                        Add to Cart
                      </button>
                      <Toast ref={toast} />
                    </td>
                  </tr>
                ))}
          </table>
        ))}
      <div class="page">
        <table className="cartTbl">
          <tr>
            <th class="col col-2">Description</th>
            <th class="col col-2">add qty</th>
            <th class="col col-2">unit Price(Rs.)</th>
            <th class="col col-2">total Price(Rs.)</th>
            <th class="col col-2"></th>
          </tr>
          {cartItems &&
            cartItems.map((item) => (
              <tr>
                <td>{item.item.name}</td>
                <td>{`${item.cartQty} ${item.item.units}`}</td>
                <td>{`${item.item.unitPrice}`}</td>
                <td>{`${item.item.unitPrice * item.cartQty}`}</td>
                <td>
                  <button type="button" class="btn btn-danger" onClick={(e)=>removeCartItem(e,item.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
        </table>
        {<button onClick={toInvoice}>To Invoice</button>}
      </div>
    </div>
  );
}

export default Payment;
