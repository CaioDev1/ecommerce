function toggleIcon(updatedIcon: string, el: Element) {
    let createIcon = function createIcon(content: string) {
        let svg = document.createElement('div')
        
        svg.innerHTML = content
    
        return svg.firstElementChild
    }
        
    el.replaceChild(createIcon(updatedIcon), el.querySelector('svg'))
}