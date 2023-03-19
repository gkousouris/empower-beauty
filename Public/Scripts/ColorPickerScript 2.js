//@ui {"widget":"separator"}
//@input Component.ScriptComponent stateScript


if (script.stateScript) {
    script.stateScript.api.registerCallback(script);
    var colorPicker = script.getSceneObject();
    isEnabled(colorPicker);
}

function isEnabled(colorPicker) {
    colorPicker.enabled = script.stateScript.api.getIsColorPickerEnabled();
}

script.api.onUpdate = function() {
    var colorPicker = script.getSceneObject();
    isEnabled(colorPicker);
}