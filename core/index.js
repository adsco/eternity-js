var eternityApp = (function(){
    return new Eternity.App();
})();

window.onload = function(){
    var domCrawler = eternityApp.getService('dom.crawler'),
        elements = domCrawler.getElements({tag: 'body'}, {tag: 'input', attributes: [{name: 'data-type', value: 'cell'}]}),
        mapper = eternityApp.getService('mapper');

    mapper
        .map(['input1-1'], 'input1-2', function(handler){
            return handler.getValue('input1-1') * 2;
        })
        .map(['input2-1', 'input2-2'], 'input2-3', function(handler){
            return handler.getValue('input2-1') + handler.getValue('input2-2');
        })
        .map(['input2-3'], 'input2-4', function(handler){
            return handler.getValue('input2-3') * 2;
        })
    ;

    eternityApp.observe(elements, ['keyup']);
};