import React, { useState, FC, ReactElement } from 'react';
import './App.css';
import { Button, Input, List } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons';
const Parse = require('parse/dist/parse.min.js');

export const TodoList: FC<{}> = (): ReactElement => {
  // State variables
  const initialReadResults: Parse.Object[] = [];
  const [readResults, setReadResults] = useState(initialReadResults);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  // Functions used by the screen components
  const createTodo = async function (): Promise<boolean> {
    // This value comes from a state variable
    const newTodoTitleValue: string = newTodoTitle;
    // Creates a new Todo parse object instance
    let Todo: Parse.Object = new Parse.Object('Todo');
    Todo.set('title', newTodoTitleValue);
    Todo.set('done', false);
    // After setting the to-do values, save it on the server
    try {
      await Todo.save();
      // Success
      alert('Success! To-do created!');
      // Refresh to-dos list to show the new one (you will create this function later)
      readTodos();
      return true;
    } catch (error: any) {
      // Error can be caused by lack of Internet connection
      alert('Error!' + error.message);
      return false;
    }
  };

  const readTodos = async function (): Promise<boolean> {
    // Reading parse objects is done by using Parse.Query
    const parseQuery: Parse.Query = new Parse.Query('Todo');
    try {
      let todos: Parse.Object[] = await parseQuery.find();
      // Be aware that empty or invalid queries return as an empty array
      // Set results to state variable
      setReadResults(todos);
      return true;
    } catch (error: any) {
      // Error can be caused by lack of Internet connection
      alert('Error!' + error.message);
      return false;
    }
  };

  const updateTodo = async function (todoId: string, done: boolean): Promise<boolean> {
    // Create a new to-do parse object instance and set todo id
    let Todo: Parse.Object = new Parse.Object('Todo');
    Todo.set('objectId', todoId);
    // Set new done value and save Parse Object changes
    Todo.set('done', done);
    try {
      await Todo.save();
      // Success
      alert('Success! To-do updated!');
      // Refresh todos list
      readTodos();
      return true;
    } catch (error: any) {
      // Error can be caused by lack of Internet connection
      alert('Error!' + error.message);
      return false;
    }
  };

  const deleteTodo = async function (todoId: string): Promise<boolean> {
    // Create a new Todo parse object instance and set todo id
    let Todo: Parse.Object = new Parse.Object('Todo');
    Todo.set('objectId', todoId);
    // .destroy should be called to delete a parse object
    try {
      await Todo.destroy();
      alert('Success! To-do deleted!');
      // Refresh to-dos list to remove this one
      readTodos();
      return true;
    } catch (error: any) {
      // Error can be caused by lack of Internet connection
      alert('Error!' + error.message);
      return false;
    }
  };

  return (
    <div>
      <div className="header">
        <img
          className="header_logo"
          alt="Back4App Logo"
          src={
            'https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png'
          }
        />
        <p className="header_text_bold">{'React on Back4App'}</p>
        <p className="header_text">{'To-do List'}</p>
      </div>
      <div className="container">
        <div className="flex_between">
          <h2 className="list_heading">Todo List</h2>
          {/* To-do read (refresh) button */}
          <Button
            type="primary"
            shape="circle"
            color={'#208AEC'}
            onClick={readTodos}
            icon={<RedoOutlined />}
          ></Button>
        </div>
        <div className="new_todo_wrapper flex_between">
          {/* Todo create text input */}
          <Input
            value={newTodoTitle}
            onChange={(event: {target: {value: string}}) => setNewTodoTitle(event.target.value)}
            placeholder="New Todo"
            size="large"
          />
          {/* Todo create button */}
          <Button
            type="primary"
            className="create_todo_button"
            color={'#208AEC'}
            size={'large'}
            onClick={createTodo}
            icon={<PlusOutlined />}
          >
            Add
          </Button>
        </div>
        <div>
          {/* Todo read results list */}
          {readResults !== null &&
            readResults !== undefined &&
            readResults.length > 0 && (
              <List
                dataSource={readResults}
                renderItem={(item: Parse.Object) => (
                  <List.Item className="todo_item">
                    <p
                      className={
                        item.get('done') === true
                          ? 'todo_text_done'
                          : 'todo_text'
                      }
                    >
                      {item.get('title')}
                    </p>
                    <div className="flex_row">
                      {/* Todo update button */}
                      {item.get('done') !== true && (
                        <Button
                          type="primary"
                          shape="circle"
                          className="todo_button"
                          onClick={() => updateTodo(item.id, true)}
                          icon={
                            <CheckOutlined className="todo_button_icon_done" />
                          }
                        ></Button>
                      )}
                      {/* Todo delete button */}
                      <Button
                        type="primary"
                        shape="circle"
                        className="todo_button"
                        onClick={() => deleteTodo(item.id)}
                        icon={
                          <CloseOutlined className="todo_button_icon_remove" />
                        }
                      ></Button>
                    </div>
                  </List.Item>
                )}
              />
            )}
        </div>
      </div>
    </div>
  );
};
