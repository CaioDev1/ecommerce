interface IHandleMultistepForm {
    formDOM: string, 
    stepsButtons: {
        dom: string, 
        nextBtn: string,
        backBtn: string
    }, 
    callback?: (isNextStep: boolean) => void
}

class InterfaceController {
    constructor(page: string) {
        this.handleLoadingImages()
        
        let patternMethods = ['Home', 'Catalog', 'Bag', 'Product', 'Collections']
        
        if(patternMethods.includes(page)) {
            this.handleHeader()
            this.toggleContent()
        }

        switch(page) {
            case 'Home':
                this.handleHomePageRevealTransitions()
                break
            case 'Product':
                this.handleScrollArrow()
                this.handleCarouselMatchMediaTrigger(['#product-photo-field', '#product-extra-items'])
                this.handlePicker()
                this.handleAddToWishListButton()
                break
            case 'Catalog':
                this.handlePicker()
                this.handleAddToWishListButton()
                break
            case 'Checkout':
                this.handleCheckoutForm()
                this.handleCheckoutAddressAPICall()
                break
            case 'Loved Items':
                this.handlePageCarouselConfig('Loved Items')
                break
            case 'Collections':
                this.handlePageCarouselConfig('Collections')
        }
    }

    handleLoadingImages() {
        Promise.all(Array.from(document.images)
            .filter(img => !img.complete).map(img => new Promise(resolve => { 
                img.onload = img.onerror = resolve; 
            }))).then(() => {
                document.querySelector('.loading-container').classList.remove('active')
            });
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

    toggleHeaderSearch() {
        (document.querySelectorAll('.search-button') as NodeListOf<HTMLElement>).forEach(button => {
            button.onclick = () => {
                Utils.findElementThroughtParents(button, '.header-search-container', el => {
                    el.querySelector('.header-search-container').classList.add('active')
                })
            }
        });

        (document.querySelectorAll('.header-search-container') as NodeListOf<HTMLElement>).forEach(item => {
            let cancelButton = item.querySelector('.search-cancel-button') as HTMLElement
            let submitButton = item.querySelector('.search-submit-button') as HTMLElement

            cancelButton.onclick = () => {
                item.classList.remove('active')
            }
        })
    }

    handleHeader() {
        let matchMedia = window.matchMedia('(min-width: 900px)')

        this.switchHeader(matchMedia.matches ? 'desktop' : 'mobile')

        matchMedia.addEventListener('change', e => {
            this.switchHeader(matchMedia.matches ? 'desktop' : 'mobile')
        })

        this.toggleHeaderMenu()
        this.handleHeaderScrollAnimation()
        this.handleSign()
        this.toggleHeaderSearch()
    }

    togglePlusMinesIcon(isOpen: boolean, el: HTMLElement) {
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
            
        el.querySelector('.toggle').replaceChild(createIcon(updatedIcon), el.querySelector('svg'))
    }

    toggleContent() {
        document.querySelectorAll('.toggle').forEach(el => {
            el.addEventListener('click', e => {
                let startEl = e.target as HTMLElement
                let isListOpen: boolean

                Utils.findElementThroughtParents(startEl, '.toggleable', el => {
                    isListOpen = el.querySelector('.toggleable').classList.toggle('active')

                    this.togglePlusMinesIcon(isListOpen, el)
                })
            })
        })
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

    handleArrowScrollMutation(parentOfArrowElement: Element, arrowIcon: HTMLElement) {
        // ESCUTA QUANDO OS BOTÕES DE TOGGLE ATIVAREM O SCROLL
        let resizer = new ResizeObserver(e => {
            if(this.isScrollable(parentOfArrowElement)) {
                arrowIcon.style.visibility = 'initial'
            } else {
                arrowIcon.style.visibility = 'hidden'
            }
        })

        // ADICIONA OS TOGGLEABLES NO LISTENER DO RESIZER
        parentOfArrowElement.querySelectorAll('.toggleable').forEach((item: Element) => {
            resizer.observe(item)
        })
    }

    handleScrollArrow(parentElString: string ='section#product-buy aside', arrowElString: string ='#arrow-icon') {
        let parentOfArrowElement = document.querySelector(parentElString);
        let arrowIcon = document.querySelector(arrowElString) as HTMLElement

        this.handleArrowScrollMutation(parentOfArrowElement, arrowIcon)

        parentOfArrowElement.addEventListener('scroll', e => this.toggleScrollArrow(e, arrowIcon));

        // ATIVA A VERIFICAÇÃO JÁ NO LOADING DA PÁGINA
        parentOfArrowElement.dispatchEvent(new Event('scroll'))
    }

    toggleCarouselUsage(matches: boolean, carouselList: String[], firstCheck: boolean =false) {
        if(matches) {
            for(let item of carouselList) {
                (<any>$(item)).slick({
                    autoplay: true,
                    autoplaySpeed: 3000
                });
            }
        } else {
            if(!firstCheck) {
                for(let item of carouselList) {
                    (<any>$(item)).slick('unslick');
                }
            }
        }
    }

    handleCarouselMatchMediaTrigger(carouselList: String[]) {
        let matchSize = window.matchMedia('(max-width: 1000px)')

        matchSize.onchange = (e) => this.toggleCarouselUsage(e.matches, carouselList)
        
        this.toggleCarouselUsage(matchSize.matches, carouselList, true)
    }

    handleSign() {
        let signContainer = document.querySelector('#sign-container')
        let signBoxTitle = document.querySelector('#sign-box-title')

        document.querySelector('#sign-close-button').addEventListener('click', e => {
            signContainer.classList.remove('on')
        })

        document.querySelectorAll('.sign-open-button').forEach(item => {
            item.addEventListener('click', e => {
                signContainer.classList.add('on')
            })
        })

        this.handleMultistepForm({
            formDOM: '#sign-form-list form',
            stepsButtons: {
                dom: '.toggle-form-button',
                nextBtn: 'btn-skip',
                backBtn: 'btn-prev'
            },
            callback: isNextStep => {
                signBoxTitle.textContent = isNextStep ? 'LOG IN WITH YOUR ACCOUNT' : 'CREATE ACCOUNT'
            }
        })
    }

    handleHomePageRevealTransitions() {
        window.addEventListener('scroll', e => {
            document.querySelectorAll('.reveal').forEach(item => {
                let windowHeight = window.innerHeight
                let revealTop = item.getBoundingClientRect().top
                let revealPoint = 150;

                if(revealTop < windowHeight - revealPoint) {
                    item.classList.add('active')
                } else {
                    item.classList.remove('active')
                }
            })
        })

        window.dispatchEvent(new Event('scroll'))
    }

    handlePicker() {
        let items = document.querySelectorAll('.picker') as NodeListOf<HTMLElement>

        items.forEach(item => {
            item.onclick = () => {
                item.parentElement.querySelectorAll('.picker').forEach(i => {
                    i.classList.remove('selected')
                })

                item.classList.add('selected')
            }
        })
    }

    handlePageCarouselConfig(page: string) {
        switch(page) {
            case 'Loved Items':
                (<any>$('#bag-modal-preview')).slick({
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dots: false,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    responsive: [
                        {
                            breakpoint: 1100,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 900,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
                break
            case 'Collections':
                (<any>$('.collection')).slick({
                    slidesToShow: 5,
                    centerMode: true,
                    centerPadding: '5%',
                    infinite: true,
                    arrows: true,
                    responsive: [
                        {
                            breakpoint: 1366,
                            settings: {
                                centerPadding: '60px',
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                centerPadding: '100px',
                                slidesToShow: 1
                            }
                        }
                    ]
                });

                // gambiarra que conserta o problema de não ativar o breakpoint automanticamente ao carregar a página
                (<any>$('.collection')).slick('slickSetOption', 'mobileFirst', false, true)
                break
        }
    }

    handleMultistepForm({formDOM, stepsButtons, callback}: IHandleMultistepForm) {
        let formArray = document.querySelectorAll(formDOM) as NodeListOf<HTMLElement>
        let stepsButtonArray = document.querySelectorAll(stepsButtons.dom) as NodeListOf<HTMLElement>

        stepsButtonArray.forEach(item => {
            item.onclick = () => {
                let newPosition: string
                let isNextStep: boolean

                switch(item.id) {
                    case stepsButtons.nextBtn:
                        newPosition = 'translateX(-100%)'
                        isNextStep = true
                        break
                    case stepsButtons.backBtn:
                        newPosition = 'translateX(0%)'
                        isNextStep = false
                        break
                }

                formArray.forEach(f => {
                    f.style.transform = newPosition
                })

                callback && isNextStep != undefined &&
                callback(isNextStep)
            }
        })

        window.addEventListener('keydown', e => {
            e.ctrlKey
        })
    }

    handleCheckoutProgressStatus(hr: HTMLElement) {
        let lastStepEl = document.querySelector('#checkout-progress .step:last-child')

        hr.addEventListener('transitionend', e => {
            let hrCurrentWidth = (e.target as HTMLElement).style.width
            // se o HR está com 100% de width, o segundo estágio do progresso fica verde, se não, branco.
            lastStepEl.querySelector('i').style.borderColor = hrCurrentWidth == '100%' ? 'green' : 'white'
        })
    }

    handleCheckoutForm() {
        let checkoutProgressHrEl = document.querySelector('#checkout-progress hr') as HTMLElement;

        this.handleCheckoutProgressStatus(checkoutProgressHrEl);

        this.handleMultistepForm({
            formDOM: '#checkout-form-list form',
            stepsButtons: {
                dom: '#checkout-form-list .btn-checkout',
                nextBtn: 'btn-next-1',
                backBtn: 'btn-prev-1'
            },
            callback: isNextStep => {
                isNextStep ? checkoutProgressHrEl.style.width = '100%' : checkoutProgressHrEl.style.width = '0%'
            }
        })

        Utils.formatInput({type: 'string', inputDOM: '#number-input', maxLength: 15})
        Utils.formatInput({
            inputDOM: '#cep-input',
            maxLength: 9,
            mask: '#####-###'
        })
        Utils.formatInput({
            inputDOM: '#card-number-input',
            maxLength: 19,
            mask: '#### #### #### ####'
        })
        Utils.formatInput({inputDOM: '#card-cvv', maxLength: 4})
    }

    handleCheckoutAddressAPICall() {
        let cepInput = document.querySelector('#cep-input') as HTMLInputElement

        cepInput.addEventListener('keyup', e => {
            if(cepInput.value.length == 9) {
                let cepOnlyNumbers = cepInput.value.match(/\d/g).join('')

                fetch(`https://viacep.com.br/ws/${cepOnlyNumbers}/json/`).then(res => res.json())
                    .then(response => {
                        if(!response.erro) {
                            let streetInput = document.querySelector('#street-input') as HTMLInputElement
                            let complementInput = document.querySelector('#complement-input') as HTMLInputElement
                            let cityInput = document.querySelector('#city-input') as HTMLInputElement
                            let stateInput = document.querySelector('#state-input') as HTMLInputElement
                            
                            streetInput.value = response.logradouro
                            complementInput.value = response.complemento
                            cityInput.value = response.localidade
                            stateInput.value = response.uf
                        }
                    }).catch(err => {
                        console.error(err)
                    })
            }
        })
    }

    handleAddToWishListButton() {
        let wishListButtonArray = document.querySelectorAll('.wishlist-add') as NodeListOf<HTMLElement>

        wishListButtonArray.forEach(item => {
            item.addEventListener('click', e => {
                item.classList.toggle('added')
            })


        })
    }
}