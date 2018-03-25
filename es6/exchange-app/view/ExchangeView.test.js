import ExchangeView from "./ExchangeView";
import ExchangeTable from "./components/ExchangeTable";
import SparklineGraph from "./components/SparklineGraph";
import { createMockGraph} from "../../testHelper/testHelper";

describe('ExchangeView', ()=>{
    global.Sparkline = createMockGraph();

    it('should prepare Sparkline graph',()=>{
        const exchangeView = new ExchangeView();
        const sparklineGraph = exchangeView.prepareGraph();
        expect(sparklineGraph instanceof SparklineGraph).toBe(true);
    });

    it('should set Exchange Table as its component', ()=>{
        const exchangeView = new ExchangeView();
        exchangeView.prepareView();
        exchangeView.init();

        expect(exchangeView.component instanceof ExchangeTable).toBe(true);
    })
});