import Observable from "./Observable";

export default class Service extends Observable{
    constructor(connection, topic){
        super();
        this.topic = topic;
        this.connection = connection;
        this.notifyAll = this.notifyAll.bind(this);
    }

    init(){
        this.connection.initialize().then(()=>{
            this.connection.subscribe(this.topic, this.notifyAll);
        });
    }
}