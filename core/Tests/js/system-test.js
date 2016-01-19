function getQueryBuilder(){
    return new Eternity.Helper.QueryBuilder();
}

function getDOMCrawler(queryBuilder){
    return new Eternity.Components.DOM.Crawler(queryBuilder);
}

function getDOMRepository(){
    return new Eternity.Components.DOM.Repository();
}

function getDOMObserver(elementBinder, resolver){
    return new Eternity.Components.DOM.Observer(elementBinder, resolver);
}

function getResolver(resultResolver){
    return new Eternity.Components.Input.Resolver.Resolver(resultResolver);
}

function getResultResolver(){
    return new Eternity.Components.Output.Resolver.Resolver();
}

function getElementBinder(){
    return new Eternity.Components.DOM.Element.Binder();
}

function getHandler(dataProvider, elementCrawler){
    var mapper = new Eternity.Helper.Mapper();
    
    //prepend some rules for mapper
    mapper.add('input1', 'input2', function(handler){
        return handler.getMyValue('input1') * 2;
    });
    
    return new Eternity.Components.Input.Handler.Calculus(dataProvider, mapper, elementCrawler);
}

function getResultHandler(domRepository){
    return new Eternity.Components.Output.Handler.ValueUpdater(domRepository);
}

function getDataProvider(domRepository, elementCrawler){
    return new Eternity.Components.Provider.Data(domRepository, elementCrawler);
}

function getElementCrawler(){
    return new Eternity.Components.DOM.Element.Crawler();
}

function prepareEnvironment(){
    var container = document.getElementById('sandbox'),
        input1 = document.createElement('input'),
        input2 = document.createElement('input');

    input1.setAttribute('type', 'text');
    input1.setAttribute('data-type', 'cell');
    input1.id = 'input1';
    
    input2.setAttribute('type', 'text');
    input2.setAttribute('data-type', 'cell');
    input2.id = 'input2';
    
    container.appendChild(input1);
    container.appendChild(input2);
}

QUnit.test('Testing system', function(assert){
    var qb = getQueryBuilder();
    var domCrawler = getDOMCrawler(qb);
    var domRepository = getDOMRepository();
    var elementBinder = getElementBinder();
    var elementCrawler = getElementCrawler();
    var resultResolver = getResultResolver();
    var resolver = getResolver(resultResolver);
    var domObserver = getDOMObserver(elementBinder, resolver);
    var dataProvider = getDataProvider(domRepository, elementCrawler);
    var handler = getHandler(dataProvider, elementCrawler);
    var resultHandler = getResultHandler(domRepository);
    
    resolver.registerHandler(handler);
    resultResolver.registerHandler(resultHandler);
    
    prepareEnvironment();
    
//    var elements = Array.prototype.slice.call(domCrawler.getElements({tag: 'body'}, {tag: 'input', attributes: [{name: 'data-type', value: 'cell'}]}), 0);
//    
//    domRepository.add(elements);
//    
//    domObserver.observe(elements, ['keyup']);
    
    assert.ok(true);
});
