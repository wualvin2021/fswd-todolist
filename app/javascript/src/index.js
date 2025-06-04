import $ from 'jquery';

import {
  indexTasks,
  postTask,
  deleteTask,
  toggleComplete
} from "./requests.js";

function renderTasks(tasks) {
  const htmlString = tasks.map(function(task) {
    const status = task.completed ? 'yes' : 'no';
    const buttonLabel = task.completed ? 'Mark Active' : 'Mark Complete';

    return `
      <div class='col-12 mb-3 p-2 border rounded task' data-id='${task.id}'>
        <span>${status} ${task.description}</span><br>
        <button class="toggle-complete btn btn-sm btn-secondary mt-1"> ${buttonLabel} </button>
        <button class="delete-task btn btn-sm btn-danger mt-1">Remove</button>
      </div>`;
  });

  $("#tasks").html(htmlString.join(""));
}

function refreshTasks() {
  indexTasks(function (response) {
    renderTasks(response);
  });
}

$(document).ready(function () {
  $("body").prepend(`
    <div class="mb-3">
      <input type="text" id="new-task" placeholder="Enter a task" class="form-control w-50 d-inline-block">
      <button id="add-task" class="btn btn-primary ml-2">Add Task</button>
    </div>
    <div id="tasks" class="mt-4"></div>
  `);

  refreshTasks();

  $(document).on("click", "#add-task", function () {
    const newTask = $("#new-task").val().trim();
    if (newTask.length === 0) return;

    postTask(newTask, function () {
      $("#new-task").val('');
      refreshTasks();
    });
  });

  $(document).on("click", ".delete-task", function () {
    const taskId = $(this).closest(".task").data("id");
    deleteTask(taskId, function () {
      refreshTasks();
    });
  });

  $(document).on("click", ".toggle-complete", function () {
    const taskId = $(this).closest(".task").data("id");
    toggleComplete(taskId, function () {
      refreshTasks();
    });
  });
});
