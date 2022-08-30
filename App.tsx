import { StatusBar } from 'expo-status-bar';

import styled from 'styled-components/native';

const TestContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
`;

const TestText = styled.Text`
    color: red;
    font-size: 30px;
`;

export default function App() {
    return (
        <TestContainer>
            <TestText>Empty</TestText>
            <StatusBar style='auto' />
        </TestContainer>
    );
}
