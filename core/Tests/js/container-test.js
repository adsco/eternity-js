function getContainer(){
    var container = new Eternity.Container.Container();
    
    addMockData(container);
    
    return container;
}

function addMockData(container){
    container.register('mock1', 'Mock1');
    container.register('mock2', 'Mock2', ['@mock3']);
    container.register('mock3', 'Mock3', ['Sterling', 'Pound']);
    container.register('mock4', 'Mock4', ['@mock1', '@mock2', '@mock3']);
    container.register('mock5', 'Mock5');
    
    return container;
}

var mock1Count = 0;
function Mock1(){
    var _args = [];
    
    var _construct = function(){
        mock1Count++;
    };
    
    this.getArguments = function(){
        return _args;
    };
    
    _construct.call(this);
}

function Mock2(mock3){
    var _args = [];
    
    var _construct = function(mock3){
        _args.push(mock3);
    };
    
    this.getArguments = function(){
        return _args;
    };
    
    _construct.call(this, mock3);
}

function Mock3(currency, measure){
    var _args = [];
    
    var _construct = function(currency, measure){
        _args.push(currency);
        _args.push(measure);
    };
    
    this.getArguments = function(){
        return _args;
    };
    
    _construct.call(this, currency, measure);
}

function Mock4(mock1, mock2, mock3){
    var _args = [];
    
    var _construct = function(mock1, mock2, mock3){
        _args.push(mock1);
        _args.push(mock2);
        _args.push(mock3);
    };
    
    this.getArguments = function(){
        return _args;
    };
    
    _construct.call(this, mock1, mock2, mock3);
}

QUnit.test('Container test', function(assert){
    var container = getContainer();
    
    assert.throws(function(){container.register('mock1');}, new Error('Name "mock1" already reserved'), 'Register new class using already registered name');
    assert.throws(function(){container.register()}, new Error('Name required, given arguments are: "undefined", "undefined", [no arguments]'), 'Try to register class without name');
    assert.throws(function(){container.register('')}, new Error('Name required, given arguments are: "", "undefined", [no arguments]'), 'Try to register class with empty name');
    assert.throws(function(){container.register('  ')}, new Error('Name required, given arguments are: "  ", "undefined", [no arguments]'), 'Try to register class with name that contains only spaces');
    assert.throws(function(){container.create('mock0');}, new Error('Class "mock0" is not registered'), 'Try to create class instance that has not been registered yet');
    assert.throws(function(){container.create('mock5');}, new Error('Class "Mock5" is not found'), 'Try to create class instance with inexisting class name');
    
    assert.deepEqual(container.create('mock1').getArguments(), [], 'Create class instance with no arguments in constructor');
    assert.deepEqual(container.create('mock2').getArguments(), [new Mock3()], 'Create class instance with class as argument in constructor');
    assert.deepEqual(container.create('mock3').getArguments(), ['Sterling', 'Pound'], 'Create class instance with plain text as arguments in constructor');
    assert.deepEqual(
        container.create('mock4').getArguments(),
        [
            new Mock1(),
            new Mock2(new Mock3('Sterling', 'Pound')),
            new Mock3('Sterling', 'Pound')
        ],
        'Create class instance with mixed arguments in constructor'
    );
    
    container.create('mock1');
    container.create('mock1');
    container.create('mock1');
    
    //2 since 1 Mock1 object created by hand
    assert.equal(mock1Count, 2, 'Check number of Mock1 instances created');
});