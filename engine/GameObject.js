//A generic GameObject class
class GameObject{
  constructor(){
    this.transform = new Transform();
    this.components = [];
  }
  render(ctx) {
    if(this.renderer){
      this.renderer.render(ctx, this);
    }
  }
  renderGUI(ctx){
    if(this.rendererGUI){
      this.rendererGUI.renderGUI(ctx,this);
    }
  }
  getComponent(type){
    for(let i = 0; i < this.components.length; i++){
      let component = this.components[i];
      if(component instanceof type){
        return component;
      }
    }
    return undefined;
  }
}