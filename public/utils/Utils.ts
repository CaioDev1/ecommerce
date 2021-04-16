class Utils {
    /**
     * Esse método faz um loop entre os parentes do elemento inicial inserido
     * e depois retorna em um callback o elemento PAI que tem o elemento ALVO como seu FILHO. 
     * @param el 
     * @param targetEl 
     * @param callback 
     */
    static findElementThroughtParents(el: HTMLElement, targetEl: string, callback: (el: HTMLElement) => void) {
        while(el) {
            if(el.querySelector(targetEl)) break

            el = el.parentElement
        }

        el == null ? console.warn('Elemento parente não encontrado')
        : callback(el)
    }
}