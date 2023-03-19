// -----JS CODE-----
//@ui {"widget":"separator"}
//@input Component.ScriptComponent stateScript

if (script.stateScript) {
    var settingsButton = script.getSceneObject();
    isEnabled(settingsButton);
    var touchEvent = script.createEvent("TouchEndEvent");
    touchEvent.bind(onTap);
}

function isEnabled(settingsButton) {
    // TODO: Define custom logic here
    settingsButton.enabled = true;
}

function onTap() {
    print('Settings Button Tapped');
    script.stateScript.api.setIsColorPickerEnabled(true);
}