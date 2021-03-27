function toggleIcon(updatedIcon, el) {
    var createIcon = function createIcon(content) {
        var svg = document.createElement('div');
        svg.innerHTML = content;
        return svg.firstElementChild;
    };
    el.replaceChild(createIcon(updatedIcon), el.querySelector('svg'));
}
