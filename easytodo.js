/**
 * Easy Todo List
 */

class TodoList {
  constructor() {
    this.todos = [];
    //  [
    //   { 'checked': boolean, 'todo': string }, ...
    //  ]
  }

  clear() {
    this.todos = [];
  }

  append(tasks) {
    for (let i = 0; i < tasks.length; ++i) {
      this.todos.push({
        'checked': false, 'task': tasks[i]
      });
    }
  }

  // Note: change this.todos, need update html-nodes for todos.
  removeChecked() {
    this.todos = this.todos.filter(todo => todo.checked === false);
  }
};

const convertTextToArray = function(txt) {
  const tl = txt.split(/\r\n|\n/);
  return tl.map(s => s.trim()).filter(s => s.length > 0);
};

const createListNode = function(txt, checked, listener) {
  const li = document.createElement('li');

  const chbox = document.createElement('input');
  chbox.setAttribute('type', 'checkbox');
  chbox.addEventListener('change', listener);
  if (checked) {
    chbox.setAttribute('checked', 'checked');
  }

  const label = document.createElement('label');
  label.appendChild(chbox);
  label.appendChild(document.createTextNode(txt));
  li.appendChild(label);

  return li;
};


window.onload = function() {
  const ul_todolist = document.getElementById("todolist");
  const tlist = new TodoList();

  const clearTodoList = function() {
    while (ul_todolist.firstChild) {
      ul_todolist.removeChild(ul_todolist.firstChild);
    }
  };

  const updateTodoList = function() {
    clearTodoList();

    for (let i = 0; i < tlist.todos.length; ++i) {
      const todo = tlist.todos[i];
      ul_todolist.appendChild(createListNode(todo.task, todo.checked, function() {
        tlist.todos[i].checked = this.checked;
      }));
    }
  };


  //---------------------------------------------------------------------------
  //  Event Listener
  //---------------------------------------------------------------------------
  const ta_textlist = document.getElementById('ta_textlist');

  document.getElementById('btn_submit').addEventListener('click', function(e) {
    e.preventDefault();

    const tasks = convertTextToArray(ta_textlist.value.trim());
    if (tasks.length === 0) return;

    tlist.clear();
    tlist.append(tasks);
    updateTodoList();
  });

  document.getElementById('btn_append').addEventListener('click', function(e) {
    e.preventDefault();

    const tasks = convertTextToArray(ta_textlist.value.trim());
    if (tasks.length === 0) return;

    tlist.append(tasks);
    updateTodoList();
  });

  document.getElementById('btn_remove_checked').addEventListener('click', function(e) {
    tlist.removeChecked();
    updateTodoList();
  });

  document.getElementById('btn_remove_all').addEventListener('click', function(e) {
    tlist.clear();
    clearTodoList();
  });
};
