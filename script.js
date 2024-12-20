document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todayList = document.getElementById('today-list');
  const futureList = document.getElementById('future-list');
  const completedList = document.getElementById('completed-list');

  let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

  const renderLists = () => {
    todayList.innerHTML = '';
    futureList.innerHTML = '';
    completedList.innerHTML = '';

    const today = new Date().toISOString().split('T')[0];

    let todayAssignmentId = 1;
    let futureAssignmentId = 1;
    let completedAssignmentId = 1;

    todoList.forEach(item => {
      const listItem = document.createElement('li');
      let assignmentId;

      if (item.completed) {
        assignmentId = completedAssignmentId++;
        listItem.innerHTML = `
  <span class="task-name">${assignmentId}. ${item.name}</span>
  <span class="task-date">${item.date}</span>
  <span class="task-priority">Priority: ${item.priority}</span>
`; 
        listItem.classList.add('completed');
        completedList.appendChild(listItem);
      } else if (item.date === today) {
        assignmentId = todayAssignmentId++;
        listItem.innerHTML = `
        <span class="task-name">${assignmentId}. ${item.name}</span>
        <span class="task-date">${item.date}</span>
        <span class="task-priority">Priority: ${item.priority}</span>
      `;
        listItem.classList.add('back-ground');
        todayList.appendChild(listItem);
      } else {
        assignmentId = futureAssignmentId++;
        listItem.innerHTML = `
        <span class="task-name">${assignmentId}. ${item.name}</span>
        <span class="task-date">${item.date}</span>
        <span class="task-priority">Priority: ${item.priority}</span>
      `;
        listItem.classList.add('back-ground');
        futureList.appendChild(listItem);
      }

      
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-btn');

      const deleteImage = document.createElement('img');
      deleteImage.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxoBQ_mlp4xl7HKH6mGz4_Vs6DZ43vbY6FXw&s'; // Update with your delete icon URL
      deleteImage.alt = 'Delete';
      deleteImage.width = 20;
      deleteImage.height = 20;

      deleteButton.appendChild(deleteImage);
      deleteButton.addEventListener('click', () => deleteItem(todoList.indexOf(item)));
      listItem.appendChild(deleteButton);

      if (!item.completed) {
        const tickButton = document.createElement('button');
        tickButton.classList.add('complete-btn');

        const tickImage = document.createElement('img');
        tickImage.src = 'https://ih1.redbubble.net/image.3884568067.4187/st,small,507x507-pad,600x600,f8f8f8.u3.jpg'; // Update with your tick icon URL
        tickImage.alt = 'Done';
        tickImage.width = 20;
        tickImage.height = 20;

        tickButton.appendChild(tickImage);
        tickButton.addEventListener('click', () => toggleComplete(todoList.indexOf(item)));
        listItem.appendChild(tickButton);
      }

      
    });
  };

  const addItem = (name, date, priority) => {
    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      alert("You cannot add tasks with past dates.");
      return;
    }

    const newItem = { name, date, priority, completed: false };
    todoList.push(newItem);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderLists();
  };

  const deleteItem = index => {
    todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderLists();
  };

  const toggleComplete = index => {
    todoList[index].completed = !todoList[index].completed;
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderLists();
  };

  todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value;
    const itemDate = document.getElementById('item-date').value;
    const itemPriority = document.getElementById('priority').value;
    addItem(itemName, itemDate, itemPriority);
    todoForm.reset();
  });

  renderLists();
});
