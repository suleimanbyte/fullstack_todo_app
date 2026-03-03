const form = document.getElementById("todoForm");
document.addEventListener("DOMContentLoaded", getTodos);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(e.preventDefault());
  const title = document.getElementById("title");
  const description = document.getElementById("description");

  const response = await fetch("http://localhost:5000/todos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
    }),
  });

  const res = await response.json();
  if (response.ok) {
    title.value = "";
    description.value = "";
    getTodos();
  } else {
    console.error(res.msg);
  }
});

async function getTodos() {
  const response = await fetch("http://localhost:5000/todos/");
  const todos = await response.json();

  const todoList = document.getElementById("todos")
  todoList.innerHTML = "";
  todos.forEach(todo => {
    
    const h2 = document.createElement("h2")
    const p = document.createElement("p")
    
    h2.textContent = todo.title;
    p.textContent = todo.description;

    if (todo.completed) {
      li.style.textDecoration = "line-through";
    }

    todoList.appendChild(h2)
    todoList.appendChild(p)
  })

}
