let tasks = [];

function addTask() {
  const taskInput = document.getElementById('task-input');
  const dateInput = document.getElementById('date-input');
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === '' || date === '') {
    alert('Mohon isi tugas dan tanggal!');
    return;
  }

  tasks.push({ task, date, done: false });
  taskInput.value = '';
  dateInput.value = '';
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  if (confirm('Yakin ingin menghapus tugas ini?')) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function renderTasks() {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  const filter = document.getElementById('filter').value;

  tasks.forEach((t, i) => {
    if (
      (filter === 'done' && !t.done) ||
      (filter === 'not-done' && t.done)
    ) return;

    const card = document.createElement('div');
    card.className = 'todo-card' + (t.done ? ' done' : '');
    card.innerHTML = `
      <div>
        <strong>${t.task}</strong><br/>
        <small>${t.date}</small>
      </div>
      <div class="todo-actions">
        <button class="btn-done" onclick="toggleDone(${i})">${t.done ? '↩' : '✓'}</button>
        <button class="btn-delete" onclick="deleteTask(${i})">🗑</button>
      </div>
    `;
    list.appendChild(card);
  });
}
