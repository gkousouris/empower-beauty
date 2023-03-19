// -----JS CODE-----
//@input int[] activeMask = 1.0
//@ui {"widget":"separator"}
//@input Component.ScriptComponent stateScript

//Needs to be trigger on Start so it can read the user defined properties in other API sections..

if (script.stateScript) {
    script.stateScript.api.registerCallback(script);
    isEnabled(script.getSceneObject());
}

function isEnabled(faceMask) {
    
    // Get Current States
    var currentMask = script.stateScript.api.getCurrentMask();
    var currentStep = script.stateScript.api.getCurrentStep();
    var currentStage = script.stateScript.api.getCurrentStage();
    
    var numActiveMask = script.activeMask.length;
//    print("Num Active Mask: " + String(numActiveMask))
    var activeMaskFlag = false;
    for (var k = 0; k < numActiveMask; k++) {
        if (currentMask == script.activeMask[k]){
            activeMaskFlag = true;
        }
    }
    
    if (activeMaskFlag) { // Check if this face mask is active
        print("Facemask - " + faceMask.name + " - is active!")
        faceMask.enabled = true;
        var numLayers = faceMask.getChildrenCount()
//        print("Number of Make Up Layers: " + String(numLayers))

        for (var i = 0; i < numLayers; i++) { // iterate through all layers (Contour Layer, Highlight Layer, etc.)
            var layer = faceMask.getChild(i);
            var layerScriptComponent = layer.getComponent("ScriptComponent");
            var layerActiveStep = layerScriptComponent.api.activeStep
            
            var numLayerActiveStep = layerActiveStep.length;
            print("Num Active Step: " + String(numLayerActiveStep))
            var layerActiveStepFlag = false;
            for (var m = 0; m < numLayerActiveStep; m++) {
                if (currentStep == layerActiveStep[m]){
                    layerActiveStepFlag = true;
                }
            }
            
            if (layerActiveStepFlag) { //if layer[i] should be active
                layer.enabled = true;
                var numLayerStages = layer.getChildrenCount()
                print(layer.name + " is active")
//                print(layer.name + " - Number of Layers Stages: " + String(numLayerStages))
                
//                if (currentStep == 0) { //If default step, show all the blended layers, hide other masks
//                    currentStage = script.stateScript.api.Stages["AppliedOutline"] // Remove this hardcoding if already set in state.
//                } 
//               else  if (currentStep == 1) { //If default step, show all the blended layers, hide other masks
//                    currentStage = script.stateScript.api.Stages["Blended"] // Remove this hardcoding if already set in state.
//                } 
                            
                for (var j = 0; j < numLayerStages; j++) {  // Find the correct stage to activate, right now just 3 options (Applied, AppliedOutline, Blended)
                    var layerStage = layer.getChild(j)
                    if (script.stateScript.api.Stages[layerStage.name] == currentStage){ 
                        print("Showing " + layerStage.name + " Stage on "+ layer.name +" on "+ faceMask.name +" Mask")
                    layerStage.enabled = true;
                    } else { 
                        layerStage.enabled = false;
                    }                   
                }
            } else {
                print(layer.name + " is inactive")
                layer.enabled = false;
            }
            
            

        } 
    } 
    else {
        faceMask.enabled = false;
    }
    
}

script.api.onUpdate = function() {
    isEnabled(script.getSceneObject());
}