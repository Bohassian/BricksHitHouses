class GUITextObject extends GameObject{
  constructor(text){
    super();

    this.textComponent = new GUITextComponent(text, "black", "30px arial");
    this.components.push(this.textComponent);
    this.rendererGUI = this.textComponent;
  }
}