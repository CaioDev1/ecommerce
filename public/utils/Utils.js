var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.findElementThroughtParents = function (el, targetEl, callback) {
        while (el) {
            if (el.querySelector(targetEl))
                break;
            el = el.parentElement;
        }
        el == null ? console.warn('Elemento parente não encontrado')
            : callback(el);
    };
    return Utils;
}());
