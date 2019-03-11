class TitleRendererComponent extends Component{
  constructor(){
    super();
  }
  renderGUI(ctx, gameObject){
    throw "All implementations of TitleRendererComponent must override render."
  }
}