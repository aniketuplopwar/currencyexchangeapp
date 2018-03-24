import Observable from "./Observable";

export default class Service extends Observable{
    constructor(connection, topic){
        super();
        this.connection = connection;
        this.topic = topic;
        this.notifyAll = this.notifyAll.bind(this);
    }

    init(){
        this.connection.subscribe(this.topic, this.notifyAll);
    }
}