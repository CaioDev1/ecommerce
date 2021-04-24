interface IformatInput {
    type?: 'number' | 'string',
    inputDOM: string,
    maxLength: number,
    exceptionString?: string,
    mask?: string
}

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

    /**
     * Aplica uma máscara (padrão) na input do elemento.
     * @param mask Estrutura da máscara (# = números 0 a 9) Exemplo: ####-####-####
     * @param el Elemento html do input a ser tratado
     */
    static applyInputMask(mask: string, el: HTMLInputElement) {
        let i = el.value.length;
        let output = mask.substring(1,0)
        let text = mask.substring(i)

        if (text.substring(0,1) != output) {
            el.value += text.substring(0,1)
        }
    }

    static isExceptionKeys(e: KeyboardEvent, exceptionString: string) {
        let exceptionKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab']

        return exceptionKeys.includes(e.key) || e.key == exceptionString
    }

    static formatInput({inputDOM, type='number', exceptionString='', mask, maxLength}: IformatInput) {
        let input = document.querySelector(inputDOM) as HTMLInputElement

        input.onkeydown = e => {
            if(this.isExceptionKeys(e, exceptionString)) {
                return
            } else {
                mask && this.applyInputMask(mask, input)

                if(input.value.length >= maxLength) {
                    return false
                } else {
                    switch(type) {
                        case 'number':
                            return !(new RegExp(/[^0-9]/g).test(e.key))
                        default:
                            return
                    }
                }
            }
        }
    }
}