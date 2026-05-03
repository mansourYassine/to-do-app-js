let tasks = [
    {id: 1, name: "Eat Breakfast", category: "Health", checked: false},
    {id: 2, name: "Go for a walk", category: "Fitness", checked: false},
    {id: 3, name: "Read a book", category: "Education", checked: true},
];
renderTasks();

// Add new task
let newTaskBtn = document.querySelector("main button.new-task");
let addTaskForm = document.querySelector(".add-form");
let addTaskFormBtn = document.querySelector(".add-form .content > .buttons .add");
let cancelTaskFormBtn = document.querySelector(".add-form .content > .buttons .cancel");

newTaskBtn.addEventListener("click", () => {
    addTaskForm.style = "display: block";
});

addTaskFormBtn.addEventListener("click", () => {
    addTaskForm.style = "display: none";
    let taskName = document.getElementById("task-name");
    let taskCategory = document.getElementById("task-category");

    tasks.push({id: Date.now(), name: taskName.value, category: taskCategory.value, checked: false});
    renderTasks();
});

cancelTaskFormBtn.addEventListener("click", () => {
    addTaskForm.style = "display: none";
});

// Display Tasks from the array
function renderTasks() {
    let uncompletedTasks = document.querySelector("main > .tasks > .uncompleted-tasks");
    let completedTasks = document.querySelector("main > .tasks > .completed-tasks");

    uncompletedTasks.innerHTML = "";
    completedTasks.innerHTML = "";

    let uncompletedTitle = document.createElement("h3");
    uncompletedTitle.textContent = "All Tasks";
    uncompletedTasks.appendChild(uncompletedTitle);

    let completedTitle = document.createElement("h3");
    completedTitle.textContent = "Completed Tasks";
    completedTasks.appendChild(completedTitle);
    

    for (let task of tasks) {
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
            console.log(e.target);
            let idTask = e.target.parentElement.getAttribute("data-id");
            console.log(idTask)
            tasks.forEach(function (ele) {
                if (ele.id == idTask) {
                    console.log(`clicked on Task is ${ele.name}`);
                    if (ele.checked) {
                        ele.checked = false;
                        renderTasks();
                    } else {
                        ele.checked = true;
                        renderTasks();
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
        
        let span = document.createElement("span");
        span.classList.add("category");
        span.textContent = task.category;
        infoDiv.appendChild(span);

        if (task.checked === false) {
            uncompletedTasks.appendChild(divContainer);
        } else {
            divContainer.classList.add("completed");
            completedTasks.appendChild(divContainer);
        }
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
