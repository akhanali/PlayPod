import React from 'react'
import "./sidebar.css"
import SidebarButton from './sidebarButton';
import { useEffect, useState } from "react";


import { MdFavorite } from "react-icons/md";
import { FaPlay } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';


export default function Sidebar() {
    const [profileImg, setProfileImg] = useState(
        localStorage.getItem("profileImg") ||
        "https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    );
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result;
            localStorage.setItem("profileImg", base64);
            setProfileImg(base64);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className='sidebar-container'>
            <label htmlFor="profile-upload">
                <img
                    src={profileImg}
                    className="profile-img"
                    alt="profile"
                    style={{ cursor: "pointer" }}
                    title="Click to change profile picture"
                />
            </label>
            <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
            />
            <div>
                <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
                <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
                <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite />} />
                <SidebarButton title="Search" to="/search" icon={<FaSearch />} />

            </div>

            <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
        </div>
    );
}
