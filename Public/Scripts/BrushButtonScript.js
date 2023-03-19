//@ui {"widget":"separator"}
//@input Component.ScriptComponent stateScript

if (script.stateScript) {
    var brushButton = script.getSceneObject();
    isEnabled(brushButton);
    var touchEvent = script.createEvent("TouchEndEvent");
    touchEvent.bind(onTap);
}

function isEnabled(brushButton) {
    // TODO: Define custom logic here
    brushButton.enabled = true;
}

function onTap() {
    print('Brush Button Tapped');
}
