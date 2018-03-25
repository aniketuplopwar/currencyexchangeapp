export default class Component {

    render(content){
        const componentElement = document.createElement('span');
        componentElement.id = 'mock-component';
        componentElement.innerHTML = content;
        return componentElement;
    }
}