// Slider
var content = {};

content.el = {};
content.el.slider                 = document.querySelector('.container-slider');
content.el.box_slides             = document.querySelector('.box-slides');
content.el.container_slides       = document.querySelector('.container-slides');
content.el.container_informations = document.querySelector('.container-informations');

content.el.container_slides.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

var mouse_initial_pos = 0;
var transform_initial_pos = 0;

function mouseUp(e) {
    window.removeEventListener('mousemove', move, true);
}

function mouseDown(e) {
    mouse_initial_pos = e.clientX;
    transform_initial_pos = content.el.container_slides.style.transform.replace('translateX(', '').replace('px)', '');

    window.addEventListener('mousemove', move, true);
}

function move(e) {
    var mouse = e.clientX;

    var offset = mouse_initial_pos - mouse;
    content.el.container_slides.style.transform = 'translateX(' + (transform_initial_pos - offset) +'px)';
};

// Constellation(id)
function Constellation(id)
{
    content.el.container_informations.classList.add('container-informations-active');
}
