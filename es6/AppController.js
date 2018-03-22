
export default class AppController {
  constructor(stompInstance, topic, view){
      this.stompInstance = stompInstance;
      this.topic = topic;
      this.view = view;
  }

  init(){
    this.stompInstance.subscribe(this.topic, this.renderView.bind(this));
  }

  renderView(data){
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    tableContainer.appendChild(this.view.render([JSON.parse(data.body)]));
  }
};





