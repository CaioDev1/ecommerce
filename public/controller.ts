/* interface ControllerInterface {
    el?: Object
}

class Controller {
    el: NodeListOf<HTMLElement>
    
    constructor() {
        this.loadElements()
    }

    getCamelCase(classText: string) {
        let div = document.createElement('div') 

        div.innerHTML = `<div data-${classText}="class"></div>`
        
        return Object.keys((div.firstChild as HTMLDivElement).dataset)[0]
    }

    loadElements() {
        this.el

        document.querySelectorAll('body [class]').forEach(element => {
            this.el[this.getCamelCase(element.className)] = element
        })
    }

    elementsPrototype() {
        HTMLElement.prototype.show = function(display='flex') {
            this.style.display = display

            return this
        }

        HTMLElement.prototype.hide = function() {
            this.style.display = 'none'

            return this
        } 
    }
}

let controller = new Controller() */