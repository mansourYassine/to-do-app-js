let tasks = fetchTasksFromLocal() ?? [];
let categories = fetchCategoriesFromLocal() ?? [];
let currentCategory = 'all';

if (tasks.length !== 0) {
    renderTasks();
}

if (categories.length !== 0) {
    renderCategories();
}

// Add new task
let newTaskBtn = document.querySelector("main button.new-task");
let addTaskForm = document.querySelector(".add-task-form");
let addTaskFormBtn = document.querySelector(".add-task-form .content > .buttons .add");
let cancelTaskFormBtn = document.querySelector(".add-task-form .content > .buttons .cancel");
let taskName = document.getElementById("task-name");
let taskCategory = document.getElementById("task-category");

newTaskBtn.addEventListener("click", () => {
    addTaskForm.style = "display: block";

    // load categories to the select
    taskCategory.innerHTML = `<option value="">---Choose a category---</option>`;
    for (const category of categories) {
        let option = document.createElement("option");
        option.setAttribute("value", category);
        option.innerHTML = category;
        taskCategory.appendChild(option);
    }
});

addTaskFormBtn.addEventListener("click", () => {
    if (/\w+/.test(taskName.value)) {
        addTaskForm.style = "display: none";
        tasks.unshift({id: Date.now(), name: taskName.value, category: taskCategory.value, checked: false});
        storeTasksInLocal();
        taskName.value = "";
        taskCategory.innerHTML = "";
        renderTasks();
    }
});

cancelTaskFormBtn.addEventListener("click", () => {
    taskName.value = "";
    taskCategory.innerHTML = "";
    addTaskForm.style = "display: none";
});

// Display Tasks from the array
function renderTasks() {
    let uncompletedTasks = document.querySelector("main > .tasks > .uncompleted-tasks > .list");
    let completedTasks = document.querySelector("main > .tasks > .completed-tasks > .list");

    uncompletedTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    let tasksToRender = tasks;
    
    if (currentCategory !== 'all') {
        tasksToRender = tasks.filter(task => task.category === currentCategory);
    }

    for (let task of tasksToRender) {
        let divContainer = document.createElement("div");
        divContainer.classList.add("task");
        divContainer.setAttribute("data-id", `${task.id}`)
    
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if (task.checked === true) {
            checkbox.setAttribute("checked", "");
        }
        divContainer.appendChild(checkbox);
    
        checkbox.addEventListener("change", function (e) {
            let idTask = e.target.parentElement.getAttribute("data-id");
            tasks.forEach(function (ele) {
                if (ele.id == idTask) {
                    if (ele.checked) {
                        ele.checked = false;
                        renderTasks();
                        storeTasksInLocal();
                    } else {
                        ele.checked = true;
                        renderTasks();
                        storeTasksInLocal();
                    }
                } 
            });
        });

        let infoDiv = document.createElement("div");
        infoDiv.classList.add("info");
        divContainer.appendChild(infoDiv);
    
        let p = document.createElement("p");
        p.textContent = task.name;
        infoDiv.appendChild(p);
        
        if (task.category.length !== 0) {
            let span = document.createElement("span");
            span.classList.add("category");
            span.textContent = task.category;
            infoDiv.appendChild(span);
        }

        if (task.checked === false) {
            uncompletedTasks.appendChild(divContainer);
        } else {
            divContainer.classList.add("completed");
            completedTasks.appendChild(divContainer);
        }
    }
}

// Fetch Tasks from the local storage
function fetchTasksFromLocal() {
    let jsonTasks = window.localStorage.getItem("tasks");
    let objectTasks = JSON.parse(jsonTasks);
    return objectTasks;
}

// Store tasks in the Local Storage As Json
function storeTasksInLocal() {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add new Category
let newCategoryBtn = document.querySelector("aside button.add-category");
let addCategoryForm = document.querySelector(".add-category-form");
let addCategoryFormBtn = document.querySelector(".add-category-form .content > .buttons .add");
let cancelCategoryFormBtn = document.querySelector(".add-category-form .content > .buttons .cancel");
let categoryName = document.getElementById("category-name");

newCategoryBtn.addEventListener("click", () => {
    addCategoryForm.style = "display: block";
});

addCategoryFormBtn.addEventListener("click", () => {
    if (/\w+/.test(categoryName.value)) {
        addCategoryForm.style = "display: none";
        categories.push(categoryName.value);
        renderCategories();
        storeCategoriesInLocal();
        categoryName.value = "";
    }
});

cancelCategoryFormBtn.addEventListener("click", () => {
    categoryName.value = "";
    addCategoryForm.style = "display: none";
});

// Fetch Categories from the local storage
function fetchCategoriesFromLocal() {
    let jsonCategories = window.localStorage.getItem("categories");
    let arrayCategories = JSON.parse(jsonCategories);
    return arrayCategories;
}

// Store tasks in the Local Storage As Json
function storeCategoriesInLocal() {
    window.localStorage.setItem("categories", JSON.stringify(categories));
}

function renderCategories() {
    let categoriesContainer = document.querySelector("aside ul.categories");

    categoriesContainer.innerHTML = "";
    
    for (let category of categories) {
        let categoryLi = document.createElement("li");
        categoryLi.classList.add("category");
        categoryLi.textContent = category;
        categoriesContainer.appendChild(categoryLi);
    }
}

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