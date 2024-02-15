import { Link } from "react-router-dom";
import Users from "./User";

const Admin = () => {
  return (
    <section>
      <h1 className="text-green-700">Admin page</h1>
      <br />
      <Users />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
export default Admin;
