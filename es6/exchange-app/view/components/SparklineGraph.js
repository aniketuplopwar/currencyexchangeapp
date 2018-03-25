export default class SparklineGraph {
    constructor(){
        if(typeof Sparkline === 'undefined'){
            throw Error('This graph needs Sparkline, make sure you have Sparkline library included');
        }
    }

    draw(points){
        return Sparkline.draw(document.createElement('span'), points).element;
    }
}
