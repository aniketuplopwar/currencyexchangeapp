export default class View {
    constructor(component, containerId){
        this.component = component;
        this.containerId = containerId;
    }
    render(content){
        const container = document.getElementById(this.containerId);
        container.innerHTML = '';
        container.appendChild(this.component.render(content));
    }
};
