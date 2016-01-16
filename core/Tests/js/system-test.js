function getQueryBuilder(){
    return new QueryBuilder();
}

function getDOMCrawler(queryBuilder){
    return new DOMCrawler(queryBuilder);
}

function getDOMRepository(){
    return new DOMRepository();
}

function getDOMObserver(elementBinder, resolver){
    return new DOMObserver(elementBinder, resolver);
}

function getResolver(resultResolver){
    return new Resolver(resultResolver);
}

function getResultResolver(){
    return new ResultResolver();
}

function getElementBinder(){
    return new ElementBinder();
}

function getHandler(dataProvider, elementCrawler){
    var mapper = new Mapper();
    
    //prepend some rules for mapper
    mapper.add('input1', 'input2', function(handler){
        return handler.getMyValue('input1') * 2;
    });
    
    return new CalculusHandler(dataProvider, mapper, elementCrawler);
}

function getResultHandler(domRepository){
    return new CalculusResultHandler(domRepository);
}

function getDataProvider(domRepository, elementCrawler){
    return new DataProvider(domRepository, elementCrawler);
}

function getElementCrawler(){
    return new ElementCrawler();
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
    resultResolver.addHandler(resultHandler);
    
    prepareEnvironment();
    
    var elements = Array.prototype.slice.call(domCrawler.getElements({tag: 'body'}, {tag: 'input', attributes: [{name: 'data-type', value: 'cell'}]}), 0);
    
    domRepository.add(elements);
    
    domObserver.observe(elements, ['keyup']);
    
    assert.ok(true);
});
