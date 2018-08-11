/*Example cellscript for use with MEngine.mjs, SEngine.mjs and CEngine.mjs
Copyright Richard Lawrence - see MEngine.mjs for full license information*/

//eslint Cellscript tags
/*global Tool:false, files:false, install:false*/

import {convertRSS} from "./src/lib/rssLoader";//update with paths to these two modules in your project
import {convertRMP} from "./src/lib/rmpLoader";

Object.assign(Sphere.Game, {
    name       : "Name of Game",
    author     : "DaVince & SarahB, with help from Rhuan and Fat Cerberus",
    summary    : "Describe game here",
    resolution : "1280x720",
    saveID     : "davince.ld42",
    main       : "@/bin/main.mjs",
    fullScreen : false,
    version    : 2,
    apiLevel   : 1
});

let rssTool = new Tool(convertRSS, "converting RSS");
let rmpTool = new Tool(convertRMP, "converting RMP");

//simple function to run the above tools on collections of files
function runTool(dirName, sources, tool, extension)
{
    const targets = [];
    FS.createDirectory(dirName);
    for (const source of sources)
    {
        let fileName = FS.fullPath(source.name, dirName);
        fileName = fileName.substring(0, fileName.lastIndexOf(".")) + extension;
        targets.push(tool.stage(fileName, [source], { name : source.name }));
    }
    return targets;
}


//update paths in the second parameter to the folders you're using
runTool("@/sprites", files("spritesets/*.rss"), rssTool, ".ses");
runTool("@/maps", files("maps/*.rmp"), rmpTool, ".mem");

//update path in second parameter to folder your mapscripts are stored in
install("@/maps/scripts", files("src/mapScripts/*.mjs"));
install("@/bin", files("src/*.mjs"));
install("@/bin/lib", files("src/lib/*.mjs"));
install("@/shaders",  files("shaders/*.glsl", true));
install("@/sounds",  files("sounds/*.*", true));
install("@/music",  files("music/*.*", true));
install("@/images",  files("images/*.png", true));

//remove this line if not using windowstyles
install("@/windows",  files("windowstyles/*.rws", true));