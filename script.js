let tasksarray = [];
function Addtasks() {
    const inputtasks = document.querySelector('.inputasks');
    const name = inputtasks.value;
    inputtasks.value = '';

    const inputdue = document.querySelector('.inputdue');
    const due = inputdue.value;
    inputdue.value = '';

    const category = document.querySelector('.inputcategory').value;
    tasksarray.push({ name, due, checked: false, category });
    displaylist();
}
function toggleCheckbox(index) {
    tasksarray[index].checked = !tasksarray[index].checked;
    displaylist();
}

function editTask(index) {
    const task = tasksarray[index];
    document.querySelector(`#task-name-${index}`).innerHTML = `
        <input type="text" value="${task.name}" id="edit-name-${index}" onkeypress="handleKeyPress(event, ${index})">
    `;
    document.querySelector(`#task-due-${index}`).innerHTML = `
        <input type="date" value="${task.due}" id="edit-due-${index}" onkeypress="handleKeyPress(event, ${index})">
    `;
}
function handleKeyPress(event, index) {
    if (event.key === 'Enter') {
        saveEdit(index);
    }
}
function saveEdit(index) {
    const newName = document.querySelector(`#edit-name-${index}`).value;
    const newDue = document.querySelector(`#edit-due-${index}`).value;
    tasksarray[index] = { ...tasksarray[index], name: newName, due: newDue };
    displaylist();
}
function displaylist() {
    const selectedCategory = document.querySelector('.inputcategory').value;
    let todoHTML = '';
    const tasksToDisplay = selectedCategory === 'All'
        ? tasksarray
        : tasksarray.filter(task => task.category === selectedCategory);
    tasksToDisplay.forEach((todobj, index) => {
        const { name, due, checked } = todobj;
        const taskIndex = selectedCategory === 'All' ? index : tasksarray.indexOf(todobj);
        const html = `
            <div class="d">
                <input class="cdiv" type="checkbox" id="task-${taskIndex}" ${checked ? 'checked' : ''} onchange="toggleCheckbox(${taskIndex})">  </div>
                <div class="tn" id="task-name-${taskIndex}">${name}</div>
                <i class="fas fa-edit edit-icon" onclick="editTask(${taskIndex})"></i>
                <div class="dub" id="task-due-${taskIndex}">${due}</div>
                <button onclick="tasksarray.splice(${taskIndex}, 1); displaylist()" class="db">Out!</button> `;
        todoHTML += html;
    });

    document.querySelector('.taskslist').innerHTML = todoHTML;
}

