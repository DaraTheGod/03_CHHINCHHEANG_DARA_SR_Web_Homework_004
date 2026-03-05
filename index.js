var tasks = [
  { id: 1, name: "Java Homework", priority: "High", status: "Progress" },
  { id: 2, name: "Korean Homework", priority: "Medium", status: "Progress" },
  { id: 3, name: "Java Project", priority: "Low", status: "Progress" }
];

var nextId = 4;
var editId = null;
var deleteId = null;
var selectedPriority = "Medium";
var selectedStatus = "To Do";

function renderTasks() {
  var list = document.getElementById("taskList");
  list.innerHTML = "";

  for (var i = tasks.length - 1; i >= 0; i--) {
    var task = tasks[i];
    var priorityColor = "";
    if (task.priority == "High") {
      priorityColor = "text-red-500";
    } else if (task.priority == "Medium") {
      priorityColor = "text-yellow-500";
    } else {
      priorityColor = "text-green-500";
    }
    var row = document.createElement("div");
    row.className = "bg-white rounded-tl-xl rounded-br-xl px-14 py-5 grid grid-cols-4 items-center";
    row.innerHTML = `
      <span class="font-bold">${task.name}</span>
      <span class="font-bold ml-[50%] ${priorityColor}">${task.priority}</span>
      <span class="font-bold ml-[60%]">${task.status}</span>
      <div class="flex gap-4 justify-end">
        <button onclick="openEditModal(${task.id})" class="text-blue-800">
          <img class="w-7 h-7" src="edit.png" alt="">
        </button>
        <button onclick="openDeleteModal(${task.id})" class="text-red-500">
          <img class="w-7 h-7" src="delete.png" alt="">
        </button>
      </div>
    `;
    list.appendChild(row);
  }
}

function openAddModal() {
  editId = null;
  document.getElementById("taskInput").value = "";
  document.getElementById("modalTitle").textContent = "Add Task";
  document.getElementById("actionBtn").textContent = "Add";
  document.getElementById("cancelBtn").classList.add("hidden");
  document.getElementById("closeBtn").classList.remove("hidden");
  document.getElementById("modal").classList.remove("hidden");
}

function openEditModal(id) {
  var task = null;
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      task = tasks[i];
    }
  }
  editId = id;
  selectedPriority = task.priority;
  selectedStatus = task.status;
  document.getElementById("taskInput").value = task.name;
  document.getElementById("modalTitle").textContent = "";
  document.getElementById("actionBtn").textContent = "Update";
  document.getElementById("cancelBtn").classList.remove("hidden");
  document.getElementById("closeBtn").classList.add("hidden");
  updatePriorityButtons();
  updateStatusButtons();
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function saveTask() {
  var name = document.getElementById("taskInput").value;
  if (name == "") {
    alert("Please enter a task name!");
    return;
  }
  if (editId != null) {
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id == editId) {
        tasks[i].name = name;
        tasks[i].priority = selectedPriority;
        tasks[i].status = selectedStatus;
      }
    }
  } else {
    var newTask = {
      id: nextId,
      name: name,
      priority: selectedPriority,
      status: selectedStatus
    };
    tasks.push(newTask);
    nextId = nextId + 1;
  }
  closeModal();
  renderTasks();
}

function selectPriority(priority) {
  selectedPriority = priority;
  updatePriorityButtons();
}

function selectStatus(status) {
  selectedStatus = status;
  updateStatusButtons();
}

function updatePriorityButtons() {
  document.getElementById("btn-High").className = "border-2 border-red-500 text-red-500 rounded-2xl px-5 py-2 font-semibold";
  document.getElementById("btn-Medium").className = "border-2 border-yellow-500 text-yellow-500 rounded-2xl px-5 py-2 font-semibold";
  document.getElementById("btn-Low").className = "border-2 border-green-500 text-green-500 rounded-2xl px-5 py-2 font-semibold";
  if (selectedPriority == "High") {
    document.getElementById("btn-High").className = "border-2 border-red-500 bg-red-500 text-white rounded-2xl px-5 py-2 font-semibold";
  } else if (selectedPriority == "Medium") {
    document.getElementById("btn-Medium").className = "border-2 border-yellow-500 bg-yellow-400 text-white rounded-2xl px-5 py-2 font-semibold";
  } else if (selectedPriority == "Low") {
    document.getElementById("btn-Low").className = "border-2 border-green-500 bg-green-500 text-white rounded-2xl px-5 py-2 font-semibold";
  }
}

function updateStatusButtons() {
  document.getElementById("btn-ToDo").className = "border-2 border-cyan-400 text-cyan-500 rounded-2xl px-5 py-2 font-semibold";
  document.getElementById("btn-Progress").className = "border-2 border-cyan-400 text-cyan-500 rounded-2xl px-5 py-2 font-semibold";
  document.getElementById("btn-Done").className = "border-2 border-cyan-400 text-cyan-500 rounded-2xl px-5 py-2 font-semibold";
  if (selectedStatus == "To Do") {
    document.getElementById("btn-ToDo").className = "border-2 border-cyan-400 bg-cyan-400 text-white rounded-2xl px-5 py-2 font-semibold";
  } else if (selectedStatus == "Progress") {
    document.getElementById("btn-Progress").className = "border-2 border-cyan-400 bg-cyan-400 text-white rounded-2xl px-5 py-2 font-semibold";
  } else if (selectedStatus == "Done") {
    document.getElementById("btn-Done").className = "border-2 border-cyan-400 bg-cyan-400 text-white rounded-2xl px-5 py-2 font-semibold";
  }
}

function openDeleteModal(id) {
  deleteId = id;
  document.getElementById("deleteModal").classList.remove("hidden");
}

function closeDeleteModal() {
  document.getElementById("deleteModal").classList.add("hidden");
  deleteId = null;
}

function confirmDelete() {
  var newList = [];
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id != deleteId) {
      newList.push(tasks[i]);
    }
  }
  tasks = newList;
  closeDeleteModal();
  renderTasks();
}

renderTasks();