var eternityApp = (function(){
    return new Eternity.App();
})();

window.onload = function(){
    var domCrawler = eternityApp.getService('dom.crawler'),
        elements = domCrawler.getElements({tag: 'body'}, {tag: 'input', attributes: [{name: 'data-type', value: 'cell'}]}),
        mapper = eternityApp.getService('mapper');

    mapper.map('input1-1', 'input1-2', function(handler){
        return handler.getValue('input1-1') * 2;
    });

    eternityApp.observe(elements, ['keyup']);
};