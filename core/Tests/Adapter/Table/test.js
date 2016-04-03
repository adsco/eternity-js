window.onload = function() {
    var tableElement = document.getElementById('test-table');
    var table = new Eternity.Adapter.DOM.Element.Table(tableElement, '.data-control');
    
    table.setValue(1, 1, 100);
    table.setValue(1, 4, 400);
    table.setValue(3, 4, 1200);
    console.log(table.getValue(1, 1));
    console.log(table.getValue(1, 4));
    console.log(table.getValue(3, 4));
};