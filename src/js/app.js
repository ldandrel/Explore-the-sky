/* All the needed variables
*   For the slider (click on a button and display the container-informations)
*   For the container informations (click on a button of the nav bar and display the good content)
*/
var content = {};

content.el = {};

// Variable for the skymap
content.el.skymap                 = document.querySelector('#container-skymap');

// Variable for the user's informations
content.el.user_informations      = document.querySelector('.user-informations');

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
content.el.title_constellation    = content.el.container_informations.querySelector('.title-constellation');
content.el.content_history        = content.el.container_informations.querySelector('.content-history');
content.el.content_environment    = content.el.container_informations.querySelector('.content-environment');
content.el.content_visibility     = content.el.container_informations.querySelector('.content-visibility');
content.el.informations_background = content.el.container_informations.querySelector('.informations-background');

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
    mouse_up_pos = content.el.container_slides.style.transform.replace('translateX(', '').replace('px)', '');
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
    if (transform_initial_pos - offset <= 0 && transform_initial_pos - offset >= -12260 ) {
        content.el.container_slides.style.transform = 'translateX(' + (transform_initial_pos - offset) + 'px)';
    }
};

// Click on the left arrow and translate de slider
content.el.right_arrow.addEventListener('click', function() {
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
content.el.left_arrow.addEventListener('click', function() {
    if(mouse_up_pos == 0)
    {
        content.el.container_slides.style.transform = 'translateX(0px)';
        mouse_up_pos = -100;
    }
    else
    {
        content.el.container_slides.style.transform = 'translateX(' + (parseInt(mouse_up_pos) + 100) +'px)';
    }
});

/*
 * The container informations
 */


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
            content.el.progress_bar.style.transform = 'scaleX(0)';
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
            content.el.progress_bar.style.transform = 'scaleX(1)';
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


// Close the container informations with the cross or the click everywhere on the page (except the container informations)
function close_container_informations()
{
    content.el.container_informations.classList.remove('container-informations-active');
    content.el.slider.style.width = '100%';
    content.el.skymap.style.width = '100%';

    for (var i = 0; i < content.el.container_slides.children.length; i++) {
        content.el.container_slides.children[i].classList.remove('slide-active');
    }
}

content.el.cross.addEventListener('click', function(){
    close_container_informations();
});

document.addEventListener('click', function(){
    close_container_informations();
});

content.el.container_informations.addEventListener('click', function(event){
    event.stopPropagation();
});

content.el.container_slides.addEventListener('click', function(event){
    event.stopPropagation();
});



/*
* Constellation function
*/

function constellation(id) {

// Instanciate request
        var xhr = new XMLHttpRequest();

// Ready stage change callback
        xhr.onreadystatechange = function () {
            // Is done
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // Success
                if (xhr.status === 200) {

                    // Display the container-informations, reduce the slider's width and the skymap, and move the user informations
                    content.el.container_informations.classList.add('container-informations-active');
                    content.el.slider.style.width = '70%';
                    content.el.skymap.style.width = '70%';
                    content.el.user_informations.style.transform = 'translateX(130%)';

                    // Add class active for the slide
                    var element = document.getElementById(id);
                    for (var i = 0; i < content.el.container_slides.children.length; i++) {
                        content.el.container_slides.children[i].classList.remove('slide-active');
                    }
                    element.parentElement.classList.add('slide-active');


                    var result = JSON.parse(xhr.responseText);
                    var neighbors_name = '';

                    for (var i = 0; i < result['neighbors_name'].length; i++) {
                        neighbors_name += '<li class="bordering-element">' + result['neighbors_name'][i] + '</li>';
                    }



                    content.el.title_constellation.innerHTML = null;
                    content.el.title_constellation.innerHTML +=
                        '<h2 class="informations-name">'+result['constellation'][0].name+'</h2>' +
                        '<h2 class="informations-genitif">'+result['constellation'][0].genetive+'</h2>'
                    ;

                    content.el.content_history.innerHTML = null;
                    content.el.content_history.innerHTML +=
                        '<h2 class="history-title">History</h2>' +
                            '<p class="history-text">'+result['constellation'][0].history+'</p>' +
                        '<h3 class="family-title">Family</h3>' +
                            '<p class="family-text">'+result['constellation'][0].family+'</p>' +
                        '<h3 class="origin-title">Origin</h3>' +
                            '<p class="origin-text">'+result['constellation'][0].origin+'</p>' +
                        '<h3 class="meaning-title">Meaning</h3>' +
                         '<p class="meaning-text">'+result['constellation'][0].meaning+'</p>';

                    content.el.content_environment.innerHTML = null;
                    content.el.content_environment.innerHTML +=
                        '<h2 class="environment-title">Environment</h2>' +
                        '<h3 class="brightest-star-title">The brightest star</h3>' +
                        '<p class="brightest-star-text">'+result['constellation'][0].star+'</p>' +
                        '<h3 class="bordering-title">The boundary constellations</h3>' +
                        '<ul class="bordering-list">' +
                             neighbors_name +
                        '</ul>'
                    ;

                    content.el.content_visibility.innerHTML = null;
                    content.el.content_visibility.innerHTML +=
                        '<h2 class="visibility-title">Visibility</h2>' +
                        '<p class="visibility-text">'+result['constellation'][0].visibility+'</p>' +
                        '<h3 class="optimal-title">Optimal visibility</h3>' +
                        '<p class="optimal-text">'+result['constellation'][0].date_best_visibility+'</p>' +
                        '<h3 class="height-title">Constellation\'s height</h3>' +
                        '<p class="height-text">'+result['constellation'][0].size+'</p>'
                    ;

                    content.el.container_informations.style.backgroundImage = 'url(' + result['constellation'][0].images + ')';

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
