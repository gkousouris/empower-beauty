// -----JS CODE-----
print("Hello World!")
//https://www.youtube.com/watch?v=NBGNGYsLA5Q&ab_channel=BenKnutson
//@input SceneObject countour_no_blend
//@input SceneObject countour_blend
//@input SceneObject countour_outline
//@input SceneObject highlight_no_blend
//@input SceneObject highlight_blend
//@input SceneObject highlight_outline


var step = 0;

script.countour_no_blend.enabled = false;
script.countour_blend.enabled = false;
script.countour_outline.enabled = false;

script.highlight_no_blend.enabled = false;
script.highlight_blend.enabled = false;
script.highlight_outline.enabled = false;


function onTapped(eventData)
{
    step = step % 7
    step += 1;
    print(step)
    
    if (step == 1){
        script.countour_no_blend.enabled = false;
        script.countour_blend.enabled = true;
        script.countour_outline.enabled = false;
        
        script.highlight_no_blend.enabled = false;
        script.highlight_blend.enabled = true;
        script.highlight_outline.enabled = false;
        
    } else if (step == 2){
        script.countour_no_blend.enabled = true;
        script.countour_blend.enabled = false;
        script.countour_outline.enabled = false;
        
        script.highlight_no_blend.enabled = true;
        script.highlight_blend.enabled = false;
        script.highlight_outline.enabled = false;
    }else if (step == 3){
        script.countour_no_blend.enabled = false;
        script.countour_blend.enabled = false;
        script.countour_outline.enabled = false;
        
        script.highlight_no_blend.enabled = true;
        script.highlight_blend.enabled = false;
        script.highlight_outline.enabled = false;
    }else if (step == 4){
        script.countour_no_blend.enabled = false;
        script.countour_blend.enabled = false;
        script.countour_outline.enabled = false;
        
        script.highlight_no_blend.enabled = false;
        script.highlight_blend.enabled = false;
        script.highlight_outline.enabled = true;
    }else if (step == 5){
        script.countour_no_blend.enabled = true;
        script.countour_blend.enabled = false;
        script.countour_outline.enabled = false;
        
        script.highlight_no_blend.enabled = false;
        script.highlight_blend.enabled = false;
        script.highlight_outline.enabled = false;
    }else if (step==6) {
        script.countour_no_blend.enabled = false;
        script.countour_blend.enabled = false;
        script.countour_outline.enabled = true;
        
        script.highlight_no_blend.enabled = false;
        script.highlight_blend.enabled = false;
        script.highlight_outline.enabled = false;
    }else{
        script.countour_no_blend.enabled = false;
        script.countour_blend.enabled = false;
        script.countour_outline.enabled = false;
        
        script.highlight_no_blend.enabled = false;
        script.highlight_blend.enabled = false;
        script.highlight_outline.enabled = false;
    }
//    print("Tap Position: (" + eventData.getTapPosition().x + ", " + eventData.getTapPosition().y + ")");
}

var event = script.createEvent("TapEvent");
event.bind(onTapped);

