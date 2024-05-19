import { useEffect, useState } from "react";
import { getAllData } from "../utils/Apiservice";
import { Link } from "react-router-dom";
import SeverityDemo from "../templates/errorMsg";

function Payment() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [purchaseQty, setPurchaseQty] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

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
  function handlePurchaseQTy(event) {
    console.log("purchaseQty-", purchaseQty);
    setPurchaseQty(event.target.value);
  }
  function addToCart(purchaseQty) {
    console.log("purchaseQty==", purchaseQty);
    if (purchaseQty == null) {
      return <></>;
    }
  }

  return (
    <div>
      <Link className="home" to="/">
        Home
      </Link>
      <button> View Cart</button>
      {console.log("items---", items)}
      {console.log("categories---", categories)}
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
                      onChange={handlePurchaseQTy}
                      placeholder="add qty"
                    ></input>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => (<>
                            {purchaseQty && SeverityDemo("error", "Error", "Message Content", 3000)}
                        </>)}
                      >
                        Add To Cart
                      </button>
                      <SeverityDemo />
                    </td>
                  </tr>
                ))}
          </table>
        ))}
    </div>
  );
}

export default Payment;
