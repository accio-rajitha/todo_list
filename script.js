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
          listItem.textContent = `${assignmentId}.  ${item.name}  ${item.date} Priority: ${item.priority}`;
          listItem.classList.add('completed');
          completedList.appendChild(listItem);
        } else if (item.date === today) {
          assignmentId = todayAssignmentId++;
          listItem.textContent = `${assignmentId}.   ${item.name} ${item.date}  Priority: ${item.priority}`;
          listItem.classList.add('back-ground'); 
          todayList.appendChild(listItem);
        } else {
          assignmentId = futureAssignmentId++;
          listItem.textContent = `${assignmentId}.   ${item.name} ${item.date}   Priority: ${item.priority}`;
          listItem.classList.add('back-ground'); 
          futureList.appendChild(listItem);
        }
  
      
        // Add delete button
     const deleteButton = document.createElement('button');
     deleteButton.classList.add('delete-btn'); 

      const deleteImage = document.createElement('img');
      deleteImage.src = 'https://static-00.iconduck.com/assets.00/delete-emoji-409x512-y77jpzk2.png'; // Replace 'path_to_your_delete_image.png' with the actual path of your delete image file
      deleteImage.alt = 'Delete';
      deleteImage.width = 10; 
      deleteImage.height = 10; 
      
      deleteButton.appendChild(deleteImage);
      deleteButton.addEventListener('click', () => deleteItem(todoList.indexOf(item)));
      listItem.appendChild(deleteButton);

        
  
       
        if (!item.completed) {
            const tickButton = document.createElement('button');
            tickButton.classList.add('complete-btn'); 

            const tickImage = document.createElement('img');
            tickImage.src = 'https://ih1.redbubble.net/image.3884568067.4187/st,small,507x507-pad,600x600,f8f8f8.u3.jpg'; // Replace 'path_to_your_tick_image.png' with the actual path of your tick image file
            tickImage.alt = 'Done';
            tickImage.width = 10; 
            tickImage.height = 10; 
            tickButton.appendChild(tickImage);
            tickButton.addEventListener('click', () => toggleComplete(todoList.indexOf(item)));
            listItem.appendChild(tickButton);
        }
        
        
      });
    };
  
   
    const addItem = (name, date, priority) => {
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
