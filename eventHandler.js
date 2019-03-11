var keys = [];

function keydown(e) {
  keys[e.key] = true;
  update({name:"keyup", key:e.key});
}

function keyup(e) {
  keys[e.key] = false;
  update({name:"keyup", key:e.key});
}

function mousedown(e) {
  update({name:"mousedown", button:e.button});
}
function mouseup(e) {
  update({ name: "click", location: { x: e.offsetX, y: e.offsetY } });
}
function mousemove(e) {
  update({name:"mousemove", location: {x: e.offsetX, y: e.offsetY}});
  // console.log(e.x + " " + e.y);
}
function wheel(e){
  update({name:"mousewheel", location: {x:e.offsetX, y:e.offsetY}, delta: e.deltaY});
}

var updateListeners = [];

function timer() {
  update({ name: "timer" })
}

function update(event) {
  for (let i = 0; i < updateListeners.length; i++) {
    updateListeners[i].eventPump(event);
  }
}