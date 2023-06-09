import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header(){

    const {accessToken} = useContext(AuthContext);

    return(
        <>
        <div className="header_section">
        <nav className="navbar navbar-dark bg-dark">
          <Link to={'/'} className="logo">
            <img src="/images/logo.png" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarsExample01"
            aria-controls="navbarsExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarsExample01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to={'/'} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/about'} className="nav-link">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/catalog'} className="nav-link">
                  Songs
                </Link>
              </li>
              {accessToken
              ?
              <>
              <li className="nav-item">
              <Link to={'/create'} className="nav-link">
                Create a song
              </Link>
              </li>
              <li className="nav-item">
                <Link to={'/logout'} className="nav-link">
                  Logout
                </Link>
              </li>
              </>
              :
              <>
              <li className="nav-item">
                <Link to={'/login'} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/register'} className="nav-link">
                  Register
                </Link>
              </li>
              </>
              }   
            </ul>
          </div>
        </nav>
        </div>
    </>
    );
}