function getAdapter(table, selector) {
    return new Eternity.Adapter.DOM.Element.Table(table, selector);
}

function buildMock(rowCount, cellCount, inputClass) {
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var row;
    var cell;
    var rowIndex;
    var cellIndex;
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    for (rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        row = createRow(table, -1);
        for (cellIndex = 0; cellIndex < cellCount; cellIndex++) {
            cell = createCell(row, -1);
            cell.appendChild(createInput(inputClass, rowIndex, cellIndex));
        }
    }
    
    return table;
}

function createRow(table, index) {
    return table.insertRow(index);
}

function createCell(row, index) {
    return row.insertCell(index);
}

function createInput(clazz, row, cell) {
    var input = document.createElement('input');
    
    input.setAttribute('type', 'text');
    input.classList.add(clazz);
    
    input.value = row + cell;
    
    return input;
}

QUnit.test('Unit | Adapter | Table get/set', function(assert) {
    var selector = 'cls';
    var table = buildMock(10, 5, selector);
    var adapter = getAdapter(table, '.' + selector);
    
    assert.equal(adapter.getValue(1, 1), 0, 'Value at row: 1 and cell: 1 is zero');
    adapter.setValue(1, 1, 300);
    assert.equal(adapter.getValue(1, 1), 300, 'Value at row: 1 and cell: 1  changed to 300');
});

QUnit.test('Unit | Adapter | Table notify', function(assert) {
    var selector = 'cls';
    var table = buildMock(10, 5, selector);
    var adapter = getAdapter(table, '.' + selector);
    var params = {};
    
    table.addEventListener('change', function(event) {
        params = event.params;
    });
    
    adapter.setValue(1, 1, 200);
    
    assert.deepEqual(params, {cell: 1, row: 1, target: adapter.getCell(1, 1)}, 'Hook invoked successfully');
});