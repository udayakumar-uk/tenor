import React from "react";

export default function Aside(props){

    return(
        <aside>
            <section className="aside-section">
                <h2>Categories</h2>
                <nav>
                    <ul className="scrollbar">
                        {props.categories.map((tag, index) => <li className={tag.searchterm === props.filter.search ? 'active' : ''} key={index} onClick={() => props.categoryClick(tag.searchterm)}>{tag.searchterm}</li>)}
                    </ul>
                </nav>
            </section>
        </aside>
    )
}