"use client";
import "@/styles/profile/profile.css";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const ProfileRenderer = ({children}) => {
    const { user} = useAuth();



    return (
      <div className="profile-container">
        <div className="profile-account-section">
          <h2>@{user?.username}</h2>
          <span>{user?.email}</span>
        </div>

        <div className="profile-record-section">
          <ul className="nav-records">
            <li>
              <Link href="/profile">Favorites</Link>
            </li>
            <li>
              <Link href={"/profile/order"}>Orders</Link>
            </li>
          </ul>

          <div>{children}</div>
        </div>
      </div>
    );
}

export default ProfileRenderer
