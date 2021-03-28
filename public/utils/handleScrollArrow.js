function handleScrollArrow(event) {
    var element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        arrowIcon.style.visibility = 'hidden';
    }
    else {
        arrowIcon.style.visibility = 'initial';
    }
}
function isScrollable(element) {
    return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
}
;
var parentOfArrowElement = document.querySelector('section#product-buy aside');
var arrowIcon = document.querySelector('#arrow-icon');
if (isScrollable(parentOfArrowElement)) {
    arrowIcon.style.visibility = 'initial';
}
else {
    arrowIcon.style.visibility = 'hidden';
}
parentOfArrowElement.addEventListener('scroll', handleScrollArrow);
