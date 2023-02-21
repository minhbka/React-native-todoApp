import React, { useState } from "react";
import { View } from "react-native";
import Header from "./Header"
import ListItems from "./ListItems";
import { Todo, ListItemsProps } from "./ListItems";
import InputModal from "./InputModal";
const Home = () => {
    const initialTodos: Todo[] = [{
        title: "Get some snacks",
        date: "Fri, 17 Feb 2023 16:00:00 GMT",
        key: "1"
    }, {
        title: "Get some groceries",
        date: "Sat, 18 Feb 2023 16:00:00 GMT",
        key: "2"
    }, {
        title: "Prepare script",
        date: "Sun, 19 Feb 2023 16:00:00 GMT",
        key: "3"
    }]

    const [todos, setTodos] = useState(initialTodos)

    const handleClearTodos = () => {
        setTodos([])
    }
    const [modalVisible, setModalVisible] = useState(false)
    const [todoInputValue, setTodoInputValue] = useState("")

    const handleAddTodo = (todo: Todo) => {
        const newTodos = [...todos, todo]
        setTodos(newTodos)
        setModalVisible(false)
    }

    const [todoToBeEdited, setTodoToBeEdited] = useState<Todo | null>(null)

    const handleTriggerEdit = (item: Todo | null) => {
        setTodoToBeEdited(item)
        setModalVisible(true)
        if (item !== null) {
            setTodoInputValue(item.title)
        }

    }

    const handleEditTodo = (editedTodo: Todo) => {
        const newTodos = [...todos];
        const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
        newTodos.splice(todoIndex, 1, editedTodo);
        setTodos(newTodos);
        setTodoToBeEdited(null);
        setModalVisible(false);

    }
    return (
        <>
            <Header handleClearTodos={handleClearTodos} />
            <ListItems todos={todos} setTodos={setTodos} handleTriggerEdit={handleTriggerEdit} />
            <InputModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                todoInputValue={todoInputValue}
                setTodoInputValue={setTodoInputValue}
                handleAddTodo={handleAddTodo}
                todoToBeEdited={todoToBeEdited}
                setTodoToBeEdited={setTodoToBeEdited}
                handleEditTodo={handleEditTodo}
                todos={todos}
            />
        </>

    )
}

export default Home;
