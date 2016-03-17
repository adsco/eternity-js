function getDomRepository() {
    return {
        data: {},
        setValue: function(id, value) {
            this.data[id] = value;
        }
    };
}

function getWriter(domRepository) {
    return new Eternity.Components.Worker.Writer.Writer(domRepository);
}

QUnit.test('Unit | Eternity.Components.Worker.Writer', function(assert) {
    var domRepository = getDomRepository();
    var writer = getWriter(domRepository);
    var data;
    
    data = [{id: 'c1', value: 20}, {id: 'c2', value: 30}, {id: 'c3', value: 40}];
    writer.write(data);
    assert.deepEqual(domRepository.data, {c1: 20, c2: 30, c3: 40}, 'Values are correctly set');
});