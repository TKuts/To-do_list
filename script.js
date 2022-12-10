const btnTask = document.getElementById("add-task");
const inputTitle = document.getElementById("titleInput");
const inputDescription = document.getElementById("description");
const renderTaskToBody = document.getElementById("render__task");
const taskList = document.querySelector("#render__task");
const trueBtn = document.getElementsByClassName("check-true");
const btnShare = document.getElementById("btn-share");
let arrayTask = [];

btnTask.addEventListener("click", () => {
  let objectTask = {
    id: Date.now(),
    title: inputTitle.value,
    description: inputDescription.value,
    done: false,
  };

  if (objectTask.title === "" || objectTask.description === "") {
    alert("Будь ласка, введіть дані");
  } else {
    arrayTask.push(objectTask);
  }

  renderTask(arrayTask);

  saveToLocalStorage();

  inputTitle.value = "";
  inputDescription.value = "";
});

taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", doneTask);
taskList.addEventListener("click", editTask);

const renderTask = (array) => {
  let htmlList = "";

  arrayTask.forEach((curentValue) => {
    const titleClass = curentValue.done ? "task-title cross-out" : "task-title";
    const descriptionClass = curentValue.done
      ? "task-description cross-out"
      : "task-description";
    const renderHtml = `
			<li id="${curentValue.id}" class="render__task-wraper"">
				<div class="task">
					<button type="button" data-action="done" class="task-btn" id="btn-cossout" ><i class="check-true bi bi-check2-circle" ></i><i class="check-false display bi bi-check-circle"></i></button>
					<input type="text"  placeholder="Task #1" class="${titleClass} block-input" id="render-title" value ="${curentValue.title}">
					<button type="button" data-action="edit" class="task-btn"><i class="pencil bi bi-pencil"></i></button>
					<button type="button" data-action="delete" class="task-btn" id="btn-trash"><i class="bin bi bi-trash3 lg"></i></button>
				</div>
				<input type="text" class="${descriptionClass} block-input" value ="${curentValue.description}">
			</li>
	`;

    htmlList = htmlList + renderHtml;
  });

  renderTaskToBody.innerHTML = htmlList;
};
if (localStorage.getItem("todo")) {
  arrayTask = JSON.parse(localStorage.getItem("todo"));
  renderTask(arrayTask);
}
function doneTask(event) {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".render__task-wraper");

    const id = Number(parentNode.id);

    const task = arrayTask.find((task) => task.id === id);

    task.done = !task.done;

    saveToLocalStorage();

    const taskTitle = parentNode.querySelector(".task-title");
    const taskDescription = parentNode.querySelector(".task-description");

    taskTitle.classList.toggle("cross-out");
    taskDescription.classList.toggle("cross-out");
  }
}

function editTask(event) {
  if (event.target.dataset.action === "edit") {
    const parentNode = event.target.closest(".render__task-wraper");
    console.log(parentNode);
    const taskTitle = parentNode.querySelector(".task-title");
    const taskDescription = parentNode.querySelector(".task-description");

    const currentTask = arrayTask.filter(
      (task) => task.id === Number(parentNode.id)
    );

    currentTask.forEach((i) => {
      i.title = taskTitle.value;
      i.description = taskDescription.value;
    });

    saveToLocalStorage();

    taskTitle.classList.toggle("block-input");
    taskDescription.classList.toggle("block-input");
  }
}

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".render__task-wraper");
    const id = Number(parentNode.id);
    const index = arrayTask.findIndex((task) => task.id === id);

    arrayTask.splice(index, 1);

    saveToLocalStorage();

    parentNode.remove();
  }
}

const saveToLocalStorage = () => {
  localStorage.setItem("todo", JSON.stringify(arrayTask));
};

// btnShare.addEventListener("click", modalShareMedia);
