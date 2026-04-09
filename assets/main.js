let mediaQuery = window.matchMedia("(max-width: 991.9px)");
let sidebar = document.querySelector("aside");

mediaQuery.addEventListener("change", function (e) {
    if (e.matches) {
        sidebar.classList.add("hide");
    } else {
        sidebar.classList.remove("hide");
    }
});

let sidebarToggle = document.querySelector("main .head > div:first-of-type i");
sidebarToggle.addEventListener("click", function () {
    sidebar.classList.toggle("hide");
});
