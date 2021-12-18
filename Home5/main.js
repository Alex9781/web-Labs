'use strict';

function showAlert(msg, category = 'success') {
    let alerts = document.querySelector('.alerts');
    let newAlertElement = document.querySelector('.alert-template').cloneNode(true);
    newAlertElement.querySelector('.msg').innerHTML = msg;
    if (category == "success") {
        newAlertElement.classList.add('alert-success');
    }
    else {
        newAlertElement.classList.add('alert-danger');
    }
    newAlertElement.classList.remove('d-none');
    alerts.append(newAlertElement);
}

async function createTaskElement(form) {
    let data = await postData({
        "name": form.elements['name'].value,
        "desc": form.elements['description'].value,
        "status": form.elements['column'].value
    });

    if (data) {
        showAlert(data, 'error');
        return;
    }

    let newTaskElement = document.getElementById('task-template').cloneNode(true);
    newTaskElement.id = taskCounter++;
    newTaskElement.querySelector('.task-name').innerHTML = form.elements['name'].value;
    newTaskElement.querySelector('.task-description').innerHTML = form.elements['description'].value;
    newTaskElement.classList.remove('d-none');
    for (let btn of newTaskElement.querySelectorAll('.move-btn')) {
        btn.onclick = moveBtnHandler;
    }

    return newTaskElement;
}

async function updateTask(form) {
    let data = await putData({
        "name": form.elements['name'].value,
        "desc": form.elements['description'].value
    }, form.elements['task-id'].value)

    if (data) {
        showAlert(data, 'error');
        return true;
    }

    let taskElement = document.getElementById(form.elements['task-id'].value);
    taskElement.querySelector('.task-name').innerHTML = form.elements['name'].value;
    taskElement.querySelector('.task-description').innerHTML = form.elements['description'].value;

}

async function actionTaskBtnHandler(event) {
    let action, form, listElement, tasksCounterElement, alertMsg;
    form = event.target.closest('.modal').querySelector('form');
    action = form.elements['action'].value;


    if (action == 'create') {
        listElement = document.getElementById(`${form.elements['column'].value}-list`);

        let element = await createTaskElement(form);
        if (!element) return;

        listElement.append(element);

        tasksCounterElement = listElement.closest('.card').querySelector('.tasks-counter');
        tasksCounterElement.innerHTML = Number(tasksCounterElement.innerHTML) + 1;

        alertMsg = `Задача ${form.elements['name'].value} была успешно создана!`;
    } else if (action == 'edit') {
        let error = await updateTask(form);

        if (!error) alertMsg = `Задача ${form.elements['name'].value} была успешно обновлена!`;
    }

    if (alertMsg) {
        showAlert(alertMsg);
    }
}

function setFormValues(form, taskId) {
    let taskElement = document.getElementById(taskId);
    form.elements['name'].value = taskElement.querySelector('.task-name').innerHTML;
    form.elements['description'].value = taskElement.querySelector('.task-description').innerHTML;
    form.elements['task-id'].value = taskId;
}

function resetForm(form) {
    form.reset();
    form.querySelector('select').closest('.mb-3').classList.remove('d-none');
    form.elements['name'].classList.remove('form-control-plaintext');
    form.elements['description'].classList.remove('form-control-plaintext');
}

function prepareModalContent(event) {
    let form = event.target.querySelector('form');
    resetForm(form);

    let action = event.relatedTarget.dataset.action || 'create';

    form.elements['action'].value = action;
    event.target.querySelector('.modal-title').innerHTML = titles[action];
    event.target.querySelector('.action-task-btn').innerHTML = actionBtnText[action];

    if (action == 'edit' || action == 'show') {
        setFormValues(form, event.relatedTarget.closest('.task').id);
        event.target.querySelector('select').closest('.mb-3').classList.add('d-none');
    }

    if (action == 'show') {
        form.elements['name'].classList.add('form-control-plaintext');
        form.elements['description'].classList.add('form-control-plaintext');
    }
}

async function deleteTaskBtnHandler(event) {
    let form = event.target.closest('.modal').querySelector('form');
    let taskElement = document.getElementById(form.elements['task-id'].value);
    
    let data = await deleteData(form.elements['task-id'].value);

    if (data) {
        showAlert(data, 'error');
        return;
    }


    let tasksCounterElement = taskElement.closest('.card').querySelector('.tasks-counter');
    tasksCounterElement.innerHTML = Number(tasksCounterElement.innerHTML) - 1;

    taskElement.remove();

}

