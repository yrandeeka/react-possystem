import { useEffect, useRef, useState } from "react";
import { create, getAllData } from "../utils/Apiservice";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";
import { updateObject } from "../utils/Common";
import axios from "axios";

function Payment() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartQty, setCartQty] = useState([{ id: null, qty: null }]);
  const [cart, setCart] = useState([]);
  const [tempCart, setTempCart] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    getItems();
    getUser();
    getCart();
  }, []);

  function getUser() {
    axios
      .get("http://localhost:8080/user/" + 1)
      .then(function (response) {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(function (error) {
        return error;
      });
  }
  function getCart() {
    axios
      .get("http://localhost:8080/cart/" + 1)
      .then(function (response) {
        console.log(response.data);
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
    getAllData("items", setItems);
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
  function addToCart(item) {
    if (cartQty[0].id !== item.id) {
      showMsg("error", "Error", "Message Content", 3000);
      return;
    } else if (cartQty[0].id === item.id && cartQty[0].qty !== null) {
      const cartItem = {
        id: item.id,
        cartQty: cartQty[0].qty,
      };
      if (tempCart.findIndex((item) => item.id === cartItem.id) === -1) {
        setTempCart([...tempCart, cartItem]);
      } else {
        updateObject(tempCart, cartItem, setTempCart);
      }
    }
  }

  function clearFields() {
    setCartQty([{ id: null, qty: null }]);
  }

  function saveCart(event) {
    const addCart={
      user:user,
      addItems:tempCart
    }
    console.log("addCart=>",addCart);
    create(event, "carts", setCart, cart, addCart, clearFields, null);
  }

  return (
    <div>
      <Link className="home" to="/">
        Home
      </Link>
        {tempCart.length > 0 && <button type="submit" onClick={saveCart}> Save Cart</button>}
        {cart.length > 1 && <button> View Cart</button>}
        {console.log(cart)}        
        {categories &&
          categories.map((category) => (
            <table class="container">
              <h2>{`${category}`}</h2>
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
                          onClick={() => addToCart(item)}
                        >
                          {tempCart.findIndex((citem) => citem.id === item) ===
                          -1
                            ? "Add To Cart"
                            : "Added to Cart"}
                        </button>
                        <Toast ref={toast} />
                      </td>
                    </tr>
                  ))}
            </table>
          ))}
    </div>
  );
}

export default Payment;
