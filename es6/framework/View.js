export default class View {
    constructor(containerId){
        this.containerId = containerId;
    }

    init(){
        this.component = this.prepareView();
    }

    prepareView() {
        return {render:(content)=>{}};
    }

    render(content){
        const container = document.getElementById(this.containerId);
        container.innerHTML = '';
        container.appendChild(this.component.render(content));
    }
};
