import styled from 'styled-components/native';

export const ContainerAddInformation = styled.View`
    background-color: ${(props)=> props.theme.colors.bgTabBar};
    border-radius: 8px;
    padding: 10px 5px;
    margin: 5px 0px;
`;

export const HeaderAddInformation = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px;
`;

export const LabelAddInformation = styled.Text`
    font-size: 18px;
    color: ${(props)=> props.theme.colors.primary};
`;

export const Line = styled.View`
    flex-direction: row;
    margin: 10px 0px 5px 0px;
`;

export const ColumnLeft = styled.View`
    width: 30%;
`;

export const ColumnRight = styled.View`
    width: 70%;
    margin-left: 5px;
`;

export const LabelLeft = styled.Text`
    color: ${(props)=> props.theme.colors.gray};
    font-weight: 500;
`;

export const LabelRight = styled.Text`
    color: ${(props)=> props.theme.colors.primary};
`;

export const LabelRightDetails = styled(LabelRight)`
    text-align: justify;
    padding-right: 5px;
`;