// -----JS CODE-----
//@ui {"widget":"separator"}
//@input Component.ScriptComponent stateScript

if (script.stateScript) {
    script.stateScript.api.registerCallback(script);
    var spinner = script.getSceneObject();
    isEnabled(spinner);
}

function isEnabled(spinner) {
    print(script.stateScript.api.getCurrentStep())
    if (script.stateScript.api.getCurrentStep() == 0){
        spinner.enabled = true;
    }
    else {
        spinner.enabled = false;
    }
    
}

script.api.onUpdate = function() {
    isEnabled(script.getSceneObject());
}

