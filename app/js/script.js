// global variables
const taskName = document.querySelector(".header__input");
const taskList = document.querySelector(".list__background");
const filtersList = document.querySelector(".filters__center");
const todoElem = document.querySelector(".todo__elem");

let todoArr = [];
let todoId = 0;
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
    }
  }
});

//toggle completed class / remove task from list
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

//function add task to list
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

//clear input field
function clearInput() {
  taskName.value = "";
}

//remove task
function removeItem(elem) {
  //remove html markup
  console.log(elem.parentElement);
  elem.parentElement.remove();
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
    console.log(elem);
  }
  // for any other element we need to use .parentElement
  else {
    elem.parentElement.classList.toggle("completed");
    console.log(elem.parentElement);
  }
}

//display active
function displayActive() {
  todoArr.forEach((elem) => {
    if (elem.classList.contains("completed")) elem.classList.add("hide");
  });
}

//display completed
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
