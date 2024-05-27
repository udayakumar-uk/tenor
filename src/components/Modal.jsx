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
                        <strong className="sub-title">Type</strong>
                        <div className="btn-group">
                            <input type="radio" className="btn-check" name="gifType" id="gif" />
                            <label className="btn btn-sm btn-light" defaultValue="gif" htmlFor="gif">Medium</label>
                            
                            <input type="radio" className="btn-check" name="gifType" id="medium" />
                            <label className="btn btn-sm btn-light" defaultValue="medium" htmlFor="medium">Large</label>
                            
                            <input type="radio" className="btn-check" name="gifType" id="tinygif" />
                            <label className="btn btn-sm btn-light" defaultValue="tinygif" htmlFor="tinygif">Tiny</label>

                            <input type="radio" className="btn-check" name="gifType" id="nanogif" />
                            <label className="btn btn-sm btn-light" defaultValue="nanogif" htmlFor="nanogif">Nano</label>

                            <input type="radio" className="btn-check" name="gifType" id="webp" />
                            <label className="btn btn-sm btn-light" defaultValue="webp" htmlFor="webp">Webp</label>

                            <input type="radio" className="btn-check" name="gifType" id="mp4" />
                            <label className="btn btn-sm btn-light" defaultValue="mp4" htmlFor="mp4">Mp4</label>
                            
                            <input type="radio" className="btn-check" name="gifType" id="tinymp4" />
                            <label className="btn btn-sm btn-light" defaultValue="tinymp4" htmlFor="tinymp4">Tinymp4</label>

                            <input type="radio" className="btn-check" name="gifType" id="nanomp4" />
                            <label className="btn btn-sm btn-light" defaultValue="nanomp4" htmlFor="nanomp4">Nanomp4</label>
                        </div>

                        <strong className="sub-title">Transparent</strong>
                    </div>
                </div> }
                <div className="modal-footer">
                    <button className="btn btn-dark btn-close" onClick={() => modalTrigger.closeModal()}>Close</button>
                    <button className="btn btn-download btn-primary"><span className="material-symbols-rounded">Download</span> Download</button>
                </div>

            </div>

            
            {/* <p style={style}>Testing</p>

            {open && modalItem.content_description}


            {open && <button >Close</button> } */}
            </div>

        
    )

}