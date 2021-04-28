var InterfaceController = /** @class */ (function () {
    function InterfaceController(page) {
        this.handleLoadingImages();
        var patternMethods = ['Home', 'Catalog', 'Bag', 'Product', 'Collections'];
        if (patternMethods.includes(page)) {
            this.handleHeader();
            this.toggleContent();
        }
        switch (page) {
            case 'Home':
                this.handleHomePageRevealTransitions();
                break;
            case 'Product':
                this.handleScrollArrow();
                this.handleCarouselMatchMediaTrigger(['#product-photo-field', '#product-extra-items']);
                this.handlePicker();
                this.handleAddToWishListButton();
                break;
            case 'Catalog':
                this.handlePicker();
                this.handleAddToWishListButton();
                break;
            case 'Checkout':
                this.handleCheckoutForm();
                this.handleCheckoutAddressAPICall();
                break;
            case 'Loved Items':
                this.handlePageCarouselConfig('Loved Items');
                break;
            case 'Collections':
                this.handlePageCarouselConfig('Collections');
        }
    }
    InterfaceController.prototype.handleLoadingImages = function () {
        Promise.all(Array.from(document.images)
            .filter(function (img) { return !img.complete; }).map(function (img) { return new Promise(function (resolve) {
            img.onload = img.onerror = resolve;
        }); })).then(function () {
            document.querySelector('.loading-container').classList.remove('active');
        });
    };
    // troca entre o header do desktop e mobile
    InterfaceController.prototype.switchHeader = function (device) {
        document.querySelector('.home-page-header.desktop').style.display = device == 'desktop' ? 'flex' : 'none';
        document.querySelector('.home-page-header.mobile').style.display = device == 'mobile' ? 'flex' : 'none';
    };
    InterfaceController.prototype.toggleHeaderMenu = function () {
        var headerBurguerField = document.querySelector('#header-burguer-field');
        document.querySelector('.home-page-header-aside.mobile.left button').addEventListener('click', function (e) {
            if (headerBurguerField.className != 'active')
                headerBurguerField.style.height = 'initial';
            headerBurguerField.classList.toggle('active');
        });
    };
    InterfaceController.prototype.handleHeaderScrollAnimation = function () {
        document.onscroll = function (e) {
            document.querySelectorAll('.home-page-header .slideTab').forEach(function (el) {
                if (window.scrollY !== 0) {
                    el.style.width = '100vw';
                }
                else {
                    el.style.width = '0vw';
                }
            });
        };
    };
    InterfaceController.prototype.toggleHeaderSearch = function () {
        document.querySelectorAll('.search-button').forEach(function (button) {
            button.onclick = function () {
                Utils.findElementThroughtParents(button, '.header-search-container', function (el) {
                    el.querySelector('.header-search-container').classList.add('active');
                });
            };
        });
        document.querySelectorAll('.header-search-container').forEach(function (item) {
            var cancelButton = item.querySelector('.search-cancel-button');
            var submitButton = item.querySelector('.search-submit-button');
            cancelButton.onclick = function () {
                item.classList.remove('active');
            };
        });
    };
    InterfaceController.prototype.handleHeader = function () {
        var _this = this;
        var matchMedia = window.matchMedia('(min-width: 900px)');
        this.switchHeader(matchMedia.matches ? 'desktop' : 'mobile');
        matchMedia.addEventListener('change', function (e) {
            _this.switchHeader(matchMedia.matches ? 'desktop' : 'mobile');
        });
        this.toggleHeaderMenu();
        this.handleHeaderScrollAnimation();
        this.handleSign();
        this.toggleHeaderSearch();
    };
    InterfaceController.prototype.togglePlusMinesIcon = function (isOpen, el) {
        var plusIcon = "\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9 0H7V7L0 7V9H7V16H9V9H16V7L9 7V0Z\" fill=\"#000F08\"/>\n        </svg>\n        ";
        var minesIcon = "\n            <svg width=\"16\" height=\"2\" viewBox=\"0 0 16 2\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <rect y=\"2\" width=\"2\" height=\"16\" transform=\"rotate(-90 0 2)\" fill=\"#000F08\"/>\n            </svg>  \n        ";
        var updatedIcon = isOpen ? minesIcon : plusIcon;
        var createIcon = function createIcon(content) {
            var svg = document.createElement('div');
            svg.innerHTML = content;
            return svg.firstElementChild;
        };
        el.querySelector('.toggle').replaceChild(createIcon(updatedIcon), el.querySelector('svg'));
    };
    InterfaceController.prototype.toggleContent = function () {
        var _this = this;
        document.querySelectorAll('.toggle').forEach(function (el) {
            el.addEventListener('click', function (e) {
                var startEl = e.target;
                var isListOpen;
                Utils.findElementThroughtParents(startEl, '.toggleable', function (el) {
                    isListOpen = el.querySelector('.toggleable').classList.toggle('active');
                    _this.togglePlusMinesIcon(isListOpen, el);
                });
            });
        });
    };
    InterfaceController.prototype.toggleScrollArrow = function (event, arrowIcon) {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            arrowIcon.style.visibility = 'hidden';
        }
        else {
            arrowIcon.style.visibility = 'initial';
        }
    };
    InterfaceController.prototype.isScrollable = function (element) {
        return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
    };
    InterfaceController.prototype.handleArrowScrollMutation = function (parentOfArrowElement, arrowIcon) {
        var _this = this;
        // ESCUTA QUANDO OS BOTÕES DE TOGGLE ATIVAREM O SCROLL
        var resizer = new ResizeObserver(function (e) {
            if (_this.isScrollable(parentOfArrowElement)) {
                arrowIcon.style.visibility = 'initial';
            }
            else {
                arrowIcon.style.visibility = 'hidden';
            }
        });
        // ADICIONA OS TOGGLEABLES NO LISTENER DO RESIZER
        parentOfArrowElement.querySelectorAll('.toggleable').forEach(function (item) {
            resizer.observe(item);
        });
    };
    InterfaceController.prototype.handleScrollArrow = function (parentElString, arrowElString) {
        var _this = this;
        if (parentElString === void 0) { parentElString = 'section#product-buy aside'; }
        if (arrowElString === void 0) { arrowElString = '#arrow-icon'; }
        var parentOfArrowElement = document.querySelector(parentElString);
        var arrowIcon = document.querySelector(arrowElString);
        this.handleArrowScrollMutation(parentOfArrowElement, arrowIcon);
        parentOfArrowElement.addEventListener('scroll', function (e) { return _this.toggleScrollArrow(e, arrowIcon); });
        // ATIVA A VERIFICAÇÃO JÁ NO LOADING DA PÁGINA
        parentOfArrowElement.dispatchEvent(new Event('scroll'));
    };
    InterfaceController.prototype.toggleCarouselUsage = function (matches, carouselList, firstCheck) {
        if (firstCheck === void 0) { firstCheck = false; }
        if (matches) {
            for (var _i = 0, carouselList_1 = carouselList; _i < carouselList_1.length; _i++) {
                var item = carouselList_1[_i];
                $(item).slick({
                    autoplay: true,
                    autoplaySpeed: 3000
                });
            }
        }
        else {
            if (!firstCheck) {
                for (var _a = 0, carouselList_2 = carouselList; _a < carouselList_2.length; _a++) {
                    var item = carouselList_2[_a];
                    $(item).slick('unslick');
                }
            }
        }
    };
    InterfaceController.prototype.handleCarouselMatchMediaTrigger = function (carouselList) {
        var _this = this;
        var matchSize = window.matchMedia('(max-width: 1000px)');
        matchSize.onchange = function (e) { return _this.toggleCarouselUsage(e.matches, carouselList); };
        this.toggleCarouselUsage(matchSize.matches, carouselList, true);
    };
    InterfaceController.prototype.handleSign = function () {
        var signContainer = document.querySelector('#sign-container');
        var signBoxTitle = document.querySelector('#sign-box-title');
        document.querySelector('#sign-close-button').addEventListener('click', function (e) {
            signContainer.classList.remove('on');
        });
        document.querySelectorAll('.sign-open-button').forEach(function (item) {
            item.addEventListener('click', function (e) {
                signContainer.classList.add('on');
            });
        });
        this.handleMultistepForm({
            formDOM: '#sign-form-list form',
            stepsButtons: {
                dom: '.toggle-form-button',
                nextBtn: 'btn-skip',
                backBtn: 'btn-prev'
            },
            callback: function (isNextStep) {
                signBoxTitle.textContent = isNextStep ? 'LOG IN WITH YOUR ACCOUNT' : 'CREATE ACCOUNT';
            }
        });
    };
    InterfaceController.prototype.handleHomePageRevealTransitions = function () {
        window.addEventListener('scroll', function (e) {
            document.querySelectorAll('.reveal').forEach(function (item) {
                var windowHeight = window.innerHeight;
                var revealTop = item.getBoundingClientRect().top;
                var revealPoint = 150;
                if (revealTop < windowHeight - revealPoint) {
                    item.classList.add('active');
                }
                else {
                    item.classList.remove('active');
                }
            });
        });
        window.dispatchEvent(new Event('scroll'));
    };
    InterfaceController.prototype.handlePicker = function () {
        var items = document.querySelectorAll('.picker');
        items.forEach(function (item) {
            item.onclick = function () {
                item.parentElement.querySelectorAll('.picker').forEach(function (i) {
                    i.classList.remove('selected');
                });
                item.classList.add('selected');
            };
        });
    };
    InterfaceController.prototype.handlePageCarouselConfig = function (page) {
        switch (page) {
            case 'Loved Items':
                $('#bag-modal-preview').slick({
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
                break;
            case 'Collections':
                $('.collection').slick({
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
                                slidesToShow: 3
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
                $('.collection').slick('slickSetOption', 'mobileFirst', false, true);
                break;
        }
    };
    InterfaceController.prototype.handleMultistepForm = function (_a) {
        var formDOM = _a.formDOM, stepsButtons = _a.stepsButtons, callback = _a.callback;
        var formArray = document.querySelectorAll(formDOM);
        var stepsButtonArray = document.querySelectorAll(stepsButtons.dom);
        stepsButtonArray.forEach(function (item) {
            item.onclick = function () {
                var newPosition;
                var isNextStep;
                switch (item.id) {
                    case stepsButtons.nextBtn:
                        newPosition = 'translateX(-100%)';
                        isNextStep = true;
                        break;
                    case stepsButtons.backBtn:
                        newPosition = 'translateX(0%)';
                        isNextStep = false;
                        break;
                }
                formArray.forEach(function (f) {
                    f.style.transform = newPosition;
                });
                callback && isNextStep != undefined &&
                    callback(isNextStep);
            };
        });
        window.addEventListener('keydown', function (e) {
            e.ctrlKey;
        });
    };
    InterfaceController.prototype.handleCheckoutProgressStatus = function (hr) {
        var lastStepEl = document.querySelector('#checkout-progress .step:last-child');
        hr.addEventListener('transitionend', function (e) {
            var hrCurrentWidth = e.target.style.width;
            // se o HR está com 100% de width, o segundo estágio do progresso fica verde, se não, branco.
            lastStepEl.querySelector('i').style.borderColor = hrCurrentWidth == '100%' ? 'green' : 'white';
        });
    };
    InterfaceController.prototype.handleCheckoutForm = function () {
        var checkoutProgressHrEl = document.querySelector('#checkout-progress hr');
        this.handleCheckoutProgressStatus(checkoutProgressHrEl);
        this.handleMultistepForm({
            formDOM: '#checkout-form-list form',
            stepsButtons: {
                dom: '#checkout-form-list .btn-checkout',
                nextBtn: 'btn-next-1',
                backBtn: 'btn-prev-1'
            },
            callback: function (isNextStep) {
                isNextStep ? checkoutProgressHrEl.style.width = '100%' : checkoutProgressHrEl.style.width = '0%';
            }
        });
        Utils.formatInput({ type: 'string', inputDOM: '#number-input', maxLength: 15 });
        Utils.formatInput({
            inputDOM: '#cep-input',
            maxLength: 9,
            mask: '#####-###'
        });
        Utils.formatInput({
            inputDOM: '#card-number-input',
            maxLength: 19,
            mask: '#### #### #### ####'
        });
        Utils.formatInput({ inputDOM: '#card-cvv', maxLength: 4 });
    };
    InterfaceController.prototype.handleCheckoutAddressAPICall = function () {
        var cepInput = document.querySelector('#cep-input');
        cepInput.addEventListener('keyup', function (e) {
            if (cepInput.value.length == 9) {
                var cepOnlyNumbers = cepInput.value.match(/\d/g).join('');
                fetch("https://viacep.com.br/ws/" + cepOnlyNumbers + "/json/").then(function (res) { return res.json(); })
                    .then(function (response) {
                    if (!response.erro) {
                        var streetInput = document.querySelector('#street-input');
                        var complementInput = document.querySelector('#complement-input');
                        var cityInput = document.querySelector('#city-input');
                        var stateInput = document.querySelector('#state-input');
                        streetInput.value = response.logradouro;
                        complementInput.value = response.complemento;
                        cityInput.value = response.localidade;
                        stateInput.value = response.uf;
                    }
                })["catch"](function (err) {
                    console.error(err);
                });
            }
        });
    };
    InterfaceController.prototype.handleAddToWishListButton = function () {
        var wishListButtonArray = document.querySelectorAll('.wishlist-add');
        wishListButtonArray.forEach(function (item) {
            item.addEventListener('click', function (e) {
                item.classList.toggle('added');
            });
        });
    };
    return InterfaceController;
}());
