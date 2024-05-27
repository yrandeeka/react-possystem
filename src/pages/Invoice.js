import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllData } from "../utils/Apiservice";
import config from "../utils/Config";

function Invoice() {
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [discount, setDiscount] = useState(0.0);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [invoice, setInvoice] = useState(0.0);
  const [totalPriceWithDiscount, setTotalPriceWithDiscount] =
    useState(totalPrice);

  useEffect(() => {
    getUser();
    getCart();
    getCustomers();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [cart]);

  useEffect(() => {
    getTotalPrice(cartItems);
  }, [cartItems]);

  function getCustomers() {
    getAllData("customers", setCustomers);
  }

  async function getCartItems() {
    if (cart.id === null) {
      return;
    }
    await axios
      .get("http://localhost:8080/cartitem/" + cart.id)
      .then(function (response) {
        console.log("cart item", response.data);
        setCartItems(response.data);
      })
      .catch(function (error) {
        console.log("cart item error", error);
      });
  }
  function getCart() {
    axios
      .get("http://localhost:8080/cart/" + 1)
      .then(function (response) {
        console.log("cart-->", response.data);
        setCart(response.data);
      })
      .catch(function (error) {
        return error;
      });
  }

  function getUser() {
    axios
      .get("http://localhost:8080/user/" + 1)
      .then(function (response) {
        console.log("user-", response.data);
        setUser(response.data);
      })
      .catch(function (error) {
        return error;
      });
  }

  function handleCustomer(event) {
    const selected = customers.find(
      (customer) => customer.id === parseInt(event.target.value)
    );

    setCustomer(selected);
  }
  function handleDiscount(event) {
    console.log("handleDiscount--", event.target.value);
    const discount = event.target.value;
    setDiscount(parseFloat(discount));
  }

  function applyDiscount(event) {
    event.preventDefault();
    console.log("discount--",discount);
    if (!isNaN(discount)) {
      const priceWithDiscount = totalPrice - totalPrice * discount;
      setTotalPriceWithDiscount(priceWithDiscount);
    } else {
      setTotalPriceWithDiscount(totalPrice);
    }
  }

  async function getTotalPrice(cartItems) {
    let ttlPrice = 0.0;
    await cartItems.map((cartItem) => {
      ttlPrice = ttlPrice + cartItem.cartQty * cartItem.item.unitPrice;
    });
    setTotalPrice(ttlPrice - discount);
  }

  function clearFields() {
    setCustomer("");
    setDiscount(0.0);
    setTotalPriceWithDiscount(0.0);
  }

  function proceedPayment(event) {
    event.preventDefault();

    const customerPayment = {
      totalItems: cartItems.length,
      discountFraction: discount,
      totalPrice: totalPrice,
      finalPrice: totalPriceWithDiscount,
      user: user,
      customer: customer,
      cartItems: cartItems,
    };

    axios
      .post(config.baseUrl + "invoice", customerPayment)
      .then(function (response) {
        setInvoice(response.data);
        clearFields();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Link className="payment" to="/payment">
        Back to Cart
      </Link>
      {console.log("invoice--->", invoice)}
      <h2>Invoice the Customer</h2>
      {console.log("customers-", customers)}
      <form onSubmit={proceedPayment}>
        <div>
          <label htmlFor="drpdwnCustomer" class="inline-label">
            Customer
          </label>
          &emsp;
          <select id="drpdwnCustomer" onChange={handleCustomer}>
            <option value="">Select an option</option>
            {customers &&
              customers.map((customer) => (
                <option value={customer.id} key={customer.id}>
                  {`${customer.first_name} ${customer.last_name}`}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>{`Total Items - ${cartItems.length}`}</div>
        <br />
        <div>
          <label>Discount%</label>&emsp;
          <input
            type="number"
            value={discount}
            onChange={handleDiscount}
          ></input>
          &emsp;
          <button onClick={applyDiscount}>Click here to apply discount</button>
        </div>
        <br />
        <div>{`Total Price (Rs.) - ${totalPrice}`}</div>
        <br />
        <div>
          {setTotalPriceWithDiscount &&
            `Total Price with Discount (Rs.)- ${totalPriceWithDiscount}`}
        </div>
        <br />
        <h3>Item List</h3>
        <table>
          <th class="col col-2">Description</th>
          <th class="col col-2">purchase qty</th>
          <th class="col col-2">unit Price(Rs.)</th>
          <th class="col col-2">Price(Rs.)</th>
          {cartItems &&
            cartItems.map((item) => (
              <>
                {
                  <tr>
                    <td>{item.item.name}</td>
                    <td>{`${item.cartQty} ${item.item.units}`}</td>
                    <td>{`${item.item.unitPrice}`}</td>
                    <td>{`${item.item.unitPrice * item.cartQty}`}</td>
                  </tr>
                }
              </>
            ))}
        </table>
        <button type="submit">Proceed Payment</button>
      </form>
    </div>
  );
}

export default Invoice;
