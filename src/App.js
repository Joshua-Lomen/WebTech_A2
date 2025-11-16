import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import BasicControls  from './components/basic_controls';
import PlayButtons from './components/play_buttons';
import PreProcTextArea from './components/preproc_textarea';
import LoadSettingsButtons from './components/load_settings_buttons';
import { PreProcess } from './utils/PreProcLogic';
import testData from './components/test_data.json'
import savedData from './components/saved_data.json'

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const hasRun = useRef(false);

    // preprocess text on play
    const handlePlay = () => {
        let outputText = PreProcess({ inputText: procText, volume: volume, bpm: bpm, bass: bassline, arp: arp, drums: drums, drums2: drums2 });
        globalEditor.setCode(outputText);
        globalEditor.evaluate()
    }

    const handleStop = () => {
        globalEditor.stop()
    }

    // text to process
    const [procText, setProcText] = useState(stranger_tune)

    // bpm
    const [bpm, setBpm] = useState(140)

    // input validation to keep input between min and max
    const handleBpmInput = (e) => {
        const newValue = e.target.value;
        if (newValue < 60) {
            setBpm(60);
        }
        else if (newValue > 220) {
            setBpm(220);
        }
        else {
            setBpm(newValue);
        }
    }

    // volume
    const [volume, setVolume] = useState(1);

    // instrument toggles
    // true = mute
    // false = unmute
    const [bassline, setBassline] = useState(false);
    const [arp, setArp] = useState(false);
    const [drums, setDrums] = useState(false);
    const [drums2, setDrums2] = useState(false);


    // state for play and stop
    const [state, setState] = useState("stop");

    useEffect(() => {

        if(state === "play") {
            handlePlay();
        }

    }, [volume, bpm, bassline, arp, drums, drums2])

    // useState for saving JSON data
    const [data, setData] = useState([]);

    const loadData = () => {
        // setBpm(testData.bpm);
        // setVolume(testData.volume);
        // setBassline(testData.bassline);
        // setArp(testData.arp);
        // setDrums(testData.drums);
        // setDrums2(testData.drums2);
    }

    const saveData = () => {
        savedData.bpm = bpm;
        savedData.volume = volume;
        savedData.bassline = bassline;
        savedData.arp = arp;
        savedData.drums = drums;
        savedData.drums2 = drums2;
        console.log(savedData);
    }

useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = procText
        globalEditor.setCode(procText);
    }
    
}, [procText]);


return (
    <div>
        <h2>Strudel Demo</h2>
        <main>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreProcTextArea defaultValue={procText} onChange={(e) => setProcText(e.target.value)} />
                    </div>
                    <div className="col-md-4">

                        <nav>
                            <PlayButtons onPlay={() => { setState("play"); handlePlay()}} onStop={() => { setState("stop"); handleStop() }}/>
                            <br />
                            <LoadSettingsButtons loadData={loadData()} saveData={saveData()}/>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-md-4">
                        <BasicControls 
                            volumeChange={volume} 
                            onVolumeChange={(e) => setVolume(e.target.value)} 
                            bpmChange={bpm} 
                            onBpmChange={handleBpmInput}
                            bassChange={bassline}
                            onBassChange={(e) => setBassline(e.target.checked)}
                            arpChange={arp}
                            onArpChange={(e) => setArp(e.target.checked)}
                            dChange={drums}
                            onDChange={(e) => setDrums(e.target.checked)}    
                            d2Change={drums2}
                            onD2Change={(e) => setDrums2(e.target.checked)}
                        />
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}