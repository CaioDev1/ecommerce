class InterfaceController {
    constructor() {
        this.handleHeader()
        this.toggleContent()
    }

    // troca entre o header do desktop e mobile
    switchHeader(device: string) {
        (<HTMLElement>document.querySelector('.home-page-header.desktop')).style.display = device == 'desktop' ? 'flex' : 'none';
        (<HTMLElement>document.querySelector('.home-page-header.mobile')).style.display = device == 'mobile' ? 'flex' : 'none'
    }

    toggleHeaderMenu() {
        let headerBurguerField = document.querySelector('#header-burguer-field') as HTMLElement
    
        document.querySelector('.home-page-header-aside.mobile.left button').addEventListener('click', e => {
            if(headerBurguerField.className != 'active') headerBurguerField.style.height = 'initial'

            headerBurguerField.classList.toggle('active')
        })
    }

    handleHeaderScrollAnimation() {
        document.onscroll = e => {
            (document.querySelectorAll('.home-page-header .slideTab') as NodeListOf<HTMLElement>).forEach((el) => {

                if(window.scrollY !== 0) {
                    el.style.width = '100vw'
                } else {
                    el.style.width = '0vw'
                }
            })
        }
    }

    handleHeader() {
        let matchMedia = window.matchMedia('(min-width: 900px)')

        this.switchHeader(matchMedia.matches ? 'desktop' : 'mobile')

        matchMedia.addEventListener('change', e => {
            this.switchHeader(matchMedia.matches ? 'desktop' : 'mobile')
        })

        this.toggleHeaderMenu()
        this.handleHeaderScrollAnimation()
        this.handleSignUp()
    }

    togglePlusMinesIcon(isOpen: boolean, el: Element) {
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

        let updatedIcon = isOpen ? minesIcon : plusIcon

        let createIcon = function createIcon(content: string) {
            let svg = document.createElement('div')
            
            svg.innerHTML = content
        
            return svg.firstElementChild
        }
            
        el.replaceChild(createIcon(updatedIcon), el.querySelector('svg'))
    }

    toggleContent(): boolean{
        try {
            document.querySelectorAll('.toggle').forEach(el => {
                el.addEventListener('click', e => {
                    let target = e.target as HTMLElement
                    
                    let parentElTree = target
                    let isListOpen: boolean
    
                    while(parentElTree) {
                        if(parentElTree.querySelector('.toggleable')) {
                            isListOpen = parentElTree.querySelector('.toggleable').classList.toggle('active')
    
                            break
                        }
    
                        parentElTree = parentElTree.parentElement
                    }
    
                    this.togglePlusMinesIcon(isListOpen, el)
    
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
    }

    toggleScrollArrow(event: Event, arrowIcon: HTMLElement) {
        let element = event.target as HTMLElement;
        
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            arrowIcon.style.visibility = 'hidden'
        } else {
            arrowIcon.style.visibility = 'initial'
        }
    }
    
    isScrollable(element: Element) {
        return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
    }

    handleScrollArrow(parentElString: string = 'section#product-buy aside', arrowElString: string = '#arrow-icon') {
        let parentOfArrowElement = document.querySelector(parentElString);
        let arrowIcon = document.querySelector(arrowElString) as HTMLElement

        if(this.isScrollable(parentOfArrowElement)) {
            arrowIcon.style.visibility = 'initial'
        } else {
            arrowIcon.style.visibility = 'hidden'
        }

        parentOfArrowElement.addEventListener('scroll', (e) => this.toggleScrollArrow(e, arrowIcon));
    }

    toggleCarouselUsage(matches: boolean, carouselList: String[], firstCheck=false) {
        if(matches) {
            for(let item of carouselList) {
                (<any>$(item)).slick();
            }
        } else {
            if(!firstCheck) {
                for(let item of carouselList) {
                    (<any>$(item)).slick('unslick');
                }
            }
        }
    }

    handleCarouselSlider(carouselList: String[]) {
        let matchSize = window.matchMedia('(max-width: 1000px)')

        this.toggleCarouselUsage(matchSize.matches, carouselList, true)

        matchSize.onchange = (e) => this.toggleCarouselUsage(e.matches, carouselList)
    }

    handleSignUp() {
        let signUpContainer = document.querySelector('#sign-up-container')

        document.querySelector('#sign-up-close-button').addEventListener('click', e => {
            signUpContainer.classList.toggle('on')
        })

        document.querySelector('#sign-up-open-button').addEventListener('click', e => {
            signUpContainer.classList.toggle('on')
        })
    }
}