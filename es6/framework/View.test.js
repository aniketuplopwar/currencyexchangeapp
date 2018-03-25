import View from './View';
jest.mock('./Component');


describe('View',()=>{
    let view;
    beforeAll(()=>{
        const testElement = document.createElement('div');
        testElement.id= 'test';
        document.body.appendChild(testElement);
        view = new View('test');

    });

    xit('should render component in the given container when rendered',()=>{
        view.init();
        view.render('some-content');
       // const mockComponent = document.getElementById('mock-component');
        //expect(mockComponent).tobeDefined();
        expect(Component.render).toHaveBeenCalled();
    });
});