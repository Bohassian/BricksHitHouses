class EndScene extends Scene{
  constructor(){
    super()
  }
  start() {
    super.start();

    this.camera = new Camera(40, "gray");
    this.camera.transform.position = new Vector2(width / 2, height / 2);
    this.hierarchy.push(this.camera);

    var rDimensions = positionGUI(width, height, .25, 20, .25)
    this.guiComponent = new GUIRectangleComponent(new AxisAlignedRectangle(rDimensions.width, rDimensions.height), "rgba(255, 255, 255,.5)");
    this.guiContainer = new GUIContainer();
    this.guiContainer.components.push(this.guiComponent);
    this.guiContainer.rendererGUI = this.guiComponent;
    this.guiContainer.transform.position.x = rDimensions.x;
    this.guiContainer.transform.position.y = rDimensions.y;

    this.guiTextObject = new GUITextObject("End Scene");
    this.guiTextObject.transform.position = new Vector2(width/2, rDimensions.y + rDimensions.height/2);

  

    this.hierarchy.push(this.camera);
    this.hierarchy.push(this.guiContainer);
    this.hierarchy.push(this.guiTextObject);
    
  }
  eventPump(event) {
    super.eventPump(event);
    switch (event.name) {
      case "click":
        this.nextScene();
        break;
     
    }
  }
  nextScene() {
    state = TITLE_STATE;
    updateListeners.splice(updateListeners.indexOf(this), 1);
    updateStateHandler();
  }
  update() {
    //This is where I update my model. I don't do any rendering here.

    
  }
  
}
