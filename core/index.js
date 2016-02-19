var eternityApp = (function(){
  return new Eternity.App();
})();

function mapSection1(mapper) {
  mapper.map(['input1-1'], 'input1-2', function(handler){
    return handler.getValue('input1-1') * 2;
  });
}

function mapSection2(mapper) {
  mapper
    .map(['input2-1', 'input2-2'], 'input2-3', function(handler){
      return handler.getValue('input2-1') + handler.getValue('input2-2');
    })
    .map(['input2-3'], 'input2-4', function(handler){
      return handler.getValue('input2-3') * 2;
    })
  ;
}

function mapSection3(mapper) {
  mapper
    .map(['input3-1', 'input3-2'], 'input3-9', function(handler){
      return handler.getValue('input3-1') + handler.getValue('input3-2');
    })
    .map(['input3-3', 'input3-4'], 'input3-10', function(handler){
      return handler.getValue('input3-3') + handler.getValue('input3-4');
    })
    .map(['input3-5', 'input3-6'], 'input3-11', function(handler){
      return handler.getValue('input3-5') + handler.getValue('input3-6');
    })
    .map(['input3-7', 'input3-8'], 'input3-12', function(handler){
      return handler.getValue('input3-7') + handler.getValue('input3-8');
    })
    .map(['input3-9', 'input3-10'], 'input3-13', function(handler){
      return handler.getValue('input3-9') + handler.getValue('input3-10');
    })
    .map(['input3-11', 'input3-12'], 'input3-14', function(handler){
      return handler.getValue('input3-11') + handler.getValue('input3-12');
    })
    .map(['input3-13', 'input3-14'], 'input3-15', function(handler){
      return handler.getValue('input3-13') + handler.getValue('input3-14');
    })
  ;
}

function mapSection4(mapper) {
  mapper
    .map(['input4-1'], 'input4-2', function(handler){
      return handler.getValue('input4-1') * 2;
    })
    .map(['input4-1'], 'input4-3', function(handler){
      return handler.getValue('input4-1') + 2;
    })
    .map(['input4-4'], 'input4-5', function(handler){
      return handler.getValue('input4-4') * 3;
    })
    .map(['input4-4'], 'input4-6', function(handler){
      return handler.getValue('input4-4') + 4;
    })
  ;
}

function addSection1Constraints(vMapper) {
  vMapper
    .add('input1-1', function(dataProvider){
      return dataProvider.getValue('input1-1') > 55;
    }, 'This value should be greater than 55')
    .add('input1-2', function(dataProvider){
      return dataProvider.getValue('input1-2') < 200;
    }, 'This value should be less than 200')
  ;
}

window.onload = function() {
  var domCrawler = eternityApp.getService('dom.crawler'),
      elements = domCrawler.getElements({tag: 'body'}, {tag: 'input', attributes: [{name: 'data-type', value: 'cell'}]}),
      mapper = eternityApp.getService('mapper'),
      vMapper = eternityApp.getService('helper.validation');

  mapSection1(mapper);
  mapSection2(mapper);
  mapSection3(mapper);
  mapSection4(mapper);

  addSection1Constraints(vMapper);

  eternityApp.observe(elements, ['doubleclick']);

  var btn1 = document.getElementById('btn-1'),
      btn2 = document.getElementById('btn-2');

  btn1.addEventListener('click', function(e) {
    var event = new Event('update-value-all');

    this.dispatchEvent(event);
  });

  btn2.addEventListener('click', function(e) {
    var event = new Event('validate-all');

    this.dispatchEvent(event);
  });

  eternityApp.observe([btn1], ['update-value-all']);
  eternityApp.observe([btn2], ['validate-all']);
};