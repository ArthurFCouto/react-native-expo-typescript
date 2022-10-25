import styled from 'styled-components/native';

export const AreaInput = styled.View`
    margin-bottom: 20px;
    margin-top: 30px;
    width: 80%;
`;

export const LineInput = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 8px;
    margin-bottom: 15px;
    margin-top: 5px;
    padding: 0px 8px;
`;

const InputCustom = styled.TextInput<{ logged: boolean }>`
    flex: 1;
    color: ${(props) => props.logged ? props.theme.colors.gray : props.theme.colors.dark};
    font-size: 18px;
    background-color: #FFFFFF;
    padding: 20px 10px;
`;

export const InputEmail = styled(InputCustom)``;

export const InputPassword = styled(InputCustom)``;