import { Link } from "react-router-dom";

function Home() {
    return(
        <div>
            <h1>Home Page</h1>
            <Link to="/users">Users</Link><br/>
            <Link to="/suppliers">Suppliers</Link>
        </div>
    );
}

export default Home;