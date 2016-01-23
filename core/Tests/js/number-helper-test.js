function getNumberHelper(format, digits){
    return new Eternity.Helper.Number(format, digits);
}

QUnit.test('Testing number helper', function(assert){
    var helper = getNumberHelper('%d,%d', 2);
    
    assert.strictEqual(helper.parse('1'), 1, 'Parse string 1');
    assert.strictEqual(helper.parse('1.5'), 1.5, 'Parse string 1.5');
    assert.strictEqual(helper.parse('.1'), 0.1, 'Parse string .1');
    assert.strictEqual(helper.parse('1,1'), 1.1, 'Parse string 1,1');
    assert.strictEqual(helper.parse(',1'), 0.1, 'Parse string ,1');
});