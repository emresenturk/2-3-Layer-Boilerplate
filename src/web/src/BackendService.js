const backendUrl = process.env.REACT_APP_BACKEND_URL;
const address = `${backendUrl}/todos`;
export async function getTodos() {
  try {
    const response = await fetch(address);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const todos = response.json();
    return todos;
  } catch (error) {
    console.error(error.message);
  }
}

export async function addTodo(text) {
  try {
    const response = await fetch(address, {
      method: "POST",
      body: JSON.stringify({ id: 0, text: text }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const todo = response.json();
    return todo;
  } catch (error) {
    console.error(error.message);
  }
}

export async function updateTodo(id, text) {
  try {
    const response = await fetch(address, {
      method: "PUT",
      body: JSON.stringify({ id, text }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const todo = response.json();
    return todo;
  } catch (error) {
    console.error(error.message);
  }
}

export async function deleteTodo(id) {
  try {
    const response = await fetch(`${address}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const todo = response.json();
    return todo;
  } catch (error) {
    console.error(error.message);
  }
}
