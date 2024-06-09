import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../utils/AppContext";
import axios from "axios";
import config from "../utils/Config";

function Home() {
    const jwtToken = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("userId");
    const appContext=useContext(AppContext);
    const {state,setState}=appContext;
    const [invoice,setInvoice]=useState({});
    const [stockTransaction,setStockTransaction]=useState({});


    const authConfig={
        headers:{
          Authorization:`Bearer ${jwtToken}`
        }
      }
    
    useEffect(()=>{
        latestInvoice();
        latestStockTransaction();
    },[])

    function latestInvoice(){
        axios.get(config.baseUrl+"latest_invoice",authConfig)
        .then(function (response) {
            console.log("latest_invoice-",response.data);
            setInvoice(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function latestStockTransaction(){
        axios.get(config.baseUrl+"latest_stock_transaction",authConfig)
        .then(function (response) {
            console.log("latest_stock_transaction-",response.data);
            setStockTransaction(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return(
        <div className="home">
            <h1 style={{textAlign:'center'}}>Home</h1>
            {invoice.id>0 && (
                <div>
                    <h3>Invoice History</h3>
                         <table class="container">
                         <tr class="responsive-table">
                           <th class="col col-3">Issued At</th>
                           <th class="col col-2">Customer</th>
                           <th class="col col-3">Final Price</th>
                           <th class="col col-3">User</th>
                         </tr>
                             <tr id={invoice.id}>
                               <td>{invoice.issuedDate}</td>
                               <td>{`${invoice.customer.first_name} ${invoice.customer.last_name}` }</td>
                               <td>{`Rs.${invoice.finalPrice}`}</td>
                               <td>{invoice.user.username}</td>
                             </tr>
                       </table>

                </div>
            )}
            <br/><br/>
            {stockTransaction.id>0 && (
                <div>
                    <h3>Stock Transaction History</h3>
                         <table class="container">
                         <tr class="responsive-table">
                           <th class="col col-3">Transaction Date</th>
                           <th class="col col-2">Supplier</th>
                           <th class="col col-3">Item</th>
                           <th class="col col-3">Transaction Type</th>
                         </tr>
                             <tr id={stockTransaction.id}>
                               <td>{stockTransaction.transactionDate}</td>
                               <td>{`${stockTransaction.item.supplier.name}` }</td>
                               <td>{`${stockTransaction.item.name}`}</td>
                               <td>{stockTransaction.transactionType}</td>
                             </tr>
                       </table>

                </div>
            )}

        </div>
    );
}

export default Home;