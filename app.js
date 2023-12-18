let app = document.getElementById("app");

app.appendChild(getInputField("todo", "enter todo item", "todo"));
app.appendChild(getButton("todoBtn", "todoBtn", "todoBtn"));
 


if ( getItem().length > 0 ) {
    //getContainerWrapper will be called when there is atleast one item in localstorage;
    app.appendChild(getContainerWrapper() );

}

function inputHandler(e) {
  //console.log(event);
  if (e.keyCode === 13) {
    addTask()

  }
}


function getInputField(id, placeholder, cls) {
  let element = createElement("input");
  element.setAttribute("placeholder", placeholder);
  element.setAttribute("class", cls);
  element.setAttribute("id", id);
  element.addEventListener('keypress', inputHandler, false);
  return element;
}


function addTask(e) {
  let todo = document.getElementById("todo");
  if (todo.value === "" || todo.value === null) {
    alert("Empty field");
    return false;
  }




  let taskObject = { task: todo.value, id: (Math.random() * 10000 + 64) };

  createItem(taskObject, true)
  saveItem(taskObject);
  // empty element
  todo.value = ''

}

function updatedTaskNow(id, newcontent) {
  let items = getItem();

  items = items.map(function (item, idx) {

    if (item.id == id) {
      item.task = newcontent;
    }
    return item;
  });

  window.localStorage.setItem('task-item', JSON.stringify(items));

}

function handleEditTask(e) {
  // console.log('vhandleEditTask', e.keyCode, e.target.id);
  if (e.keyCode === 13) {
    e.preventDefault();
    let elemById = document.getElementById(e.target.id);
    let newcontent = elemById.textContent;
    updatedTaskNow(e.target.id, newcontent);
    elemById.contentEditable = false;
  }
}

function handleCurrentTask(e) {
  let id = e.target.id;
  let elem = document.getElementById(id);
  elem.contentEditable = true;
  elem.addEventListener('keypress', handleEditTask);
}


function handleDeleteTask(e) {
  console.dir(e.target);
  let taskId = e.target.previousElementSibling.id;
  let consent = window.confirm(`Are you sure delete ${e?.target?.previousElementSibling?.innerText} item from store?`)
  if (consent) {
    e?.target?.previousElementSibling?.parentElement?.remove();
    deleteFromLocalStore(taskId);
  }

}

function deleteFromLocalStore(taskId) {
  let items = getItem();

  items = items.filter((item) => item.id != taskId);

  window.localStorage.setItem('task-item', JSON.stringify(items));


}

function createItem(taskObject, appendOrPrepend = false) {
  let containerBox = document.getElementById("container");
  let { task, id } = taskObject;

  let taskDiv = createElement('div');

  let deleteBtn = createElement('button');
  deleteBtn.setAttribute('type', 'button')
  deleteBtn.setAttribute('class', 'delete-btn')
  deleteBtn.innerText = 'delete';
  deleteBtn.addEventListener('click', handleDeleteTask)

  let span = createElement('span');
  span.innerText = task;


  taskDiv.appendChild(span)
  taskDiv.appendChild(deleteBtn);
 
  span.addEventListener('click', handleCurrentTask)
  span.setAttribute('id', id);

  (appendOrPrepend) ? containerBox.append(taskDiv) : containerBox.prepend(taskDiv);
}

function renderListToDOM() {

  let items = getItem();

  if (items.length > 0) {
    app.append(getContainerWrapper());
    if (items && Array.isArray(items)) {
      items.forEach(item => {
        createItem(item, true);
      });
    }

  }


}

renderListToDOM();


function saveItem(taskObject) {
  let items = getItem();
  let previousItem = [taskObject, ...items];
  window.localStorage.setItem('task-item', JSON.stringify(previousItem));

}


function getItem() {

  return JSON.parse(window.localStorage.getItem('task-item') || '[]');
}



function getButton(text, id, cls) {
  let element = createElement("button");
  element.setAttribute("class", cls);
  element.setAttribute("id", id);
  element.innerText = text;
  element.style.marginLeft = "10px";
  element.addEventListener("click", addTask);
  return element;
}


function getContainerWrapper() {

  let div = createElement("div");
  div.setAttribute("class", "container");
  div.setAttribute("id", "container");

  (div.style.display = "flex"),
    (div.style.flexDirection = "column"),
    (div.style.backgroundColor = "lightcoral"),
    (div.style.width = "350px"),
    (div.style.maxHeight = "250px"),
    // (div.style.height = "50px"),
    (div.style.overflow = "auto"),
    (div.style.marginTop = "8px"),
    (div.style.borderRadius = "20px"),
    (div.style.paddingLeft = "25px"),
    (div.style.fontSize = "21px"),
    (div.style.textTransform = "capitalize");

  return div;
}

function createElement(type) {
  return document.createElement(type);
}
