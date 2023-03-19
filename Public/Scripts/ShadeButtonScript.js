// -----JS CODE-----
//@ui {"widget":"separator"}
//@input Component.ScriptComponent stateScript

if (script.stateScript) {
    var shadeButton = script.getSceneObject();
    var touchEvent = script.createEvent("TouchEndEvent");
    touchEvent.bind(onTap);
}

function onTap() {
    script.stateScript.api.setIsColorSliderEnabled(!script.stateScript.api.getIsColorSliderEnabled());
}