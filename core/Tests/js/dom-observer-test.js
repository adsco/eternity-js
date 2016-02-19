function getDomObserver() {
  var domObservable = new Eternity.Components.DOM.Observer(
    new Eternity.Components.DOM.Element.Binder(),
    {
      resolve: function(element, e){
        console.log(element, e);
      }
    }
  );

  return domObservable;
}

function getInput() {
  var container = document.getElementById('environment'),
      input = document.createElement('input');

  container.appendChild(input);

  return input;
}

QUnit.test('DOMObserver test', function(assert) {
  var domObservable = getDomObserver(),
      input = getInput();

  domObservable.observe([input], ['change', 'keypress']);

  assert.equal();
});