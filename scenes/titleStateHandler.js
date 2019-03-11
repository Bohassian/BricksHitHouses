class TitleScene extends Scene{
  constructor(){
    super()
  }

  start() {
    super.start();

    this.camera = new Camera(40, "gray");
    this.camera.transform.position = new Vector2(width / 2, height / 2);
    this.hierarchy.push(this.camera);

    this.titleText = new TitleTextObject("Bricks Hit Houses");

    var rDimensions = positionGUI(width, height, .25, 20, .25)
    this.guiComponent = new GUIRectangleComponent(new AxisAlignedRectangle(rDimensions.width, rDimensions.height), "rgba(255, 255, 255,.5)");
    this.guiContainer = new GUIContainer();
    this.guiContainer.components.push(this.guiComponent);
    this.guiContainer.rendererGUI = this.guiComponent;
    this.guiContainer.transform.position.x = rDimensions.x;
    this.guiContainer.transform.position.y = rDimensions.y;

    this.guiTextObject = new GUITextObject("Title Scene");
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
    state = LOAD_STATE;
    updateListeners.splice(updateListeners.indexOf(this), 1);
    updateStateHandler();
  }
  update(){
    
  }
  
}

var titleStateHandler = {
  start() {
    updateListeners.push(this);
    this.timeCount = 0;
    this.timeDir = "inc";
  },
  eventPump(event) {
    switch (event.name) {
      case "click":
        this.nextScene();
        break;
      case "timer":
        this.update();
        this.render();
        break;
    }
  },
  nextScene() {
    state = LOAD_STATE;
    updateListeners.splice(updateListeners.indexOf(this), 1);
    updateStateHandler();
  },
  update() {
    //This is where I update my model. I don't do any rendering here.

    
  },
  render() {  
    //This is where I render. I don't update my model here.
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "white";
    ctx.font = "45px Future Bold Italic";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = this.timeCount;
    ctx.shadowColor = "#ff4da6";
    
    // Gnarly little hackery to get the glow animation somewhat working
    if (this.timeDir == "inc")
    {
      this.timeCount += 1;  
    }
    else
    {
      this.timeCount -= 1;
    }
    if (this.timeCount == 60)
    {
      this.timeDir = "dec";
    }
    if (this.timeCount == 0)
    {
      this.timeDir = "inc";
    }

    let title = "Bricks Hit Houses";
    
    ctx.fillText(title, .1 * width, height / 2);

    ctx.shadowBlur = 0;
    ctx.shadowColor = "black";
    var rDimensions = positionGUI(width, height, .25, 20, .25)

    ctx.fillStyle = "rgba(255, 255, 255, .5)"

    ctx.fillRect(rDimensions.x,
      rDimensions.y,
      rDimensions.width,
      rDimensions.height);


    ctx.fillStyle = "black";
    ctx.font = "20px Arial";

    let string = "Click to Start";

    ctx.fillText(string, rDimensions.x + rDimensions.width / 2 - ctx.measureText(string).width / 2, rDimensions.y + 20);
}
};