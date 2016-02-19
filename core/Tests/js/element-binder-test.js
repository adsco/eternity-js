function getElementBinder() {
  return new Eternity.Components.DOM.Element.Binder();
}

function getConfig() {
  return {
    events: ['change'],
    handler: null
  };
}

QUnit.test('Element binder test', function(assert) {
    var binder = getElementBinder(),
        events = ['change'],
        el = document.createElement('input'),
        handler,
        result;
    
    handler = function(){result = 1;};
    binder.attachListener(el, events, handler);
    el.dispatchEvent(new Event('change'));
    assert.equal(result, 1, 'Testing change event listener attach');
    
    handler = function(){result = 2;};
    binder.attachListener(el, events, handler);
    el.dispatchEvent(new Event('change'));
    assert.notEqual(result, 1, 'Testing change event listener attach, should fail');
});