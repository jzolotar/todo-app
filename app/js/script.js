const taskInput = document.querySelector(".header__input");
const taskList = document.querySelector(".list__background");
let closeBtn = "";

// add task to list
taskInput.addEventListener("keypress", (e) => {
  if (e.charCode === 13) {
    if (taskInput.value.replace(/ /g, "").length <= 0) {
      alert("Please fill in the task name");
    }
    if (taskInput.value != "") {
      createTask(taskInput.value);
      clearInput();
    }
  }
});
//remove task from list
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) removeItem(e.target.parentElement);
});

//function add task to list
function createTask(text) {
  const elem = document.createElement("li");
  elem.innerHTML = `
    <label class="list__task">
        <input type="checkbox" />
        <span class="circle"></span>
        <span class="task--desc">${text}</span>
        <img class= "remove" src="./images/icon-cross.svg" alt=""/>
    </label>
  `;

  taskList.appendChild(elem);
}

//clear input field
function clearInput() {
  taskInput.value = "";
}

//function remove task from list

function removeItem(elem) {
  elem.remove();
}
