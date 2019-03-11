class TitleTextComponent extends TitleRendererComponent{
  constructor(text, color, font){
    super();
    this.text = text;
    this.color = color;
    this.font  = font;

    if(!text || !color || !font)
      throw "TitleTextComponent expects exactly three arguments in its constructor";

  }
  renderGUI(ctx, gameObject){

    ctx.fillStyle = this.color;
    ctx.font = this.font;

    ctx.fillText(this.text, gameObject.transform.position.x -  ctx.measureText(this.text).width / 2, gameObject.transform.position.y);

  }
}