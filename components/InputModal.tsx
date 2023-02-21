import React, { useState, Dispatch, SetStateAction } from 'react';
import { Modal } from 'react-native-navigation'
import { Alert } from 'react-native'
import { Todo, ListItemsProps } from "./ListItems";

import { ModalActionGroup, ModalContainer, ModalView, StyledInput, ModalAction, ModalButton, ModalIcon, HeaderTitle, colors } from '../styles/appStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputModal = ({ modalVisible, setModalVisible, todoInputValue, setTodoInputValue, handleAddTodo, todoToBeEdited, setTodoToBeEdited, handleEditTodo, todos }:
    {
        modalVisible: boolean,
        setModalVisible: Dispatch<SetStateAction<boolean>>,
        todoInputValue: string,
        setTodoInputValue: Dispatch<SetStateAction<string>>,
        handleAddTodo: (todo: Todo) => void,
        todoToBeEdited: Todo | null,
        setTodoToBeEdited: Dispatch<SetStateAction<Todo | null>>,
        handleEditTodo:(editedTodo: Todo) => void,
        todos: Todo[]
    }) => {
    const hanldeCloseModal = () => {
        setModalVisible(false);
        setTodoInputValue("");
        setTodoToBeEdited(null);
    }

    const handleSubmit = () => {
        if(!todoToBeEdited){
            handleAddTodo({
                title: todoInputValue,
                date: new Date().toUTCString(),
                key: `${(todos[todos.length - 1] && parseInt(todos[todos.length - 1].key) + 1) || 1}`
            });
        }
        else{
            handleEditTodo({
                title: todoInputValue,
                date: todoToBeEdited.date,
                key: todoToBeEdited.key
            })
        }
        

        setTodoInputValue("");
    }
    return (
        <>
            <ModalButton onPress={() => { setModalVisible(true) }}>
                <Icon name="plus" size={30} color={colors.secondary} />
            </ModalButton>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={hanldeCloseModal}
            >
                <ModalContainer>
                    <ModalView>
                        <ModalIcon>
                            <HeaderTitle>Todos</HeaderTitle>
                            <Icon name="edit" size={30} color={colors.tertiary} />
                        </ModalIcon>
                        <StyledInput
                            placeholder='Add a todo'
                            placeholderTextColor={colors.alternative}
                            selectionColor={colors.secondary}
                            autoFocus={true}
                            onChangeText={(text) => setTodoInputValue(text)}
                            value={todoInputValue}
                            onSubmitEditing={handleSubmit}
                        />
                        <ModalActionGroup>
                            <ModalAction color={colors.primary} onPress={hanldeCloseModal}>
                                <Icon name="close" size={28} color={colors.tertiary} />
                            </ModalAction>
                            <ModalAction color={colors.tertiary} onPress={handleSubmit}>
                                <Icon name="check" size={28} color={colors.secondary} />
                            </ModalAction>
                        </ModalActionGroup>
                    </ModalView>
                </ModalContainer>

            </Modal>
        </>
    )
}

export default InputModal
