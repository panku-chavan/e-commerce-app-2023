import React from 'react'
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand" href="#">Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active" aria-current="page" href="#">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" href="#">Link</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link disabled">Disabled</NavLink>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>


        </>
    )
}

export default Header