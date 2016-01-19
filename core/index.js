var eternityApp = (function(){
    return new Eternity.App();
})();

window.onload = function(){
    var domCrawler = eternityApp.getService('dom.crawler'),
        elements = domCrawler.getElements({tag: 'body'}, {tag: 'input', attributes: [{name: 'data-type', value: 'cell'}]});

    eternityApp.observe(elements, ['keypress']);
};