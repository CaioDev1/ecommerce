function handleScrollArrow(event: Event) {
    let element = event.target as HTMLElement;
    
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        arrowIcon.style.visibility = 'hidden'
    } else {
        arrowIcon.style.visibility = 'initial'
    }
}

function isScrollable(element: Element) {
    return element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight;
};

let parentOfArrowElement = document.querySelector('section#product-buy aside')
let arrowIcon = document.querySelector('#arrow-icon') as HTMLElement

if(isScrollable(parentOfArrowElement)) {
    arrowIcon.style.visibility = 'initial'
} else {
    arrowIcon.style.visibility = 'hidden'
}

parentOfArrowElement.addEventListener('scroll', handleScrollArrow);