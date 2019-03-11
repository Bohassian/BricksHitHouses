class TitleTextObject extends GameObject{
  constructor(text){
    super();

    this.textComponent = new GUITextComponent(text, "white", "45px Future Bold Italic");
    this.components.push(this.textComponent);
    this.rendererGUI = this.textComponent;
  }
}