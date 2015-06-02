(function() {
    /**
     * @link http://jonraasch.com/blog/javascript-style-node
     * @param styles
     */
    function appendStyle(styles) {
        var css = document.createElement('style');
        css.type = 'text/css';

        if (css.styleSheet) css.styleSheet.cssText = styles;
        else css.appendChild(document.createTextNode(styles));

        document.getElementsByTagName("head")[0].appendChild(css);
    }

    function appendDiv() {
        var div = document.createElement("div");
        div.classList.add('modal');
        document.body.appendChild(div);
    }

    var styles = ".modal {" +
        "display: none;" +
        "position: fixed;" +
        "z-index: 1000;" +
        "top: 0;" +
        "left: 0;" +
        "height: 100%;" +
        "width: 100%;" +
        "background: rgba(255, 255, 255, .8) url('http://i.stack.imgur.com/FhHRx.gif') 50% 50% no-repeat;" +
        "}" +
        "body.loading { overflow: hidden; }" +
        "body.loading .modal { display: block; }";

    window.onload = function() {
        appendStyle(styles);
        appendDiv();
    };
})();

