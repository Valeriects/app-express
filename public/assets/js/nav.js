const btnBurger = document.querySelector('.btnBurger');
const menu = document.querySelector('#menuPopUp');
const navLinks = document.querySelectorAll('#menuPopUp a');
//nous donne le chemin sur lequel on est
const currentUrl = location.pathname;


//en cliquant sur le nurber, j'affiche ou pas mon menu dans une pop up
btnBurger.addEventListener("click", () => {
    console.log('ok');
    menu.classList.toggle("hidden");
});

//faire que les liens de chaque page soit actif ou non
navLinks.forEach(link => {
    //si le href du lien correspond au lien actuel de la page
    if (link.getAttribute('href') === currentUrl) {
        //on lui ajoute donc l'attribut aria-current="page"
        link.setAttribute('aria-current', 'page');
        //et l'attribut class="active"
        link.setAttribute('class', 'active');
    } else {
        link.removeAttribute('aria-current');
        link.removeAttribute('class', 'active');
    }
});


