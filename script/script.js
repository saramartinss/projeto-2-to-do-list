const addButton = document.querySelector(".addButton")
const input = document.querySelector(".inputTask")
const list = document.querySelector(".toDoList")
const checkButton = document.querySelector(".checkAllTasks")
const deleteButton = document.querySelector(".deleteAllTasks")
const hidden = document.querySelector(".hiddenFooter")

addButton.addEventListener("click", function(e){
    e.preventDefault()
    
    hidden.style.display = 'flex'
    deleteButton.innerHTML = "Excluir tudo"

    const regex = /\w+/ig;
    if(!regex.test(input.value)){
        input.focus()
        return false
    }

    if (input.value === undefined || input.value === null || input.value === "" || input.value === " "){
        input.focus()
        return false
    }

    const newTask = document.createElement("div")
    const task = document.createElement("h2")
    const remove = document.createElement("button")

    newTask.className = "toDoList__task"
    task.className = "taskName"
    remove.className = "taskButton"

    newTask.draggable = true
    task.innerHTML = input.value
    remove.innerHTML = "x"

    newTask.appendChild(task)
    newTask.appendChild(remove)
    list.appendChild(newTask)

    remove.addEventListener("click", function(e){
        e.preventDefault()
        newTask.remove()
    })

    task.addEventListener("click", function(e){
        e.preventDefault()

        if (task.classList.contains("taskName")) {
            task.classList.remove("taskName")
            task.classList.add("taskNameChecked")
        }
        else {
            task.classList.remove("taskNameChecked")
            task.classList.add("taskName")
        }
    })

    let drag = null;

    function dragStart(e) {
        drag = this
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/html', this.outerHTML)
    }

    function dragOver(e) {
        if (e.preventDefault) {
            e.preventDefault()
        }

    this.classList.add('over')
    e.dataTransfer.dropEffect = 'move'

    return false;
    }

function handleDragEnter(e) {
  // this / e.target is the current hover target.
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // this/e.target is current target element.

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  // Don't do anything if dropping the same column we're dragging.
  if (drag != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    //alert(this.outerHTML);
    //drag.innerHTML = this.innerHTML;
    //this.innerHTML = e.dataTransfer.getData('text/html');
    this.parentNode.removeChild(drag);
    var dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin',dropHTML);
    var dropElem = this.previousSibling;
    addDnDHandlers(dropElem);
    
  }
  this.classList.remove('over');
  return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  this.classList.remove('over');

  /*[].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });*/
}

function addDnDHandlers(elem) {
  elem.addEventListener('dragstart', dragStart, false);
  elem.addEventListener('dragenter', handleDragEnter, false)
  elem.addEventListener('dragover', dragOver, false);
  elem.addEventListener('dragleave', handleDragLeave, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);

}

var cols = document.querySelectorAll('.toDoList .toDoList__task');
[].forEach.call(cols, addDnDHandlers);


    checkButton.addEventListener("click", function(e){
        e.preventDefault()
        while (task.classList.contains("taskName")){
            task.classList.remove("taskName")
            task.classList.add("taskNameChecked")
        }      
    })

    deleteButton.addEventListener("click", function(e){
        e.preventDefault()
        hidden.style.display = 'flex'
        deleteButton.innerHTML = "Confirmar exclusão"

        deleteButton.addEventListener("click", function(){
            newTask.remove()
            hidden.style.display = 'none'
        })      
    })
    
    input.value = ""
})

