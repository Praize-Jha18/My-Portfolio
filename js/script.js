const sr = ScrollReveal({
    origin: 'right',
    distance: '60px',
    duration: 1500,
    delay: 200,
    reset: true
})

sr.reveal('.about-content, .heading, #side3, #side4', {origin: 'bottom'});
sr.reveal('#side1', {origin: 'left'})
sr.reveal('#side2', {origin: 'right'})
sr.reveal('.about-img', {origin: 'left'})


// toggle icon navbar

let menuIcon = document.querySelector('#menu-icon');   
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll section 
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');

// sticky navbar
window.onscroll = () => {

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id =sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // active navbar link
            navlinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

            // active section animation on scroll
            sec.classList.add('show-animate');
        }

        else {
            sec.classList.remove('show-animate');
        }


    });


    // sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100)


    // removing nav when clicked or scroll

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
}


