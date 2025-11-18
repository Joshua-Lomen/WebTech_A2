import '../stylesheets/basic_controls.css'
import { Accordion } from 'react-bootstrap';

function basic_controls({ volumeChange, onVolumeChange, bpmChange, onBpmChange, bassChange, onBassChange, arpChange, onArpChange, dChange, onDChange, d2Change, onD2Change }) {
    return (
        <>
            {/* Accordion to store controls */}
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Change BPM</Accordion.Header>
                    <Accordion.Body>
                    {/* FUNCTIONAL */}
                    {/* TODO: Modify so that changes to controls update song while still playing */}
                    {/* set song speed to x/60/4 (converts cpm to bpm) */}
                    <p>Set from 60 to 220</p>
                    <p>Current BPM: {bpmChange}</p>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="cpm_label">setBPM</span>
                        <input type="number" min="60" max="220" step="1" className="form-control" id="cpm_text_input" placeholder="Enter number" aria-label="cpm" aria-describedby="cpm_label" onChange={onBpmChange}/>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Volume</Accordion.Header>
                    <Accordion.Body>
                    {/* FUNCTIONAL */}
                    {/* Volume slider */}
                    <label htmlFor="vol_range" className="form-label">Volume</label>
                    <input type="range" className="form-range" min="0" max="2" step="0.1" onMouseUp={onVolumeChange} id="vol_range"></input>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Toggle Instruments</Accordion.Header>
                    <Accordion.Body>
                    {/* FUNCTIONAL */}
                    {/* TODO: Modify so that changes to controls update song while still playing */}
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
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </>
        
    )
}

export default basic_controls;