/* All the needed variables
*   For the slider (click on a button and display the container-informations)
*   For the container informations (click on a button of the nav bar and display the good content)
*/
var content = {};

content.el = {};

// Variable for the skymap
content.el.skymap                 = document.querySelector('#container-skymap');

// Variables for the slider
content.el.slider                 = document.querySelector('.container-slider');
content.el.box_slides             = document.querySelector('.box-slides');
content.el.left_arrow             = document.querySelector('.left-arrow');
content.el.right_arrow            = document.querySelector('.right-arrow');
content.el.container_slides       = document.querySelector('.container-slides');

// Variables for the container informations
content.el.container_informations = document.querySelector('.container-informations');
content.el.cross                  = content.el.container_informations.querySelector('.cross');
content.el.navigation             = content.el.container_informations.querySelectorAll('.navigation');
content.el.navigation_history     = content.el.container_informations.querySelector('.navigation-history');
content.el.navigation_environment = content.el.container_informations.querySelector('.navigation-environment');
content.el.navigation_visibility  = content.el.container_informations.querySelector('.navigation-visibility');
content.el.progress_bar           = content.el.container_informations.querySelector('.progress-bar');
content.el.content                = content.el.container_informations.querySelectorAll('.content');
content.el.content_history        = content.el.container_informations.querySelector('.content-history');
content.el.content_environment    = content.el.container_informations.querySelector('.content-environment');
content.el.content_visibility     = content.el.container_informations.querySelector('.content-visibility');

/* The drag and drop for the slider
*
*/

// Click on the slider
content.el.container_slides.addEventListener('mousedown', mouseDown, false);
window.addEventListener('mouseup', mouseUp, false);

// Initials variables
var mouse_initial_pos = 0;
var transform_initial_pos = 0;
var mouse_up_pos = 0;

// Listen the mouse up
function mouseUp(e) {
    window.removeEventListener('mousemove', move, true);
    mouse_up_pos = content.el.container_slides.style.transform.replace('translateX(', '').replace('px)', '');;
}

// Listen the mouse down and stock the mouseX and the current value of the translateX of the slider
function mouseDown(e) {
    mouse_initial_pos = e.clientX;
    transform_initial_pos = content.el.container_slides.style.transform.replace('translateX(', '').replace('px)', '');

    window.addEventListener('mousemove', move, true);
}

// Listen the mouse move and attribute the new translateX to the slider
function move(e) {
    var mouse = e.clientX;
    var offset = mouse_initial_pos - mouse;

    content.el.container_slides.style.transform = 'translateX(' + (transform_initial_pos - offset) +'px)';
};

// Click on the left arrow and translate de slider
content.el.left_arrow.addEventListener('click', function() {
    if(mouse_up_pos == 0)
    {
        content.el.container_slides.style.transform = 'translateX(-100px)';
        mouse_up_pos = 100;
    }
    else
    {
        content.el.container_slides.style.transform = 'translateX(' + (parseInt(mouse_up_pos) - 100) +'px)';
    }
});

// Click on the left arrow and translate de slider
content.el.right_arrow.addEventListener('click', function() {
    if(mouse_up_pos == 0)
    {
        content.el.container_slides.style.transform = 'translateX(100px)';
        mouse_up_pos = -100;
    }
    else
    {
        content.el.container_slides.style.transform = 'translateX(' + (parseInt(mouse_up_pos) + 100) +'px)';
    }
});


/* Constellation function
*
*/

function constellation(id) {
    // Display the container-informations, reduce the slider's width and the skymap
    content.el.container_informations.classList.add('container-informations-active');
    content.el.slider.style.width = '70%';
    content.el.skymap.style.width = '70%';

    this.search = function (value, order) {
// Instanciate request
        var xhr = new XMLHttpRequest();

// Ready stage change callback
        xhr.onreadystatechange = function () {
            // Is done
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // Success
                if (xhr.status === 200) {
                    var result = JSON.parse(xhr.responseText);
                    console.log('success');
                    console.log(result);
                    for (var i = 0; i < result.length; i++) {

                       console.log(result.name);
                    };
                }
                else {
                    console.log('error');
                }
            }
        };

// Open request
        xhr.open("GET", "api/constellations/?id=" + id, true);
// Send request
        xhr.send();
    }
}

constellation(12);

/*
* The container informations
*/

// Close the container informations
content.el.cross.addEventListener('click', function(){
    content.el.container_informations.classList.remove('container-informations-active');
    content.el.slider.style.width = '100%';
    content.el.skymap.style.width = '100%';
});

// Manage the nav bar with the good content
for (var i = 0; i < content.el.navigation.length; i++) {

    var button_selected = this.content.el.navigation[i];

    button_selected.addEventListener('click', function( e ){
        for (var i = 0; i < content.el.navigation.length; i++) {
            content.el.navigation[i].classList.remove('navigation-active');
        }

        this.classList.add('navigation-active');

        if(this.classList.contains( 'navigation-history' ))
        {
            remove_active_content();
            content.el.content_history.classList.add('content-active');
            content.el.progress_bar.style.transform = 'scaleX(0.2)';
            content.el.navigation_environment.style.background = '#6c0287';
        }
        else if(this.classList.contains( 'navigation-environment' ))
        {
            remove_active_content();
            content.el.content_environment.classList.add('content-active');
            content.el.progress_bar.style.transform = 'scaleX(0.5)';
            content.el.navigation_history.style.background = '#dc0368';
            content.el.navigation_environment.style.background = '#dc0368';
        }
        else if(this.classList.contains( 'navigation-visibility' ))
        {
            remove_active_content();
            content.el.content_visibility.classList.add('content-active');
            content.el.progress_bar.style.transform = 'scaleX(0.8)';
            content.el.navigation_history.style.background = '#dc0368';
            content.el.navigation_environment.style.background = '#dc0368';
        }

        e.preventDefault();
    });
}

function remove_active_content()
{
    for (var i = 0; i < content.el.content.length; i++) {
        content.el.content[i].classList.remove( 'content-active' );
    }
}

// console.log(content.el.container_informations.classList.contains('container-informations-active'));
// if(content.el.container_informations.classList.contains('container-informations-active'))
// {
//     content.el.slider.style.width = '70%';
// }
