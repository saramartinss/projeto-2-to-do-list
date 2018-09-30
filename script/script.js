const addButton = document.querySelector(".addButton")
const input = document.querySelector(".inputTask")
const list = document.querySelector(".toDoList")
const checkButton = document.querySelector(".checkAllTasks")
const deleteButton = document.querySelector(".deleteAllTasks")
const hidden = document.querySelector(".hiddenFooter")

addButton.addEventListener("click", function(e){
    e.preventDefault()
    
    const regex = /\w+/ig;
    if(!regex.test(input.value)){
        input.focus()
        return false
    }

    const newTask = document.createElement("li")
    const task = document.createElement("h2")
    const remove = document.createElement("button")

    hidden.style.display = 'flex'

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

        if(list.children.length === 0){
            hidden.style.display = 'none'
        }
    })

    task.addEventListener("click", function(e){
        e.preventDefault()
        
        task.classList.toggle("taskNameChecked")
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
        hidden.style.display = 'none'
    })
    
    input.focus()
    input.value = ""
})