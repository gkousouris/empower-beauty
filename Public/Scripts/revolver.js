// -----JS CODE-----
//@input Component.Script apiProvider
//@input Component.Text apiText
//@input SceneObject textObj

if (script.apiProvider) {
    script.apiProvider.api.registerCallback(script);
    updateObjEnability(script.getSceneObject()); //ADDED BY ZACH HOPEFULLY IT DOESN"T BREAK : )
}

var curPos = undefined;

var transform = script.getSceneObject().getTransform();

var speed = -5.0;

script.apiText.text = '';
script.createEvent("TouchStartEvent").bind(function (eventData) {

    curPos = eventData.getTouchPosition();
    if (curPos.y < 0.71) // block touch input
        curPos = null;

});
var num_of_faces = 6;    

script.createEvent("TouchMoveEvent").bind(function (eventData) {

    if(!curPos)

        return;

    var nextPos = eventData.getTouchPosition();

    var deltaX = nextPos.x - curPos.x;

    var deltaY = nextPos.y - curPos.y;


    var mat = transform.getWorldTransform();

    var axisX = mat.multiplyDirection(vec3.forward());

    var deltaRotX = quat.angleAxis(deltaX *speed, axisX);

//    var axisY = mat.multiplyDirection(vec3.right());
//
//    var deltaRotY = quat.angleAxis(deltaY * speed, axisY);
//
    var rot = transform.getLocalRotation().multiply(deltaRotX);

    transform.setLocalRotation(rot);

    curPos = nextPos;

});


function pass() {
  print('------');
}

function setText(idx) {
    
    names = ['Heart','Diamond', 'Square', 'Oval', 'Egg', 'Round'];    
    var oldText = script.apiText.text;
    var newText = names[idx % num_of_faces] + ' shape';
    
    if (oldText != newText) {
        script.apiText.text = newText;
        global.tweenManager.startTween(script.textObj, 'text_fader', pass)
    }
    

    
}

script.createEvent("TouchEndEvent").bind(function (eventData) {

    angle = (transform.getLocalRotation().toEulerAngles().z)


    two_pi = 6.2831853072;    

    var newIndex = Math.round(angle / (two_pi/num_of_faces));
    newIndex = Math.min(num_of_faces, newIndex);
    newIndex = Math.max(0, newIndex);
    if (newIndex == 0) {
        newIndex = 6;
    }
    print(newIndex)
    
    setText(newIndex);
    
    
    v = quat.fromEulerAngles(0,0,newIndex * two_pi/num_of_faces)
    // fix this to snap back to grid. Currently it's not very smooth
    transform.setLocalRotation(v) 
    print('qq')
    if (script.apiProvider && script.apiProvider.api.setCurrentMask) {
        script.apiProvider.api.setCurrentMask(newIndex)
    }    
});


function updateObjEnability(obj) {
    var currentStep = script.apiProvider.api.getCurrentStep();
    var isEnabled = currentStep == 1;    
    print("Revolver")
    print("Revolver")
    obj.enabled = isEnabled;
    global.touchSystem.touchBlocking = isEnabled;


}

script.api.onUpdate = function() {
    updateObjEnability(script.getSceneObject());
}