class Scene{
  constructor(){
    this.hierarchy = [];
    
    
  }
  start(){
    this.hierarchy = [];
    
    updateListeners.push(this);

  }

  eventPump(event) {
    switch (event.name) {
      case "timer":
        this.update();

        for (let i = 0; i < this.hierarchy.length; i++) {
          var gameObject = this.hierarchy[i];
          let components = gameObject.components;
          for(let j = 0; j < components.length; j++){
            let component = components[j];
            if(component instanceof Behavior){
              if (typeof component.update === "function")
                component.update(gameObject);
            }
          }
          
        }
        this.render();
        break;
    }
  }
  render() {
    //This is where I render. I don't update my model here.
    ctx.fillStyle = this.camera.backgroundColor;
    ctx.fillRect(0, 0, width, height);

    ctx.save(); 
    {
      //Camera transformations
      ctx.translate(this.camera.transform.position.x, this.camera.transform.position.y);
      ctx.scale(this.camera.zoom, this.camera.zoom);

      ctx.save(); {
        ctx.scale(1, -1);
        ctx.save(); {
          for (var i = 0; i < this.hierarchy.length; i++) {
            var gameObject = this.hierarchy[i];
            ctx.save(); {
              ctx.translate(gameObject.transform.position.x, gameObject.transform.position.y);
              ctx.scale(gameObject.transform.scale.x, gameObject.transform.scale.y);
              if (typeof gameObject.render === "function")
                gameObject.render(ctx);
            }
            ctx.restore();
          }
        }
        ctx.restore();
      }
      ctx.restore();
    }
    ctx.restore();


    //Now do screen space rendering
    for (var i = 0; i < this.hierarchy.length; i++) {
      var gameObject = this.hierarchy[i];
      ctx.save(); {
        if (typeof gameObject.renderGUI === "function")
          gameObject.renderGUI(ctx);
      }
      ctx.restore();
    }
  }
}