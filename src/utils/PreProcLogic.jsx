export function PreProcess({inputText, volume}) {
    let outputText = inputText + "\n//Hello, this is a test";

    outputText += `\n//all(x => x.gain(${volume}))`

    // use this for setCPM later
    outputText = outputText.replaceAll("{$VOLUME}", volume)

    // outputText = outputText.replace("setcps(140/60/4)", `setcps(${bpm}/60/4)`)

    //for instrument toggles
    // if(bass) {
    //     outputText = outputText.replace("<bass_tag>", "_")
    // }
    // else {
    //     outputText = outputText.replace("<bass_tag>", "")
    // }

    // if(arp) {
    //     outputText = outputText.replace("<arp_tag>", "_")
    // }
    // else {
    //     outputText = outputText.replace("<arp_tag>", "")
    // }
    
    // if(drums) {
    //     outputText = outputText.replace("<d_tag>", "_")
    // }
    // else {
    //     outputText = outputText.replace("<d_tag>", "")
    // }
    
    // if(drums2) {
    //     outputText = outputText.replace("<d2_tag>", "_")
    // }
    // else {
    //     outputText = outputText.replace("<d2_tag>", "")
    // }

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