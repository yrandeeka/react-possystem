import { Link } from "react-router-dom";

function Home() {
    return(
        <div>
            <h1>Home Page</h1>
            <Link to="/users">Users</Link><br/>
            <Link to="/suppliers">Suppliers</Link><br/>
            <Link to="/customers">Customers</Link><br/>
            <Link to="/categories">Categories</Link><br/>
            <Link to="/items">Items</Link>
        </div>
    );
}

export default Home;