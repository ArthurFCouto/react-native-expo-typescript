import styled from 'styled-components/native';

export const ContainerSelect = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.bgPrimary};
`;

export const AreaOptions = styled.ScrollView`
    width: 100%;
    max-height: 50%;
    padding: 0px 10px;
`;

export const ContainerOptions = styled.View`
    width: 100%;
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 8px;
    margin: 5px 0px;
    padding: 20px 10px;
`;

export const Label = styled.Text`
    color: ${(props) => props.theme.colors.dark};
    font-size: 18px;
    text-align: center;
`;

export const LabelOptions = styled(Label)`
    color: ${(props) => props.theme.colors.bgSecondary};
`;