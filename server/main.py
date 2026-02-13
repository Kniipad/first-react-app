from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

async def fetchTodoList():
    try:
      response = await fetch(TODOLIST_API_URL)
      data = await response.json()
      setTodoList(data)
    except err:
      alert("Failed to fetch todo list from backend. Make sure the backend is running.")




todo_list = [
    { "id": 1,
      "title": 'Learn Flask',
      "done": True },
    { "id": 2,
      "title": 'Build a Flask App',
      "done": False },
]

@app.route('/api/todos/', methods=['GET'])      # ระบุให้รับแค่ GET
def get_todos():
    return jsonify(todo_list)

@app.route('/api/todos/', methods=['POST'])
def add_todo():
    data = request.get_json()
    todo = new_todo(data)
    if todo:
        todo_list.append(todo)
        return jsonify(todo)
    else:
        # return http response code 400 for bad requests
        return (jsonify({'error': 'Invalid todo data'}), 400)

def new_todo(data):
    if len(todo_list) == 0:
        id = 1
    else:
        id = 1 + max([todo['id'] for todo in todo_list])

    if 'title' not in data:
        return None
    
    return {
        "id": id,
        "title": data['title'],
        "done": getattr(data, 'done', False),
    }

@app.route('/api/todos/<int:id>/toggle/', methods=['PATCH'])
def toggle_todo(id):
    todos = [todo for todo in todo_list if todo['id'] == id]
    if not todos:
        return (jsonify({'error': 'Todo not found'}), 404)
    todo = todos[0]
    todo['done'] = not todo['done']
    return jsonify(todo)