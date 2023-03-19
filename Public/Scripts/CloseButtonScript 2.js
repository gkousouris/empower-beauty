// -----JS CODE-----
//@ui {"widget":"separator"}
//@input Component.ScriptComponent stateScript

if (script.stateScript) {
    var closeButton = script.getSceneObject();
    isEnabled(closeButton);
    var touchEvent = script.createEvent("TouchEndEvent");
    touchEvent.bind(onTap);
}

function isEnabled(closeButton) {
    // TODO: Define custom logic here
    closeButton.enabled = true;
}

function onTap() {
    print('Close Button Tapped');
    script.stateScript.api.setIsColorPickerEnabled(false);
}