var InterfaceController = /** @class */ (function () {
    function InterfaceController() {
        this.handleHeader();
        this.toggleContent();
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
    InterfaceController.prototype.handleHeader = function () {
        var _this = this;
        var matchMedia = window.matchMedia('(min-width: 900px)');
        this.switchHeader(matchMedia.matches ? 'desktop' : 'mobile');
        matchMedia.addEventListener('change', function (e) {
            _this.switchHeader(matchMedia.matches ? 'desktop' : 'mobile');
        });
        this.toggleHeaderMenu();
        this.handleHeaderScrollAnimation();
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
        el.replaceChild(createIcon(updatedIcon), el.querySelector('svg'));
    };
    InterfaceController.prototype.toggleContent = function () {
        var _this = this;
        try {
            document.querySelectorAll('.toggle').forEach(function (el) {
                el.addEventListener('click', function (e) {
                    var target = e.target;
                    var parentElTree = target;
                    var isListOpen;
                    while (parentElTree) {
                        if (parentElTree.querySelector('.toggleable')) {
                            isListOpen = parentElTree.querySelector('.toggleable').classList.toggle('active');
                            break;
                        }
                        parentElTree = parentElTree.parentElement;
                    }
                    _this.togglePlusMinesIcon(isListOpen, el);
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
    InterfaceController.prototype.handleScrollArrow = function (parentElString, arrowElString) {
        var _this = this;
        if (parentElString === void 0) { parentElString = 'section#product-buy aside'; }
        if (arrowElString === void 0) { arrowElString = '#arrow-icon'; }
        var parentOfArrowElement = document.querySelector(parentElString);
        var arrowIcon = document.querySelector(arrowElString);
        if (this.isScrollable(parentOfArrowElement)) {
            arrowIcon.style.visibility = 'initial';
        }
        else {
            arrowIcon.style.visibility = 'hidden';
        }
        parentOfArrowElement.addEventListener('scroll', function (e) { return _this.toggleScrollArrow(e, arrowIcon); });
    };
    InterfaceController.prototype.toggleCarouselUsage = function (matches, carouselList, firstCheck) {
        if (firstCheck === void 0) { firstCheck = false; }
        if (matches) {
            for (var _i = 0, carouselList_1 = carouselList; _i < carouselList_1.length; _i++) {
                var item = carouselList_1[_i];
                $(item).slick();
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
        this.toggleCarouselUsage(matchSize.matches, carouselList, true);
        matchSize.onchange = function (e) { return _this.toggleCarouselUsage(e.matches, carouselList); };
    };
    return InterfaceController;
}());
