var welcome = document.querySelector('.welcome');
var title = document.querySelector('.container-landing h2');
var description = document.querySelector('.container-landing p');


if (window.matchMedia("(max-width: 1200px)").matches) {
    welcome.style.display = 'none';
    title.innerHTML = '';
    description.innerHTML = 'Sorry, but this experience is optimized for desktop';
    description.style.width = 'inherit';
    document.style.overflow = 'hidden';
}

