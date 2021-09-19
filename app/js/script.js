// dom elements
const taskName = document.querySelector(".header__input");
const taskList = document.querySelector(".list__background");
const filters = document.querySelector(".filters");
const filtersStatus = document.querySelectorAll(".filters__filter");
const todoElem = document.querySelector(".todo__elem");
const btnClearCompleted = document.querySelector("delete--completed");
const tasksLeft = document.querySelector(".tasks--left");

// global variables
let todoArr = [];
let todoId = 0;
let counter = 0;
let currentFilter = "all";

// add task to list
taskName.addEventListener("keypress", (e) => {
  if (e.charCode === 13) {
    if (taskName.value.replace(/ /g, "").length <= 0) {
      alert("Please fill in the task name");
    }
    if (taskName.value != "") {
      createTask(taskName.value);
      clearInput();
      counter++;
      tasksLeft.innerHTML = counter;
    }
  }
});

// add/remove completed class to html element & remove task from list
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    removeItem(e.target.parentElement);
  }
  if (e.target.classList.contains("list__task")) {
    toggleCompleted(e.target);
  }
  if (
    e.target.classList.contains("circle") ||
    e.target.classList.contains("task--desc")
  ) {
    // toggleCompleted(e.target.parentElement);
    toggleCompleted(e.target.parentElement);
  }
});

// set filters / delete completed tasks
filters.addEventListener("click", (e) => {
  // filter by active
  if (e.target.classList.contains("filter--active")) {
    displayActive();
    updateFiltering(e.target);
  }
  // filter by completed
  if (e.target.classList.contains("filter--completed")) {
    displayCompleted();
    updateFiltering(e.target);
  }
  // filter by all
  if (e.target.classList.contains("filter--all")) {
    displayAll();
    updateFiltering(e.target);
  }
  // remove all completed
  if (e.target.classList.contains("delete--completed")) {
    deleteCompleted();
  }
});

// function add task to list
function createTask(text) {
  const elem = document.createElement("li");
  elem.classList.add("todo__elem");
  elem.innerHTML = `
    <label class="list__task">
        <input type="checkbox" />
        <span class="circle"></span>
        <span class="task--desc">${text}</span>
        <img class= "remove" src="./images/icon-cross.svg" alt=""/>
    </label>
  `;
  elem.id = todoId;
  todoId++;
  todoArr.push(elem);
  taskList.appendChild(elem);
}

// clear input field
function clearInput() {
  taskName.value = "";
}

// remove task
function removeItem(elem) {
  //remove html markup
  elem.parentElement.remove();
  //remove elem from todoArr list
  todoArr = todoArr.filter((li) => {
    return li != elem.parentElement;
  });
}

// remove completed task
function removeCompletedItem(elem) {
  // remove html markup
  elem.remove();
  //remove elem from todoArr list
  todoArr = todoArr.filter((li) => {
    return li != elem.parentElement;
  });
}

//toggle completed class
function toggleCompleted(elem) {
  // check if elem is li
  if (elem.classList.contains("todo__elem")) {
    elem.classList.toggle("completed");
    //update task to be done
    if (elem.classList.contains("completed")) {
      counter--;
      tasksLeft.innerHTML = counter;
    } else {
      counter++;
      tasksLeft.innerHTML = counter;
    }
  }
  // for any other element we need to use .parentElement
  else {
    elem.parentElement.classList.toggle("completed");

    // update task to be done
    if (elem.parentElement.classList.contains("completed")) {
      counter--;
      tasksLeft.innerHTML = counter;
    } else {
      counter++;
      tasksLeft.innerHTML = counter;
    }
  }
}

// display active
function displayActive() {
  todoArr.forEach((elem) => {
    if (elem.classList.contains("completed")) elem.classList.add("hide");
    if (
      elem.classList.contains("hide") &&
      !elem.classList.contains("completed")
    )
      elem.classList.remove("hide");
  });
}

// display completed
function displayCompleted() {
  todoArr.forEach((elem) => {
    if (elem.classList.contains("completed")) elem.classList.remove("hide");
    if (!elem.classList.contains("completed")) elem.classList.add("hide");
  });
}

//display all
function displayAll() {
  todoArr.forEach((elem) => {
    if (elem.classList.contains("hide")) {
      elem.classList.remove("hide");
    }
  });
}

//update filter
function updateFiltering(target) {
  filtersStatus.forEach((elem) => {
    if (elem.classList.contains("filter--on") && elem != target) {
      elem.classList.remove("filter--on");
    }
    if (!elem.classList.contains("filter--on") && elem === target) {
      elem.classList.add("filter--on");
    }
  });
}

// delete completed tasks
function deleteCompleted() {
  todoArr.forEach((elem) => {
    console.log(elem);
    if (elem.classList.contains("completed")) removeCompletedItem(elem);
  });
}
