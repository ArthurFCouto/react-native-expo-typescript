import styled from 'styled-components/native';

export const Title = styled.Text`
    color: ${(props) => props.theme.colors.primary};
    font-size: 36px;
    font-weight: bold;
    margin: 5px;
`;

export const SubTitle = styled(Title)`
    font-size: 24px;
    font-weight: 400;
    text-align: center;
`;

export const ViewInput = styled.View`
    margin-bottom: 20px;
    margin-top: 30px;
    width: 80%;
`;

const InputCustom = styled.TextInput`
    background-color: #FFFFFF;
    border-radius: 8px;
    margin-bottom: 15px;
    padding: 20px 10px;
    width: auto;
`;

export const InputEmail = styled(InputCustom)``;

export const InputPassword = styled(InputCustom)``;

export const Button = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.button};
    border-radius: 8px;
    margin-bottom: 15px;
    padding: 10px 15px;
    width: 50%;
`;

export const LabelButton = styled.Text`
    color: ${(props)=> props.theme.colors.light};
`;