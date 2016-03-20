function getDataProvider() {
    return new Eternity.Components.Provider.Data(
        {
              getSingle: function() {
                  var element = document.createElement('input');

                  element.value = 125;

                  return element;
              }
        },
        //crawler is not used for now @date 12.01.2016
        {

        }
    );
}

QUnit.test('DataProvider test', function(assert) {
    var provider = getDataProvider();

    assert.equal(provider.getValue(), '125', 'Testing getValue');
    assert.notEqual(provider.getValue(), '126', 'Testing getValue, should fail');
});