const Telegram = require("telegram-node-bot");

class TodoController extends Telegram.TelegramBaseController {
  /**
   * @param {Scope} $
   */
  addHandler($) {
    let todo = $.message.text.split(" ").slice(1).join(" ");

    if (!todo) $.sendMessage("Sorry, you have to enter a todo name");

    $.getUserSession("todos").then((todos) => {
      if (!Array.isArray(todos)) $.setUserSession("todos", [todo]);
      else $.setUserSession("todos", todos.concat([todo]));
      if (todo) $.sendMessage(`"${todo}" was added to the list successfully`);
    });
  }

  getHandler($) {
    $.getUserSession("todos").then((todos) => {
      if (todos.length > 0)
        $.sendMessage(this._serializeTodos(todos), { parseMode: "MarkDown" });
      else $.sendMessage("Your todo list is empty");
    });
  }

  _serializeTodos(todos) {
    let string = "Your todos are:\n\n";
    todos.forEach((todo, index) => {
      string += `${index + 1}. ${todo}\n`;
    });
    return string;
  }

  checkHandler($) {
    let checktodo = $.message.text.split(" ").slice(1)[0];
    if (!checktodo)
      $.sendMessage("You have to enter the todo to check out");
    else this._checkTodo(parseInt(checkTodo) - 1); 
    
  }

  _checkTodo(todo) {
    $.getUserSession("todos").then((todos) => {
      if (!todos) $.sendMessage("You have no todos to check out");
      else todos.remove(todo); $.sendMessage('Todo Checked!')
    });
  }

  get routes() {
    return {
      addCommand: "addHandler",
      getCommand: "getHandler",
      checkCommand: "checkHandler",
    };
  }
}

module.exports = TodoController;

// add - Add a new todoList
// gettodos -  Get a list of todos

