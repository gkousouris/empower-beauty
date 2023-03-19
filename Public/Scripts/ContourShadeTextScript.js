// -----JS CODE-----

//@ui {"widget":"separator"}
//@input Component.Text alphaRecipient
//@input Component.MaterialMeshVisual alphaSource
//@input Component.ScriptComponent stateScript

if (script.alphaSource && script.stateScript) {
    script.alphaRecipient.text = script.stateScript.api.getContourShadeHex();
}


