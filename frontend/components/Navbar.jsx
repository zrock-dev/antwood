import navStyle from "./style_compontens/navbar.module.css";
import Link from "next/link";
function Navbar() {
  return (
    <nav className={navStyle.navbar}>
      <div>
        <h1>
          <Link href={"/"}>SoleStyle*</Link>
        </h1>
      </div>
      <ul className={navStyle.menu}>
        <li>
          <Link href="/admin">Manage Shoes </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
