var util = require('../src/util.js');

exports.extend = {
    base: function(test) {
        var a = {
            key: 'value'
        };
        var b = {
            another: 'other'
        };
        var expected = {
            key: 'value',
            another: 'other'
        };
        var actual = util.extend(a, b);
        console.log(a);
        test.deepEqual(expected, actual);
        test.done();
    }
};
