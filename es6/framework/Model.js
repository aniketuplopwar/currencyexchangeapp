import Observable from "./Observable";

export default class Model extends Observable{
    constructor(initialState, service){
        super();
        this.state = initialState;
        this.service = service;
    }

    init(){
        this.service.init();
        this.service.subscribe((message)=>{
            this.updateModel(message);
            this.notifyAll(this.state);
        });
    }

    updateModel(updatedState){
        this.state = updatedState;
    }
}