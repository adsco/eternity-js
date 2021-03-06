function getDomRepository() {
    return {
        values: {},
        index: 0,
        getValue: function(id) {
            return this.values[id];
        },
       
        setValues: function(values) {
            this.values = values;
        }
    };
}

function getReader(domRepository) {
    return new Eternity.Components.Worker.Reader.Reader(domRepository);
}

QUnit.test('Unit | Worker reader test', function(assert) {
    var domRepository = getDomRepository();
    var reader = getReader(domRepository);
    var map;
    
    map = [{id: 'ns1'}, {id: 'ns2'}];
    domRepository.setValues({ns1: '2', ns2: '4'});
    assert.deepEqual(reader.read(map), {ns1: "2", ns2: "4"}, 'Read success, id property used in result');
    
    map = [{id: 'bs1', key: 'b1'}, {id: 'bs2', key: 'b2'}];
    domRepository.setValues({b1: '1', b2: '2'});
    assert.deepEqual(reader.read(map), {b1: '1', b2: '2'}, 'Read success, key property used in result');
    
    map = [{id: 'cs1'}, {id: 'cs2', key: 'c2'}];
    domRepository.setValues({cs1: '0', c2: '1'});
    assert.deepEqual(reader.read(map), {cs1: '0', c2: '1'}, 'Read success, mixed key|id properties used in result');
});