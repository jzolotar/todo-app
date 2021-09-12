const taskInput = document.querySelector(".header__input");
const taskList = document.querySelector(".list__background");

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

//add task to task list
function createTask(text) {
  const elem = document.createElement("li");
  elem.innerHTML = `
    <label class="list__task">
        <input type="checkbox" />
        <span class="circle"></span>
        <span class="task--desc">${text}</span>
    </label>
  `;

  taskList.appendChild(elem);
}

//clear input field
function clearInput() {
  taskInput.value = "";
}
