// Holds all state. Must be bound to the lens "Initialized" event.

//@ui {"widget":"separator"}

var contourShade = '#010101'; // In hex
var highlighterShade = '#010101';

//var currentStep = 0;
//var currentStage = 0;
//var currentMask = 0; // this will be the mask index, each mask knows its index

//@input int currentStep = 0
//@input int currentStage = 0
//@input int currentMask = 0

var isColorPickerEnabled = false;

var maxStep = 2;
// keeping the number of masks here so that each new mask knows its index 
var maxMask = 1;
var registeredComponents = [];
var registeredMaterials = [];

// Stage definitions
script.api.Stages = {
    Applied: 0,
    AppliedOutline: 1,
    Blended: 2
    // Add more stages here if needed
};

// Step definitions
script.api.Steps = {
    MaskPick: 0,
    Highlight: 1,
    Contour: 2,
    // Add more steps here when needed
};

const steps = {[script.api.Steps.MaskPick]: {stages: []}, 
    [script.api.Steps.Highlight]: {stages: [script.api.Stages.Applied, script.api.Stages.AppliedOutline, script.api.Stages.Blended]}
}; // To access a value we can do steps[Steps.MaskPick]
// To get the next stage of a step we can do steps[currentStep].stages.findIndex(currentStage) + 1 

// APIs for updating state
script.api.setContourShade = function(shade) {
    contourShade = shade;
    invokeCallbacks();
}

script.api.setHighlighterShade = function(shade) {
    highlighterShade = shade;
    invokeCallbacks();
}

// Set current colour for colourName (type=String) with newColour (type=vec4)
script.api.setCurrentColour = function(colourName, newColour) {
    for (var i = 0; i < registeredMaterials.length; i++) {
        if (registeredMaterials[i]["name"] == colourName) {
            registeredMaterials[i]["colour"] = newColour;
            return;
        }
    }
    return; // if you cannot find it return 
}

script.api.setCurrentStep = function(step) {
    script.currentStep = step;
    print(script.currentStep);
    invokeCallbacks();
}

script.api.setCurrentStage = function(stage) {
    script.currentStage = stage;
    invokeCallbacks();
}

script.api.setCurrentMask = function(mask) {
    script.currentMask = mask;
    invokeCallbacks();
}

script.api.setIsColorPickerEnabled = function(enabled) {
    isColorPickerEnabled = enabled;
    invokeCallbacks();
}


// APIs for reading state
script.api.getCurrentStep = function() {
    return script.currentStep;
}

script.api.getCurrentStage = function() {
    return script.currentStage;
}

script.api.getCurrentMask = function() {
    return script.currentMask;
}

script.api.getContourShade = function() {
    return contourShade;
}

script.api.getHighlighterShade = function() {
    return highlighterShade;
}

script.api.getIsColorPickerEnabled = function() {
    return isColorPickerEnabled;
}

// Get current colour (type=vec4) for colourName (type=String)
script.api.getCurrentColour = function(colourName) {
    for (var i = 0; i < registeredMaterials.length; i++) {
        if (registeredMaterials[i]["name"] == colourName) {
            return registeredMaterials[i]["colour"] ;
        }
    }
    // no error handling right now
}

// State managemenet APIs
script.api.registerCallback = function(component) {
    registeredComponents.push(component);
}

script.api.registerMaterial = function(newMaterial) {
    for (var i = 0; i < registeredMaterials.length; i++) {
        print(i);
        if (registeredMaterials[i]["name"] == newMaterial["name"]) {
            print('Already Added');
            return;
        }
    }
    print("Adding material named: " + newMaterial["name"])
    registeredMaterials.push(newMaterial);
}

// State management
function invokeCallbacks() {
    for (var i = 0; i < registeredComponents.length; i++) {
//        print(i);
        print("Current Mask: " + String(script.currentMask))
        print("Current Step: " + String(script.currentStep))
        print("Current Stage: " + String(script.currentStage))
        if (registeredComponents[i].api.onUpdate) {
//            print('Got called');
            registeredComponents[i].api.onUpdate();
        }
    }
}