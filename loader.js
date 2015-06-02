// https://gist.github.com/cferdinandi/ece94569aefcffa5f7fa
(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define([], factory(root));
    } else {
        root.ajaxLoader = factory(root);
    }
})(window, function(root) {
    // main function here
    // check for support
    var supports = !!document.querySelector && !!root.addEventListener; // Feature test
    if ( !supports ) return;

    var ajaxLoader = {};

    //####fucntions

    /**
     * @link http://jonraasch.com/blog/javascript-style-node
     * @param styles
     */
    var appendStyle  = function(styles) {
        var css = document.createElement('style');
        css.type = 'text/css';

        if (css.styleSheet) css.styleSheet.cssText = styles;
        else css.appendChild(document.createTextNode(styles));

        document.getElementsByTagName("head")[0].appendChild(css);
    };

    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
     */
    var appendDiv = function() {
        var div = document.createElement("div");
        div.classList.add('modal');
        document.body.appendChild(div);
    };

    /**
     * A simple forEach() implementation for Arrays, Objects and NodeLists
     * @private
     * @param {Array|Object|NodeList} collection Collection of items to iterate
     * @param {Function} callback Callback function for each iteration
     * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
     */
    var forEach = function (collection, callback, scope) {
        if (Object.prototype.toString.call(collection) === '[object Object]') {
            for (var prop in collection) {
                if (Object.prototype.hasOwnProperty.call(collection, prop)) {
                    callback.call(scope, collection[prop], prop, collection);
                }
            }
        } else {
            for (var i = 0, len = collection.length; i < len; i++) {
                callback.call(scope, collection[i], i, collection);
            }
        }
    };

    /**
     * Merge defaults with user options
     * @private
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     * @returns {Object} Merged values of defaults and options
     */
    var extend = function ( defaults, options ) {
        var extended = {};
        forEach(defaults, function (value, prop) {
            extended[prop] = defaults[prop];
        });
        forEach(options, function (value, prop) {
            extended[prop] = options[prop];
        });
        return extended;
    };

    //######## defaults
    var defaults = {
        classModal : {
            display : 'none',
            position : 'fixed',
            "z-index" : 1000,
            top : 0,
            left : 0,
            height : '100%',
            width : '100%',
            background : "rgba(255, 255, 255, .8) url('http://i.stack.imgur.com/FhHRx.gif') 50% 50% no-repeat",
        },
        classLoading : {
            overflow : 'hidden'
        },
        classLoadingModal : {
            display : 'block'
        }
    };

    ajaxLoader.defaults = defaults;
    ajaxLoader.merged = {};

    ajaxLoader.init = function () {
        var merged;
        if(root.ajaxLoaderParams) {
            merged = extend(defaults, root.ajaxLoaderParams);
        } else {
            merged = defaults;
        }
        ajaxLoader.merged = merged;

        // link for original loader http://i.stack.imgur.com/FhHRx.gif
        var styles = ".modal {";
        forEach(merged['classModal'], function(value, prop) {
            styles += prop + ': ' + value + ';'
        });
        styles = "} ";
        styles = "body.loading {";
        forEach(merged['classLoading'], function(value, prop) {
            styles += prop + ': ' + value + ';'
        });
        styles = "} ";
        styles = "body.loading .modal {";
        forEach(merged['classLoadingModal'], function(value, prop) {
            styles += prop + ': ' + value + ';'
        });
        styles = "} ";

        appendStyle(styles);
        appendDiv();
    };

    // we can disable this functionality to allow user call init func directly
    if(root.ajaxLoaderParams && root.ajaxLoaderParams.hasOwnProperty('customInit') && root.ajaxLoaderParams['customInit'] == true) {
        return ajaxLoader;
    }

    ajaxLoader.init();
    return ajaxLoader;
});