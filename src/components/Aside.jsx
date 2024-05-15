import React from "react";
import {Link} from "react-router-dom";

export default function Aside(props){

    return(
        <aside>
            <section className="aside-section">
                <h2>Categories</h2>
                <nav>
                    <ul className="scrollbar">
                        {props.categories.map((tag, index) => <li key={index} onClick={() => props.categoryClick(tag.searchterm)}><Link to="/" className={tag.searchterm === props.filter.search ? 'active' : ''}>{tag.searchterm}</Link></li>)}
                    </ul>
                </nav>
            </section>
        </aside>
    )
}