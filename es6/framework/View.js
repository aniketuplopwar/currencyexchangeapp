import Component from './Component';

export default class View {
    constructor(containerId){
        this.containerId = containerId;
    }

    init(){
        this.component = this.prepareView();
    }

    prepareView() {
        return new Component();
    }

    render(content){
        const container = document.getElementById(this.containerId);
        container.innerHTML = '';
        container.appendChild(this.component.render(content));
    }
};
