// function to process strudel code before running
export function PreProcess({inputText, volume, bpm, bass, arp, drums, drums2}) {
    
    // might not need this, test
    let outputText = inputText + "\n//Hello, this is a test";
    outputText += `\n//all(x => x.gain(${volume}))`
    outputText = outputText.replaceAll("{$VOLUME}", volume)

    // changes song speed to 'bpm' value
    outputText = outputText.replaceAll("setcps(140/60/4)", `setcps(${bpm}/60/4)`)
    
    //for instrument toggles
    // if true: replace tag with '_' to mute
    // if false: replace tag with empty string to keep unmuted
    if(bass) {
        outputText = outputText.replaceAll("<bass_tag>", "_")
    }
    else {
        outputText = outputText.replaceAll("<bass_tag>", "")
    }

    if(arp) {
        outputText = outputText.replaceAll("<arp_tag>", "_")
    }
    else {
        outputText = outputText.replaceAll("<arp_tag>", "")
    }
    
    if(drums) {
        outputText = outputText.replaceAll("<d_tag>", "_")
    }
    else {
        outputText = outputText.replaceAll("<d_tag>", "")
    }
    
    if(drums2) {
        outputText = outputText.replaceAll("<d2_tag>", "_")
    }
    else {
        outputText = outputText.replaceAll("<d2_tag>", "")
    }

    // find and change gain of all instruments
    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    let m;

    let matches = []

    while ((m = regex.exec(outputText)) !== null) {
        //This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the 'm'-variable
        m.forEach((match, groupIndex) => {
            matches.push(match)
        });
    }

    let matches2 = matches.map(
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) => 
            `gain(${captureGroup}*${volume})`
        )
    );

    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]), 
            outputText);

    console.log(matches3);

    return matches3;
}