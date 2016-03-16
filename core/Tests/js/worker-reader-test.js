function getDomRepository() {
   return {
       values: [],
       index: 0,
       getSingle: function(id) {
           var el = document.createElement('input');
           
           el.id = id;
           el.value = this.values[this.index];
           
           this.index++;
           
           return el;
       },
       
       setValues: function(values) {
           this.values = values;
           this.index = 0;
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
    domRepository.setValues([2, 4]);
    assert.deepEqual(reader.read(map), {ns1: "2", ns2: "4"}, 'Read success, id property used in result');
    
    map = [{id: 'bs1', key: 'b1'}, {id: 'bs2', key: 'b2'}];
    domRepository.setValues([1, 2]);
    assert.deepEqual(reader.read(map), {b1: '1', b2: '2'}, 'Read success, key property used in result');
    
    map = [{id: 'cs1'}, {id: 'cs2', key: 'c2'}];
    domRepository.setValues([0, 1]);
    assert.deepEqual(reader.read(map), {cs1: '0', c2: '1'}, 'Read success, mixed key|id properties used in result');
});