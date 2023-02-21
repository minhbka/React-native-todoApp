import React, { useState, Dispatch, SetStateAction } from 'react';
import { Text } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListView, TodoText, TodoDate, ListViewHidden, HiddenButton, SwipedTodoText, colors } from '../styles/appStyles';

export interface Todo {
    title: string,
    date: string,
    key: string
}
export interface ListItemsProps {
    todos: Todo[],
    setTodos: Dispatch<SetStateAction<Todo[]>>,
    handleTriggerEdit:(item:any)=>void
}
const ListItems = (listItemsProps: ListItemsProps) => {
    const [swipedRow, setSwipedRow] = useState(null);
    const handleDeleteTodo = (rowMap: any, rowKey: string) => {
        const newTodos = [...listItemsProps.todos]
        const todoIndex = listItemsProps.todos.findIndex((todo: Todo) => todo.key === rowKey);
        newTodos.splice(todoIndex, 1);
        listItemsProps.setTodos(newTodos);
    }
    return (
        <>
            {listItemsProps.todos.length == 0 && <TodoText>You have no todo today</TodoText>}
            {listItemsProps.todos.length != 0 && <SwipeListView
                data={listItemsProps.todos}
                renderItem={(data) => {
                    const RowText = data.item.key == swipedRow ? SwipedTodoText : TodoText;
                    return (
                        <ListView underlayColor={colors.primary}
                            onPress={()=>{
                                listItemsProps.handleTriggerEdit(data.item)
                            }}
                        >
                            <>
                                <RowText>{data.item.title}</RowText>
                                <TodoDate>{data.item.date}</TodoDate>
                            </>

                        </ListView>
                    )

                }}
                renderHiddenItem={(data, rowMap) => {
                    return (
                        <ListViewHidden>
                            <HiddenButton onPress={() => handleDeleteTodo(rowMap, data.item.key)}>

                                <Icon name="trash" size={25} color={colors.secondary} />
                            </HiddenButton>
                        </ListViewHidden>
                    )

                }}
                leftOpenValue={80}
                previewRowKey={"1"}
                previewOpenValue={80}
                previewOpenDelay={3000}
                disableLeftSwipe={true}
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1, paddingBottom: 30, marginBottom: 40
                }}
                onRowOpen={(rowKey: any) => {
                    setSwipedRow(rowKey)
                }}

                onRowClose={() => {
                    setSwipedRow(null)
                }}
            />}
        </>
    );
};

export default ListItems;
