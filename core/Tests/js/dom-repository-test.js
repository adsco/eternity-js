function getDOMRepository() {
    return new Eternity.Components.DOM.Repository();
}

function getElements() {
    var element1 = document.createElement('input'),
        element2 = document.createElement('input'),
        element3 = document.createElement('input');

    element1.id = '1';
    element2.id = '2';
    element3.id = '3';

    return [
        element1,
        element2,
        element3
    ];
}

QUnit.test('DOM Repository test', function(assert) {
    var domRepository = getDOMRepository(),
        elements = getElements();

    domRepository.add(elements[0]);
    assert.throws(
        function(){
            domRepository.add(elements[0]);
        },
        new Error('Element with id "1" already registered'),
        'Add element with already registered id'
    );

    domRepository.add([elements[1], elements[2]]);
    assert.throws(
        function(){
            domRepository.add(elements);
        },
        new Error('Element with id "1" already registered'),
        'Testing add elements to repository, with already registerd ids, should throw error'
    );

    assert.deepEqual(domRepository.getSingle('1'), elements[0], 'Testing getSingle');
    assert.deepEqual(domRepository.get(['1', '2']), [elements[0], elements[1]], 'Testing get elements');
});