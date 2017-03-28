/*
* The variables needed
*/

var content = {};

content.el = {};
content.el.container = document.querySelector( '.container' );
content.el.slider    = content.el.container.querySelector( '.container-slider' );
content.el.cross     = content.el.container.querySelector( '.cross' );


/* Generate the slide for each constellation
*       Create a new element (a div)
*       Insert the text (in the array) in the div
*       Add the class 'slides'
*       Append each element in the slider
*/

var constellation = ['La grande ourse', 'La petite ourse', 'Andromède', 'Balance', 'La grande ourse', 'La petite ourse', 'Andromède', 'Balance'];

for (var i = 0; i < constellation.length; i++)
{
    var new_slide = document.createElement('div');
    new_slide.innerHTML = constellation[i];
    new_slide.classList.add( 'slides' );
    content.el.slider.append(new_slide);
}

// The variable needed to add an event
content.el.slides = content.el.container.querySelectorAll( '.slides' );

for (var i = 0; i < content.el.slides.length; i++)
{
    var slide_selected = content.el.slides[ i ];

    slide_selected.addEventListener( 'click', function()
    {
        content.el.container.classList.add( 'active-informations' );
    });
}

// Close the informations
content.el.cross.addEventListener( 'click', function()
{
    content.el.container.classList.remove( 'active-informations' );
});

// Drag and drop
function dragg() {
    var slides = content.el.slider.children.length;
    var slideWidth = 1000;
    var min = 0;
    var max = -((slides - 1) * slideWidth);

    content.el.slider.width(slides*slideWidth).draggable({
        axis: 'x',
        drag: function (event, ui) {
            if (ui.position.left > min) ui.position.left = min;
            if (ui.position.left < max) ui.position.left = max;
        }
    });
}
dragg();
