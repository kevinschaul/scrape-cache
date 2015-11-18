module.exports = {
    extend: function(a, b) {
        var ret = a;
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                ret[key] = b[key];
            }
        }
        return ret;
    }
};
