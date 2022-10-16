import styled from 'styled-components/native';

export const ContainerPriceSubmit = styled.View`
    flex: 0.5;
    background-color: ${(props)=> props.theme.colors.bgPrimary};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-top: auto;
    padding: 10px;
`;

export const AreaInputPrice = styled.View`
    padding: 5px 0px;
    margin: 5px 0px;
`;

export const LabelPrice = styled.Text`
    color: ${(props)=> props.theme.colors.primary};
    font-size: 22px;
`;

export const InputPrice = styled.TextInput`
    background-color: #FFFFFF;
    border-radius: 8px;
    font-size: 18px;
    margin: 5px 0px;
    padding: 15px 10px;
    text-align: right;
`;

export const LabelMarket = styled(LabelPrice)``;

export const AreaButton = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
`;

export const ContainerButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.button};
    border-radius: 8px;
    margin: 10px 0px;
    padding: 15px;
    width: 100%;
`;

export const LabelButton = styled.Text`
    color: ${(props) => props.theme.colors.light};
    font-weight: bold;
`;