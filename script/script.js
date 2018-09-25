const addButton = document.querySelector(".addButton")
const input = document.querySelector(".inputTask")
const list = document.querySelector(".toDoList")
const checkButton = document.querySelector(".checkAllTasks")
const deleteButton = document.querySelector(".deleteAllTasks")

addButton.addEventListener("click", function(e){
    e.preventDefault()
    
    if (input.value === undefined || input.value === null || input.value === "" || input.value === " "){
        input.focus()
        return false
    }

    let frase = input.value
    let verificar = /^[$A-Z_][0-9A-Z_$]*$/i;
    var res = verificar.test(frase);
    if(res === false){
        input.focus()
        return false
    }

    const newTask = document.createElement("div")
    const task = document.createElement("h2")
    const remove = document.createElement("button")

    newTask.className = "toDoList__task"
    task.className = "taskName"
    remove.className = "taskButton"

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

    checkButton.addEventListener("click", function(e){
        e.preventDefault()
        while (task.classList.contains("taskName")){
            task.classList.remove("taskName")
            task.classList.add("taskNameChecked")
        }      
    })

    deleteButton.addEventListener("click", function(e){
        e.preventDefault()
        newTask.remove()
    })
    
    input.value = ""
})

