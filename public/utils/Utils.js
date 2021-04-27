var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * Esse método faz um loop entre os parentes do elemento inicial inserido
     * e depois retorna em um callback o elemento PAI que tem o elemento ALVO como seu FILHO.
     * @param el
     * @param targetEl
     * @param callback
     */
    Utils.findElementThroughtParents = function (el, targetEl, callback) {
        while (el) {
            if (el.querySelector(targetEl))
                break;
            el = el.parentElement;
        }
        el == null ? console.warn('Elemento parente não encontrado')
            : callback(el);
    };
    /**
     * Aplica uma máscara (padrão) na input do elemento.
     * @param mask Estrutura da máscara (# = números 0 a 9) Exemplo: ####-####-####
     * @param el Elemento html do input a ser tratado
     */
    Utils.applyInputMask = function (mask, el) {
        var i = el.value.length;
        var output = mask.substring(1, 0);
        var text = mask.substring(i);
        if (text.substring(0, 1) != output) {
            el.value += text.substring(0, 1);
        }
    };
    Utils.isExceptionKeys = function (e, exceptionString) {
        var exceptionKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
        return exceptionKeys.includes(e.key) || e.key == exceptionString;
    };
    Utils.formatInput = function (_a) {
        var _this = this;
        var inputDOM = _a.inputDOM, _b = _a.type, type = _b === void 0 ? 'number' : _b, _c = _a.exceptionString, exceptionString = _c === void 0 ? '' : _c, mask = _a.mask, maxLength = _a.maxLength;
        var input = document.querySelector(inputDOM);
        input.onkeydown = function (e) {
            if (e.ctrlKey || _this.isExceptionKeys(e, exceptionString)) {
                return;
            }
            else {
                mask && _this.applyInputMask(mask, input);
                if (input.value.length >= maxLength) {
                    return false;
                }
                else {
                    switch (type) {
                        case 'number':
                            return !(new RegExp(/[^0-9]/g).test(e.key));
                        default:
                            return;
                    }
                }
            }
        };
    };
    return Utils;
}());
