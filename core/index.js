var eternityApp = (function(){
    return new Eternity.App();
})();

function mapSection1(mapper){
    mapper.map(['input1-1'], 'input1-2', function(handler){
        return handler.getValue('input1-1') * 2;
    });
}

function mapSection2(mapper){
    mapper
        .map(['input2-1', 'input2-2'], 'input2-3', function(handler){
            return handler.getValue('input2-1') + handler.getValue('input2-2');
        })
        .map(['input2-3'], 'input2-4', function(handler){
            return handler.getValue('input2-3') * 2;
        })
    ;
}

function mapSection3(mapper){
    mapper
        .map(['input3-1', 'input3-2'], 'input3-9', function(handler){
            return handler.getValue('input3-1') + handler.getValue('input3-2');
        })
        .map(['input3-3', 'input3-4'], 'input3-10', function(handler){
            return handler.getValue('input3-3') + handler.getValue('input3-4');
        })
        .map(['input3-5', 'input3-6'], 'input3-11', function(handler){
            return handler.getValue('input3-5') + handler.getValue('input3-6');
        })
        .map(['input3-7', 'input3-8'], 'input3-12', function(handler){
            return handler.getValue('input3-7') + handler.getValue('input3-8');
        })
        .map(['input3-9', 'input3-10'], 'input3-13', function(handler){
            return handler.getValue('input3-9') + handler.getValue('input3-10');
        })
        .map(['input3-11', 'input3-12'], 'input3-14', function(handler){
            return handler.getValue('input3-11') + handler.getValue('input3-12');
        })
        .map(['input3-13', 'input3-14'], 'input3-15', function(handler){
            return handler.getValue('input3-13') + handler.getValue('input3-14');
        })
    ;
}

window.onload = function(){
    var domCrawler = eternityApp.getService('dom.crawler'),
        elements = domCrawler.getElements({tag: 'body'}, {tag: 'input', attributes: [{name: 'data-type', value: 'cell'}]}),
        mapper = eternityApp.getService('mapper');

    mapSection1(mapper);
    mapSection2(mapper);
    mapSection3(mapper);

    eternityApp.observe(elements, ['keyup']);
};