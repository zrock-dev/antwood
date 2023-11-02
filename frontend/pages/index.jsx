import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import Link from "next/link";
function index() {
  return (
    <div>
      <h1>Hello there</h1>
      <Link href="/admin">Manage Shoes</Link>
    </div>
  );
}

export default index;
