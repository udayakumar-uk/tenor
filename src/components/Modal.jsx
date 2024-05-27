import React from "react";

export default function Modal({modalItem, open, modalTrigger}){

    const style = {
        color: open ? '#ff0' : '#f00',
        transition: 'all linear 1s'
    }

    return(
         <div className={`modal-wrapper modal ${open ? 'in' : ''}`} onClick={(e) => modalTrigger.closeBackdropModal(e)} >
           <div className="modal-container">
                <button className="modal-close btn-icon material-symbols-rounded" onClick={() => modalTrigger.closeModal()}>close</button>
                {open &&  <div className="modal-body row">
                    <div className="col">
                        <div className="gif-img">
                            <img src={modalItem.media[0].gif.url} alt={modalItem.content_description} loading="lazy"  />
                        </div>
                    </div>
                    <div className="col">
                        <h2 className="modal-title">{modalItem.content_description}</h2>
                    </div>
                </div> }
                <div className="modal-footer">
                    <button className="btn btn-close" onClick={() => modalTrigger.closeModal()}>Close</button>
                    <button className="btn btn-download btn-primary"><span className="material-symbols-rounded">Download</span> Download</button>
                </div>

            </div>

            
            {/* <p style={style}>Testing</p>

            {open && modalItem.content_description}


            {open && <button >Close</button> } */}
            </div>

        
    )

}