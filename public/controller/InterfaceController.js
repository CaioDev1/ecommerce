var InterfaceController = /** @class */ (function () {
    function InterfaceController() {
        this.handleHeader();
        this.toggleContent();
        this.handleRevealTransitions();
    }
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
        this.handleSignUp();
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
        try {
            document.querySelectorAll('.toggle').forEach(function (el) {
                el.addEventListener('click', function (e) {
                    var startEl = e.target;
                    var isListOpen;
                    Utils.findElementThroughtParents(startEl, '.toggleable', function (el) {
                        isListOpen = el.querySelector('.toggleable').classList.toggle('active');
                        _this.togglePlusMinesIcon(isListOpen, el);
                    });
                    return;
                });
            });
        }
        catch (error) {
            console.log("\n                Erro na fun\u00E7\u00E3o changePlusMinesIcon:\n                Mensagem do navegador: " + error + "\n            ");
            return false;
        }
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
    InterfaceController.prototype.handleCarouselSlider = function (carouselList) {
        var _this = this;
        var matchSize = window.matchMedia('(max-width: 1000px)');
        matchSize.onchange = function (e) { return _this.toggleCarouselUsage(e.matches, carouselList); };
        this.toggleCarouselUsage(matchSize.matches, carouselList, true);
    };
    InterfaceController.prototype.handleSignUp = function () {
        var signUpContainer = document.querySelector('#sign-up-container');
        document.querySelector('#sign-up-close-button').addEventListener('click', function (e) {
            signUpContainer.classList.toggle('on');
        });
        document.querySelector('#sign-up-open-button').addEventListener('click', function (e) {
            signUpContainer.classList.toggle('on');
        });
    };
    InterfaceController.prototype.handleRevealTransitions = function () {
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
    InterfaceController.handleCheckoutProgressStatus = function (hr) {
        var lastStepEl = document.querySelector('#checkout-progress .step:last-child');
        hr.addEventListener('transitionend', function (e) {
            // se o HR está com 100% de width, o segundo estágio do progresso fica verde, se não, branco.
            lastStepEl.querySelector('i').style.borderColor = e.target.style.width == '100%' ? 'green' : 'white';
        });
    };
    InterfaceController.handleMultistepForm = function () {
        var forms = document.querySelectorAll('#checkout-form-list form');
        var checkoutProgressHrEl = document.querySelector('#checkout-progress hr');
        InterfaceController.handleCheckoutProgressStatus(checkoutProgressHrEl);
        document.querySelectorAll('#checkout-form-list .btn-checkout').forEach(function (item) {
            item.onclick = function () {
                var newPosition;
                switch (item.id) {
                    case 'btn-next-1':
                        newPosition = 'translateX(-100%)';
                        checkoutProgressHrEl.style.width = '100%';
                        break;
                    case 'btn-prev-1':
                        newPosition = 'translateX(0%)';
                        checkoutProgressHrEl.style.width = '0%';
                        break;
                }
                forms.forEach(function (f) {
                    f.style.transform = newPosition;
                });
            };
        });
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
    return InterfaceController;
}());
