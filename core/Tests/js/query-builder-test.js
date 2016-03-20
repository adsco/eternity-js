function getQueryBuilder() {
    return new Eternity.Helper.QueryBuilder();
}

QUnit.test('Empty query creation', function(assert) {
    var builder = getQueryBuilder();

    assert.throws(
        builder.createQuery().getQuery,
        new Error('Cannot create query, tag, id, classes or attributes must be set'),
        'Empty query creation, should throw exception'
    );
});

QUnit.test('Tag query creation', function(assert) {
    var builder = getQueryBuilder();

    assert.equal(
        builder.createQuery().setTag('a').getQuery(),
        'a',
        'a tag query creation'
    );
    assert.equal(
        builder.createQuery().setTag('p').setTag('a').getQuery(),
        'a',
        'Tag substitution from p to a'
    );
});

QUnit.test('Id query creation', function(assert) {
    var builder = getQueryBuilder();

    assert.equal(
        builder.createQuery().setId('id').getQuery(),
        '#id',
        'Id query creation'
    );
    assert.equal(
        builder.createQuery().setId('id1').setId('id2').getQuery(),
        '#id2',
        'Id substitution from id1 to id2'
    );
});

QUnit.test('Class query creation', function(assert) {
    var builder = getQueryBuilder();

    assert.equal(
        builder.createQuery().addClass('class').getQuery(),
        '.class',
        'Single class query creation'
    );
    assert.equal(
        builder.createQuery().addClass('class1').addClass('class2').getQuery(),
        '.class1.class2',
        'Multiple class query creation'
    );
});

QUnit.test('Attribute query creation', function(assert) {
    var builder = getQueryBuilder();

    assert.equal(
        builder.createQuery().addAttribute({name: 'attr', value: 12}).getQuery(),
        '[attr="12"]',
        'Single attribute query creation'
    );
    assert.equal(
        builder
            .createQuery()
            .addAttribute({name: 'attr1', value: 1})
            .addAttribute({name: 'attr2', value: 2})
            .getQuery()
        ,
        '[attr1="1"][attr2="2"]',
        'Multiple attribute query creation'
    );
});

QUnit.test('Complex query creation', function(assert) {
    var builder = getQueryBuilder();

    assert.equal(
        builder
            .createQuery()
            .setTag('a')
            .setId('id')
            .addClass('class')
            .addAttribute({name: 'attr', value: '1'})
            .getQuery()
        ,
        'a#id.class[attr="1"]',
        'Complex query creation'
    );
});

QUnit.test('Named/Unnamed query creation', function(assert) {
    var builder = getQueryBuilder();

    assert.equal(
        builder.createQuery().setTag('a').getQuery(),
        'a',
        'Unnamed query creation'
    );
    assert.equal(
        builder.createQuery('query').setTag('a').getQuery(),
        'a',
        'Named query creation'
    );
});