/**
     * 
     * @param elClick Elemento que vai ser clicado
     * @param elToggle Elemento do qual vai ser ativado ou desativado
     * @param callback Callback da função repassando o elemento HTML clicado o ícone escolhido
     * @returns boolean
*/

interface itemInterface {
    elClick: string,
    elToggle: string
}

function toggleContent(items: Array<itemInterface>, callback: (icon: string, el: Element) => void): void {
    items.map(({elClick, elToggle}) => {
        try {
            document.querySelectorAll(elClick).forEach(el => {
                el.addEventListener('click', e => {
                    let target = e.target as HTMLElement
                    
                    let parentElTree = target
                    let isListOpen: boolean
    
                    while(parentElTree) {
                        if(parentElTree.querySelector(elToggle)) {
                            isListOpen = parentElTree.querySelector(elToggle).classList.toggle('active')
    
                            break
                        }
    
                        parentElTree = parentElTree.parentElement
                    }
    
                    let plusIcon = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 0H7V7L0 7V9H7V16H9V9H16V7L9 7V0Z" fill="#000F08"/>
                    </svg>
                    `
    
                    let minesIcon = `
                        <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="2" width="2" height="16" transform="rotate(-90 0 2)" fill="#000F08"/>
                        </svg>  
                    `
    
                    let updatedIcon = isListOpen ? minesIcon : plusIcon
    
                    callback(updatedIcon, el)
    
                    return
                })
            })
        } catch (error) {
            console.log(`
                Erro na função changePlusMinesIcon:
                Mensagem do navegador: ${error}
            `)
            return false
        }
    })
}