async function moveBtnHandler(event) {
    let taskElement = event.target.closest('.task');
    let listElement = taskElement.closest('ul');

    let data = await putData({ 'status': listElement.id == 'to-do-list' ? 'done' : 'to-do' }, taskElement.id);

    if (data) {
        showAlert(data, 'error');
        return;
    }

    let targetListElement = document.getElementById(listElement.id == 'to-do-list' ? 'done-list' : 'to-do-list');

    let tasksCounterElement = taskElement.closest('.card').querySelector('.tasks-counter');
    tasksCounterElement.innerHTML = Number(tasksCounterElement.innerHTML) - 1;

    targetListElement.append(taskElement);

    tasksCounterElement = targetListElement.closest('.card').querySelector('.tasks-counter');
    tasksCounterElement.innerHTML = Number(tasksCounterElement.innerHTML) + 1;
}

let taskCounter = 0;

let titles = {
    'create': 'Создание новой задачи',
    'show': 'Просмотр задачи',
    'edit': 'Редактирование задачи'
};

let actionBtnText = {
    'create': 'Создать',
    'show': 'Ок',
    'edit': 'Сохранить'
};

//ы
async function getAllData() {
    let response = await fetch("http://tasks-api.std-900.ist.mospolytech.ru/api/tasks?api_key=50d2199a-42dc-447d-81ed-d68a443b697e")
    return await response.json();
}

//ы
async function postData(data) {
    var formData = new FormData();
    for (const name in data) {
        formData.append(name, data[name]);
    }

    let response = await fetch("http://tasks-api.std-900.ist.mospolytech.ru/api/tasks?api_key=50d2199a-42dc-447d-81ed-d68a443b697e", {
        method: 'POST',
        body: formData,
        redirect: 'follow'
    });

    var error = (await response.json()).error;

    return error;
}

//ы
async function deleteData(id) {
    let response = await fetch(`http://tasks-api.std-900.ist.mospolytech.ru/api/tasks/${id}?api_key=50d2199a-42dc-447d-81ed-d68a443b697e`, {
        method: 'DELETE',
        redirect: 'follow'
    });

    var error = (await response.json()).error;

    return error;
}

async function putData(data, id) {
    var formData = new FormData();
    for (const name in data) {
        formData.append(name, data[name]);
    }

    let response = await fetch(`http://tasks-api.std-900.ist.mospolytech.ru/api/tasks/${id}?api_key=50d2199a-42dc-447d-81ed-d68a443b697e`, {
        method: 'PUT',
        body: formData,
        redirect: 'follow'
    });

    var error = (await response.json()).error;

    return error;
}

//ы
function renderTasks(tasks) {
    for (const task of tasks) {
        let newTaskElement = document.getElementById('task-template').cloneNode(true);
        newTaskElement.id = task.id;
        newTaskElement.querySelector('.task-name').innerHTML = task.name;
        newTaskElement.querySelector('.task-description').innerHTML = task.desc;
        newTaskElement.classList.remove('d-none');
        for (let btn of newTaskElement.querySelectorAll('.move-btn')) {
            btn.onclick = moveBtnHandler;
        }

        let listElement = document.getElementById(`${task.status}-list`);
        listElement.append(newTaskElement);

        let tasksCounterElement = listElement.closest('.card').querySelector('.tasks-counter');
        tasksCounterElement.innerHTML = Number(tasksCounterElement.innerHTML) + 1;
    }
}

window.onload = function () {
    document.querySelector('.action-task-btn').onclick = actionTaskBtnHandler;
    document.getElementById('task-modal').addEventListener('show.bs.modal', prepareModalContent);
    document.getElementById('remove-task-modal').addEventListener('show.bs.modal', function (event) {
        let taskElement = event.relatedTarget.closest('.task');
        let form = event.target.querySelector('form');
        form.elements['task-id'].value = taskElement.id;
        event.target.querySelector('.task-name').innerHTML = taskElement.querySelector('.task-name').innerHTML;
    });
    document.querySelector('.delete-task-btn').onclick = deleteTaskBtnHandler;
    for (let btn of document.querySelectorAll('.move-btn')) {
        btn.onclick = moveBtnHandler;
    }

    //ы
    getAllData().then(function (result) {
        renderTasks(result.tasks);
    });
}