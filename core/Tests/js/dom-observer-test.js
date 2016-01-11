function getDomObserver(){
    var domObservable = new DOMObserver(
        new DOMCrawler(
            new QueryBuilder()
        ),
        new ElementBinder(),
        {
            resolve: function(){}
        }
    );
    
    return domObservable;
}

function getTrackable(){
    return {
        //elements pattern
        pattern: {tag: 'input'},
        //events to listen
        events: ['change', 'keypress'],
        //attributes values to retrieve on event trigger
        signer: {
            sign: function(){ console.log('signing');}
        }
    };
}

function prepareInvironment(){
    var container = document.getElementById('environment'),
        input = document.createElement('input');
    
    container.appendChild(input);
}

QUnit.test('DOMObserver test', function(assert){
    var domObservable = getDomObserver(),
        trackable = getTrackable();
    
    prepareInvironment();
    
    domObservable.addTrackable(trackable);
    
    assert.equal();
});