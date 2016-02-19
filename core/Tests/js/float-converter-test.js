function getConverter() {
  return new Eternity.Components.Converter.Float();
}

QUnit.test('Testing float converter', function(assert) {
  var converter = getConverter();

  assert.strictEqual(converter.get('1'), 1, 'Testing 1 string to float');
  assert.strictEqual(converter.get('1.1'), 1.1, 'Testing 1.1 string to float');
  assert.strictEqual(converter.get('1,1'), 1.1, 'Testing 1,1 string to float');
  assert.strictEqual(converter.get('.1'), 0.1, 'Testing .1 string to float');
  assert.strictEqual(converter.get(',1'), 0.1, 'Testing ,1 string to float');
  assert.strictEqual(converter.get('1,1,1'), 1.1, 'Testing 1,1,1 string to float');
  assert.strictEqual(converter.get('1.1.1'), 1.1, 'Testing 1.1.1 string to float');
});

QUnit.test('Testing float to string convertion', function(assert) {
  var converter = getConverter();

  assert.strictEqual(converter.toString(1), '1', 'Testing 1 number to string');
  assert.strictEqual(converter.toString(1.1), '1,1', 'Testing 1.1 number to string');
  assert.strictEqual(converter.toString(.1), '0,1', 'Testing .1 number to string');
});