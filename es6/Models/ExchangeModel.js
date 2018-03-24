import Model from "../framework/Model";

export default class ExchangeModel extends Model {
    constructor(service) {
        super({currencyPairMap:{}, currencyPairArray: []}, service);
    }

    updateCurrencyPairArray(){
        this.state.currencyPairArray = Object.keys(this.state.currencyPairMap).map((key)=>{
                                            return this.state.currencyPairMap[key];
                                        });
    }

    calculateMidPrice(bestBid, bestAsk){
        return(parseFloat(bestBid) + parseFloat(bestAsk))/2;
    }

    updateModel(message){
        let currencyPair = JSON.parse(message.body);
        let existingStateForPair = this.state.currencyPairMap[currencyPair.name];

        if(!existingStateForPair){
            currencyPair['midPrice'] = [];
        }else{
            currencyPair['midPrice'] = existingStateForPair['midPrice'];
        }

        currencyPair['midPrice'].push(this.calculateMidPrice(currencyPair.bestBid, currencyPair.bestAsk));
        this.state.currencyPairMap[currencyPair.name] = currencyPair;

        this.updateCurrencyPairArray();
    }


}   