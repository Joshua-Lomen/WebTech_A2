import '../stylesheets/load_settings_buttons.css'

function load_settings_buttons({loadData, saveData}) {
    return (
        <>
            {/* save settings as json */}
            <button id="save" className="btn btn-outline-primary" onClick={saveData}>SAVE</button>
            {/* load settings from json */}
            <button id="load" className="btn btn-outline-primary" onClick={loadData}>LOAD</button>
        </>
    )
}

export default load_settings_buttons;