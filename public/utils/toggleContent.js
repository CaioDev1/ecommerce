/**
     *
     * @param elClick Elemento que vai ser clicado
     * @param elToggle Elemento do qual vai ser ativado ou desativado
     * @param callback Callback da função repassando o elemento HTML clicado o ícone escolhido
     * @returns boolean
*/
function toggleContent(items, callback) {
    items.map(function (_a) {
        var elClick = _a.elClick, elToggle = _a.elToggle;
        try {
            document.querySelectorAll(elClick).forEach(function (el) {
                el.addEventListener('click', function (e) {
                    var target = e.target;
                    var parentElTree = target;
                    var isListOpen;
                    while (parentElTree) {
                        if (parentElTree.querySelector(elToggle)) {
                            isListOpen = parentElTree.querySelector(elToggle).classList.toggle('active');
                            break;
                        }
                        parentElTree = parentElTree.parentElement;
                    }
                    var plusIcon = "\n                    <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9 0H7V7L0 7V9H7V16H9V9H16V7L9 7V0Z\" fill=\"#000F08\"/>\n                    </svg>\n                    ";
                    var minesIcon = "\n                        <svg width=\"16\" height=\"2\" viewBox=\"0 0 16 2\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                            <rect y=\"2\" width=\"2\" height=\"16\" transform=\"rotate(-90 0 2)\" fill=\"#000F08\"/>\n                        </svg>  \n                    ";
                    var updatedIcon = isListOpen ? minesIcon : plusIcon;
                    callback(updatedIcon, el);
                    return;
                });
            });
        }
        catch (error) {
            console.log("\n                Erro na fun\u00E7\u00E3o changePlusMinesIcon:\n                Mensagem do navegador: " + error + "\n            ");
            return false;
        }
    });
}
