import React from "react";
import {Link} from "react-router-dom";
import Logo from "../img/tenor_logo.svg.png";


export default function Header(props){

    // console.log(props.filter.search);

    return(
        <header>
            <Link to='/'><img src={Logo} width="100" alt="logo" /></Link>
            
            <div className="search--form">
                <label htmlFor="search" className="material-symbols-rounded search--icon">search</label>
                <input type="search" onKeyUp={(e) => props.searchInput(e)} name="search" id="search" className="form-input" />
            </div>

            <div className="theme--switch">
                <input type="checkbox" name="color-scheme" id="theme" value="light" hidden />
                <label htmlFor="theme" className="material-symbols-rounded theme--icon light-theme">light_mode</label>
                <label htmlFor="theme" className="material-symbols-rounded theme--icon dark-theme">dark_mode</label>
            </div>
        </header>
    )
}