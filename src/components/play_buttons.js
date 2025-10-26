function play_buttons({ onPlay, onStop }) {
    return (
        <>
            <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
            <button id="stop" className="btn btn-outline-danger" onClick={onStop}>Stop</button>
        </>
    )
}

export default play_buttons;