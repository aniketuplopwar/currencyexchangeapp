import Controller from './Controller';
import { createMockModel, createMockView } from '../testHelper/testHelper';
describe('Controller', ()=>{
    let model, view, controller;

    beforeAll(()=>{
        model = createMockModel();
        view = createMockView();
        controller = new Controller(model, view);
    })
    
    it('should subcribe to model changes when initialized',()=>{
        controller.init();

        expect(model.subscribe).toHaveBeenCalled();
    });

    xit('should render view when model changes',()=>{
        controller.init();
        model.onMessage('some message');

        expect(view.render).toHaveBeenCalled();
    });

})