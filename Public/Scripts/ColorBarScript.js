//@ui {"widget":"separator"}
//@input Component.ScriptComponent stateScript


if (script.stateScript) {
    script.stateScript.api.registerCallback(script);
    var colorBar = script.getSceneObject();
    isEnabled(colorBar);
}

function isEnabled(colorBar) {
    colorBar.enabled = script.stateScript.api.getIsColorPickerEnabled();
}

script.api.onUpdate = function() {
    var colorBar = script.getSceneObject();
    isEnabled(colorBar);
}