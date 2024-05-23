import React from "react";

export default function Modal({modalItem, open, closeModal}){

    const style = {
        color: open ? '#ff0' : '#f00',
        transition: 'all linear 1s'
    }

    return(
        <div>

            <p style={style}>Testing</p>

            {open && modalItem.content_description}


            {open && <button onClick={() => closeModal()}>Close</button> }

        </div>
        
    )

}