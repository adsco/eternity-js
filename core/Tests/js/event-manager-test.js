var value = 0;

function getEventManager() {
    return new Eternity.Components.EventManager.EventManager();
}

function getHandler() {
    return function() {
        value = 1;
    };
}

QUnit.test('Testing event manager register event', function(assert) {
    var eventManager = getEventManager();

    eventManager.registerEvent('event1');
    assert.throws(
        function(){eventManager.registerEvent();},
        new Error('Event name must be a non empty string'),
        'Testing register event without name'
    );
    assert.throws(
        function(){eventManager.registerEvent('');},
        new Error('Event name must be a non empty string'),
        'Testing register empty string event'
    );
    assert.throws(
        function(){eventManager.registerEvent('   ');},
        new Error('Event name must be a non empty string'),
        'Testing register space only string event'
    );
    assert.throws(
        function(){eventManager.registerEvent('event1');},
        new Error('Event "event1" already registered'),
        'Testing register already registered event'
    );
});

QUnit.test('Testing event manager subscribe and dispatch', function(assert) {
    var eventManager = getEventManager(),
        handler = getHandler();

    eventManager.registerEvent('event1');
    eventManager.subscribe('event1', handler);
    eventManager.dispatch('event1');
    assert.strictEqual(
        value,
        1,
        'Testing event handler, dispatch'
    );
    assert.throws(
        function(){eventManager.subscribe('event2', function(){});},
        new Error('Event "event2" is not registered'),
        'Testing subscribe on inexisting event'
    );
    assert.throws(
        function(){eventManager.dispatch('event2');},
        new Error('Cannot dispatch event "event2", event is not registered'),
        'Testing dispatch event that doesn\'t exists'
    );
});