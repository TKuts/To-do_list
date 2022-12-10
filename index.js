const btnTask = document.getElementById("add-task");
const inputTitle = document.getElementById("titleInput");
const inputDescription = document.getElementById("description");
const renderTaskToBody = document.getElementById("render__task");
const taskList = document.querySelector("#render__task");
const trueBtn = document.getElementsByClassName("check-true");

// const btnShare = document.getElementById("btn-share");

let arrayTask = [];

class Todo {
  constructor() {
    this.decorationTextarea();
    this.eventAddTask();
    this.renderTask();
    this.doneTask();
    this.editTask();
    this.deleteTask();
  }

  decorationTextarea() {
    inputDescription.addEventListener("keyup", (event) => {
      if (window.innerWidth <= 768) {
        inputDescription.style.height = "124px";
      } else {
        inputDescription.style.height = "41px";
      }

      let scHeight = event.target.scrollHeight;
      inputDescription.style.height = `${scHeight}px`;
    });
  }

  eventAddTask() {
    btnTask.addEventListener("click", (event) => {
      event.preventDefault();

      const objectTask = {
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
      this.saveToLocalStorage();

      this.renderTask();

      inputTitle.value = "";
      inputDescription.value = "";

      if (inputDescription.value === "") {
        if (window.innerWidth <= 768) {
          inputDescription.style.height = "124px";
        } else {
          inputDescription.style.height = "41px";
        }
      }
    });
  }

  renderTask() {
    if (localStorage.getItem("todo")) {
      arrayTask = JSON.parse(localStorage.getItem("todo"));
    }
    let htmlList = "";

    arrayTask.forEach((curentValue) => {
      const titleClass = curentValue.done
        ? "task-title cross-out"
        : "task-title";

      const descriptionClass = curentValue.done
        ? "task-description cross-out"
        : "task-description";

      const renderHtml = `
  
			  <li id="${curentValue.id}" class="render__task-wraper">
				  <div class="task">
					  <button type="button" data-action="done" class="task-btn" id="btn-cossout" ><i class="check-true bi bi-check2-circle" ></i><i class="check-false display bi bi-check-circle"></i></button>
					  
					  <input type="text"  placeholder="Task #1" class="${titleClass} block-input" id="render-title" value ="${curentValue.title}">
					  
					  <button type="button" data-action="edit" class="task-btn"><i class="pencil bi bi-pencil"></i></button>
					  <button type="button" data-action="delete" class="task-btn" id="btn-trash"><i class="bin bi bi-trash3 lg"></i></button>
				  </div>
				  <textarea class="${descriptionClass} block-input" id="ko">${curentValue.description}</textarea>
			  </li>
	  `;

      htmlList = htmlList + renderHtml;
    });

    renderTaskToBody.innerHTML = htmlList;
  }

  doneTask() {
    taskList.addEventListener("click", (event) => {
      if (event.target.dataset.action === "done") {
        const parentNode = event.target.closest(".render__task-wraper");

        const id = Number(parentNode.id);
        const task = arrayTask.find((task) => task.id === id);
        task.done = !task.done;

        this.saveToLocalStorage();

        const taskTitle = parentNode.querySelector(".task-title");
        const taskDescription = parentNode.querySelector(".task-description");

        taskTitle.classList.toggle("cross-out");
        taskDescription.classList.toggle("cross-out");
      }
    });
  }

  editTask() {
    taskList.addEventListener("click", (event) => {
      if (event.target.dataset.action === "edit") {
        const parentNode = event.target.closest(".render__task-wraper");
        const taskTitle = parentNode.querySelector(".task-title");
        const taskDescription = parentNode.querySelector(".task-description");

        const currentTask = arrayTask.filter(
          (task) => task.id === Number(parentNode.id)
        );

        currentTask.forEach((i) => {
          i.title = taskTitle.value;
          i.description = taskDescription.value;
        });

        this.saveToLocalStorage();

        taskTitle.classList.toggle("block-input");
        taskDescription.classList.toggle("block-input");
      }
    });
  }

  deleteTask() {
    taskList.addEventListener("click", (event) => {
      if (event.target.dataset.action === "delete") {
        const parentNode = event.target.closest(".render__task-wraper");
        const id = Number(parentNode.id);
        const index = arrayTask.findIndex((task) => task.id === id);

        arrayTask.splice(index, 1);

        this.saveToLocalStorage();

        parentNode.remove();
      }
    });
  }

  saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(arrayTask));
  }
}

const todo = new Todo(arrayTask);
