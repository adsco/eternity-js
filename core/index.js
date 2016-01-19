var eternityApp = (function(){
    return new Eternity.App();
})();

window.onload = function(){
    var domCrawler = eternityApp.getService('dom.crawler'),
        elements = domCrawler.getElements({tag: 'body'}, {tag: 'input', attributes: [{name: 'data-type', value: 'cell'}]}),
        mapper = eternityApp.getService('mapper');

    mapper.add('input1', 'input2', function(handler){
        return handler.getMyValue('input1') * 2;
    });

    eternityApp.observe(elements, ['keyup']);
};