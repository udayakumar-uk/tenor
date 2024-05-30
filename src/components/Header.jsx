import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../img/tenor_logo.svg.png";


export default function Header(props){

  const navigate = useNavigate();

    return(
        <header>
            <Link className="header-logo" to='/' onClick={() => props.categoryClick("")}><img src={Logo} width="100" alt="logo" /></Link>
            
            <button type="button" className="open-menu btn btn-sm"><span className="material-symbols-rounded">menu</span></button>

            <div className="search--form">
                <label htmlFor="search" className="material-symbols-rounded search--icon">search</label>
                <input type="search"
                    onKeyUp={(e) => {
                        if(e.keyCode == 13){
                            props.searchInput(e.target.value);
                            navigate('/');
                        }
                    }} 
                    name="search" id="search" className="form-input" />
            </div>

            <Link to="favorites" onClick={() => props.favClick("")} title="Favorite" className="favorite"><span className="material-symbols-rounded">Favorite</span> {props.favorites.length > 0 && <span className="isFav"></span>} </Link>

            <div className="theme--switch">
                <input type="checkbox" name="color-scheme" id="theme" value="light" hidden />
                <label htmlFor="theme" className="material-symbols-rounded theme--icon light-theme">light_mode</label>
                <label htmlFor="theme" className="material-symbols-rounded theme--icon dark-theme">dark_mode</label>
            </div>
        </header>
    )
}