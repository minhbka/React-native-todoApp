import React from 'react';
import { HeaderView, HeaderTitle, HeaderButton, colors } from '../styles/appStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
const Header = ({handleClearTodos}: {handleClearTodos: ()=>void}) => {
    return (
        <HeaderView>
            <HeaderTitle>Todos</HeaderTitle>
            <HeaderButton onPress={handleClearTodos}>
                <Icon name="trash" size={25} color={colors.tertiary}/>
            </HeaderButton>
        </HeaderView>
    );
}

export default Header