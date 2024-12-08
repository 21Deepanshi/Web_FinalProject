import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import logo from '../Images/Logo.png';
import { FaUserShield } from 'react-icons/fa';
const Header = ({ onSearch, isLoggedIn, isAdmin }) => {
    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        ...(isLoggedIn ? [{ name: "ManageBooks", path: "/manageBooks" }] : []),
    ];
   
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="Website Logo" />
            </div>
            {/* For Extra space I include two empty div container */}
            <div></div><div></div><div></div>
            <nav>
                <ul>
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Link to={link.path}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
                {isLoggedIn && isAdmin && (
                    <div className="admin-icon">
                        <FaUserShield size={24} color="#333" />
                        <span>Admin</span>
                    </div>
                )}
            <div>
                {!isLoggedIn ? (
                    <Link to="/signIn">
                        <button className="buttonSignIn">Sign In</button>
                    </Link>
                ) : (
                    <button className="buttonSignIn" onClick={() => window.location.reload()}>Sign Out</button>
                )}
            </div>
        </header>
    );
}

export default Header;
 