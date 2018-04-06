"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a cache new object
 */
function createAdvancedCache(strategy) {
    var data = {};
    var o = null;
    function get() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length === 0) {
            throw new Error('Item not found in cache.');
        }
        var key = args[0];
        var fn = args.length > 1 ? args[1] : undefined;
        var transformFn = args.length > 2 ? args[2] : undefined;
        if (!fn || data[key]) {
            return new Promise(function (res, rej) {
                if (data[key]) {
                    res(data[key]);
                }
                else {
                    rej();
                }
            });
        }
        return fn(o)
            .then(function (c) {
            data[key] = transformFn ? transformFn(c) : c;
            return data[key];
        });
    }
    function set(key, val) {
        data[key] = val;
        return this;
    }
    return o = {
        get: get,
        set: set
    };
}
exports.createAdvancedCache = createAdvancedCache;
;
