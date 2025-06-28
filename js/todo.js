const infoButton = document.querySelector("#info");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector("#editBack");


$("add").addEventListener('click', () => {

    let name = $('taskName').value;
    let date = $('taskDate').value;

    if (name != '') {
        if (date != '') {
        }
    }
    let id = getSetId();
    addItem(name, date, 0, id);
    saveData(name, date, 0, id);
})


async function addItem(name, date, progress, id) {
    const todo_Item = await loadTodoItem()
    todo_Item.querySelector("#taskNameItem").innerText = name;
    todo_Item.querySelector("#taskDateItem").innerText = date;
    
    todo_Item.querySelector("#taskDone").addEventListener("click", () => archiving(id)); 
    todo_Item.querySelector('#taskEdit').addEventListener("click", () => editItem(id, todo_Item));

    const progressX = todo_Item.querySelectorAll('[name="progressX"]');

    progressX.forEach((radio,i) => {
        radio.checked = false;
        radio.name = "progress"+id;
        radio.addEventListener("click", () => changeSaveProgress(i, id));
    });
        
    progressX[progress].checked = true;
    $("todo_list").appendChild(todo_Item);
}

async function addArchiveItem(name, date, id = getSetId()) {
    const archive_Item = await loadArchiveItem()
    archive_Item.querySelector("#taskNameItem").innerText = name;
    archive_Item.querySelector("#taskDateItem").innerText = date;
    
    archive_Item.querySelector("#taskDelete").addEventListener("click", () => deleteArchive(id)); 

    $("archive_list").appendChild(archive_Item);
}

function editItem(id, todo_Item) {
    dialog.showModal();
    const items = JSON.parse(localStorage.getItem("todoItems"));    

    const item = items.find(x => x.id == id);

    console.log(item);
    $("editName").value = item.name;
    $("editDate").value = item.date;

    $('editDone').addEventListener('click', () => {
        const index = items.findIndex(x => x.id == id);
        if (index !== -1) items.splice(index, 1);

        localStorage.setItem("todoItems", JSON.stringify(items));
        saveData($("editName").value, $("editDate").value, item.progress, item.id);
        dialog.close();


        todo_Item.querySelector("#taskNameItem").innerText = $("editName").value;
        todo_Item.querySelector("#taskDateItem").innerText = $("editDate").value;
    })
}


dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;

    if (!isInDialog) {
      dialog.close();
    }
  });

closeButton.addEventListener("click", () => {
    dialog.close();
});

function deleteArchive(id) {
    let archiveItems = JSON.parse(localStorage.getItem("archiveItems")) || [];
    const index = archiveItems.findIndex(x => x.id == id);
    if (index !== -1) archiveItems.splice(index, 1);

    localStorage.setItem("archiveItems", JSON.stringify(archiveItems));
    loadArchiveList();
}

function archiving(id) {
    let todoItems = JSON.parse(localStorage.getItem("todoItems"));
    const archiveItem = todoItems.find(item => item.id === id);
    
    const index = todoItems.findIndex(x => x.id == id);
    if (index !== -1) todoItems.splice(index, 1);

    localStorage.setItem("todoItems", JSON.stringify(todoItems));


    let archiveItems = JSON.parse(localStorage.getItem("archiveItems")) || [];

    archiveItems.push(archiveItem);

    localStorage.setItem("archiveItems", JSON.stringify(archiveItems));

    loadArchiveList();
    loadTodoList();
}


function changeSaveProgress(progress, id) {
    let todoItems = JSON.parse(localStorage.getItem("todoItems"));
    todoItems.find(item => item.id === id).progress = progress;
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

function getSetId() {
    let id = localStorage.getItem("id");
    localStorage.setItem("id", id*1+1);
    return id;
}

async function loadTodoItem() {
  const res = await fetch('/components/todo_Item.html');
  const html = await res.text();

  const todo_Item = document.createElement('div');
  todo_Item.innerHTML = html;

  return todo_Item.firstChild;
}

async function loadArchiveItem() {
  const res = await fetch('/components/archive_Item.html');
  const html = await res.text();

  const archive_Item = document.createElement('div');
  archive_Item.innerHTML = html;

  return archive_Item.firstChild;
}

function saveData(name, date, progress, id)
{
    let todoItems = JSON.parse(localStorage.getItem("todoItems")) || [];

    const datas = {
        name: name, 
        date: date, 
        progress: progress,
        id: id
    };

    todoItems.push(datas);

    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

async function loadTodoList() {
    $("todo_list").innerHTML = '';

    const items = JSON.parse(localStorage.getItem("todoItems")) || [];    

    for (const item of items) {
      await addItem(item.name, item.date, item.progress, item.id);
    }
}

function loadArchiveList() {
    $("archive_list").innerHTML = '';

    const items = JSON.parse(localStorage.getItem("archiveItems")) || [];    
    for (const item of items) {
        addArchiveItem(item.name, item.date, item.id);
    }
}


addEventListener("load", () => {
    loadArchiveList();
    loadTodoList();
})

