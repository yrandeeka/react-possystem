import { useEffect, useRef, useState } from "react";
import { getAllData } from "../utils/Apiservice";
import { Link } from "react-router-dom";
import { Toast } from "primereact/toast";

function Payment() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [purchaseQty, setPurchaseQty] = useState([{ id: null, qty: null }]);
  const [cart, setCart] = useState([]);
  const toast = useRef(null);

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
  function handlePurchaseQTy(event, id) {
    console.log("purchaseQty-", purchaseQty);
    setPurchaseQty([{ id: id, qty: parseFloat(event.target.value) }]);
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
    if (purchaseQty[0].id !== item.id) {
      showMsg("error", "Error", "Message Content", 3000);
      return;
    } else if (purchaseQty[0].id === item.id && purchaseQty[0].qty !== null) {
      let purItem = item;
      purItem.quantity= purchaseQty[0].qty;
      console.log("purItem-",purItem);
      cart.map((item) => {
        if (item.id!==purItem.id) {
          setCart([...cart,purItem])
        }
      });
      console.log("cart==>",cart);
    }
    console.log("purchaseQty---", purchaseQty);
  }

  return (
    <div>
      <Link className="home" to="/">
        Home
      </Link>
      <button> View Cart</button>
      {console.log("items---", items)}
      {console.log("categories---", categories)}
      {console.log("cart---", cart)}
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
                      onChange={(e) => handlePurchaseQTy(e, item.id)}
                      placeholder="add qty"
                    ></input>
                    <td>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => addToCart(item)}
                      >
                        Add To Cart
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
