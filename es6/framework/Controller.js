
export default class Controller {
  constructor(model, view){
      this.model = model;
      this.view = view;
  }

  init(){
    this.model.init();
    this.model.subscribe(this.renderView.bind(this));
  }

  renderView(data){
    this.view.render(data);
  }
};





