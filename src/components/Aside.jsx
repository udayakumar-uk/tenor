import React from "react";

export default function Aside(props){

    return(
        <aside>
            <h2>Categories</h2>
            <nav>
                <ul className="scrollbar">
                    {props.categories.map((tag, index) => <li key={index} onClick={() => props.categoryEvent(tag.searchterm)}>{tag.searchterm}</li>)}
                </ul>
            </nav>
        </aside>
    )
}