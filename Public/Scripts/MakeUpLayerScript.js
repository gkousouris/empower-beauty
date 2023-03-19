// -----JS CODE-----
//@input int[] activeStep 
//@ui {"widget":"separator"}

//@input string materialName = Contour
//@input vec4 materialColour {"widget":"color"}

//@ui {"widget":"separator"}
//@input Component.ScriptComponent stateScript

//script.api.activeStep = script.activeStep;

script.api.activeStep = script.activeStep;
script.colour
//On update set material colours to material state for contour..

//Register materials with state....


if (script.stateScript) {
    // register material
    var material = {
      "name": script.materialName,
      "activeStep": 0, //may be used in future
      "activeStage": 0,
      "colour": script.materialColour //add something to deal if you have multiple components trying to register the same colour..
    };
    script.stateScript.api.registerMaterial(material);
    script.stateScript.api.registerCallback(script);

}

script.api.onUpdate = function() {
    //    update colour
    var currentColour = script.stateScript.api.getCurrentColour(script.materialName);
    var layer = script.getSceneObject()
    var numStages = layer.getChildrenCount()

    for (var i = 0; i < numStages; i++) { // loop through all stages and update the colour
        var stage = layer.getChild(i)
        var stageMaterial = stage.getComponent("FaceMaskVisual");
//        print(stageMaterial.mainPass.baseColor)
        stageMaterial.mainPass.baseColor = currentColour
//        print(stageMaterial.mainPass.baseColor)

    }
}

script.api.onUpdate();