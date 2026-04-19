let tasks = [];

// Display and hide add new task window
let newTaskBtn = document.querySelector("main button.new-task");
let addTaskForm = document.querySelector(".add-form");
let addTaskFormBtn = document.querySelector(".add-form .content > .buttons .add");
let cancelTaskFormBtn = document.querySelector(".add-form .content > .buttons .cancel");

newTaskBtn.addEventListener("click", () => {
    addTaskForm.style = "display: block";
});

addTaskFormBtn.addEventListener("click", () => {
    addTaskForm.style = "display: none";
});

cancelTaskFormBtn.addEventListener("click", () => {
    addTaskForm.style = "display: none";
});

// Sidebar Toogle button 
let mediaQuery = window.matchMedia("(max-width: 991.9px)");
let sidebar = document.querySelector("aside");

mediaQuery.addEventListener("change", function (e) {
    if (e.matches) {
        sidebar.classList.add("hide");
    } else {
        sidebar.classList.remove("hide");
    }
});

let sidebarToggle = document.querySelector("header > div:first-of-type i");
sidebarToggle.addEventListener("click", function () {
    sidebar.classList.toggle("hide");
});
