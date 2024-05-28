import React from "react";

export default function Modal({modalItem, open, modalTrigger, size, type, transparent }){

    const [blogUrl, setBlogUrl] = React.useState(null);
    
    React.useEffect(function(){
        createBlob();
    }, [type, transparent]);

    const createBlob = async function(){
        if(modalItem){
            const blobImgUrl = await fetch(modalItem?.media[0][type].url).then(response => response.blob()).then(blob => {
                                const blobUrl = URL.createObjectURL(blob);
                                console.log(blobUrl);
                                return blobUrl;
                            }).catch(error => console.error('Error:', error));
            
            setBlogUrl(blobImgUrl);
        }
    }

    return(
        
        <div className={`modal-wrapper modal ${open ? 'in' : ''}`} onClick={(e) => modalTrigger.closeBackdropModal(e)} >
           {open &&  <div className="modal-container">
                <button className="modal-close btn-icon material-symbols-rounded" onClick={() => modalTrigger.closeModal()}>close</button>
                 <div className="modal-body row scrollbar">
                    <div className="col">
                        <div className="gif-img">
                            <img src={modalItem.media[0].gif.url} alt={modalItem.content_description} loading="lazy"  />
                        </div>
                    </div>
                    <div className="col">
                        <h2 className="modal-title">{modalItem.content_description}</h2>
                        <strong className="sub-title">Type</strong>
                        <div className="btn-group">
                            <input type="radio" className="btn-check" name="gifType" id="medium" defaultValue="mediumgif" />
                            <label className="btn btn-sm btn-light" onClick={(e) => modalTrigger.gifType('mediumgif')} htmlFor="medium">Large</label>
                            
                            <input type="radio" className="btn-check" name="gifType" id="gif" defaultValue="gif" defaultChecked={type === 'gif'} />
                            <label className="btn btn-sm btn-light" onClick={(e) => modalTrigger.gifType('gif')} htmlFor="gif">Medium</label>
                            
                            <input type="radio" className="btn-check" name="gifType" id="tinygif" defaultValue="tinygif" />
                            <label className="btn btn-sm btn-light" onClick={(e) => modalTrigger.gifType('tinygif')} htmlFor="tinygif">Tiny</label>

                            <input type="radio" className="btn-check" name="gifType" id="nanogif" defaultValue="nanogif" />
                            <label className="btn btn-sm btn-light" onClick={(e) => modalTrigger.gifType('nanogif')} htmlFor="nanogif">Nano</label>

                            <input type="radio" className="btn-check" name="gifType" id="webp" defaultValue="webp" />
                            <label className="btn btn-sm btn-light" onClick={(e) => modalTrigger.gifType('webp')} htmlFor="webp">Webp</label>

                            <input type="radio" className="btn-check" name="gifType" id="mp4" defaultValue="mp4" />
                            <label className="btn btn-sm btn-light" onClick={(e) => modalTrigger.gifType('mp4')} htmlFor="mp4">Mp4</label>
                            
                            <input type="radio" className="btn-check" name="gifType" id="tinymp4" defaultValue="tinymp4" />
                            <label className="btn btn-sm btn-light" onClick={(e) => modalTrigger.gifType('tinymp4')} htmlFor="tinymp4">Tinymp4</label>

                            <input type="radio" className="btn-check" name="gifType" id="nanomp4" defaultValue="nanomp4" />
                            <label className="btn btn-sm btn-light" onClick={(e) => modalTrigger.gifType('nanomp4')} htmlFor="nanomp4">Nanomp4</label>
                        </div>
                        <br />
                        <strong className="sub-title">Transparent</strong>
                        <div className="btn-group">
                            <input type="checkbox" disabled={!transparent} className="btn-check" onClick={(e) =>  modalTrigger.gifType('_transparent', e)}  name="transparent" id="transparent" defaultValue="_transparent"  />
                            <label className="btn btn-sm btn-light" htmlFor="transparent">Yes</label>
                        </div>
                        <br />

                        <div className="modal-row row">
                            <div className="col">
                                <strong className="sub-title">Dimensions</strong>
                                <p className="caption">{modalItem.media[0][type].dims[0]} x {modalItem.media[0][type].dims[1]}</p>
                            </div>
                            <div className="col">
                                <strong className="sub-title">Size</strong>
                                <p className="caption">{modalTrigger.convertToFileSize(modalItem.media[0][type].size)}</p>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="modal-footer">
                    <button className="btn btn-dark btn-close" onClick={() => modalTrigger.closeModal()}>Close</button>
                    <a href={blogUrl} download={modalItem.content_description} className="btn btn-download btn-primary"><span className="material-symbols-rounded">Download</span> Download</a>
                </div>

            </div> }
            
        </div>

        
    )

}