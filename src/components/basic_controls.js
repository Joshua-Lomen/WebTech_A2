import './basic_controls.css'

function basic_controls({ volumeChange, onVolumeChange, bpmChange, onBpmChange, bassChange, onBassChange, arpChange, onArpChange, dChange, onDChange, d2Change, onD2Change }) {
    return (
        <>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            Change BPM
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>This is the first item’s accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Volume
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>This is the second item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Toggle Instruments
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <strong>This is the third item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                    </div>
                </div>
            </div>

            {/* set song speed to x/60/4 (converts cpm to bpm) */}
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setBPM</span>
                <input type="number" min="30" max="240" step="1" className="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label" onChange={onBpmChange}/>

            </div>

            {/* FUNCTIONAL */}
            {/* Volume slider */}
            <label htmlFor="vol_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.1" onMouseUp={onVolumeChange} id="vol_range"></input>

            {/* Checkboxes to mute particular instruments */}
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="bassline" checked={bassChange} onChange={onBassChange}/>
                <label className="form-check-label" htmlFor="bassline">
                    mute bassline
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="main_arp" checked={arpChange} onChange={onArpChange}/>
                <label className="form-check-label" htmlFor="main_arp">
                    mute main_arp
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="drums" checked={dChange} onChange={onDChange}/>
                <label className="form-check-label" htmlFor="drums">
                    mute drums
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="drums2" checked={d2Change} onChange={onD2Change}/>
                <label className="form-check-label" htmlFor="drums2">
                    mute drums2
                </label>
            </div>

        </>
        
    )
}

export default basic_controls;