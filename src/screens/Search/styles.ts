import styled from 'styled-components/native';

export const ContainerSearch = styled.View`
    flex: 1;
    background-color: ${(props) => props.theme.colors.bgSecondary};
    padding: 8px;
`;

export const AreaFilter = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: flex-end;
    background-color: ${(props) => props.theme.colors.bgTabBar};
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 15px 8px;
`;

export const AreaAnimation = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const ContainerComponentEmpty = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
`;

export const LabelEmpty = styled.Text`
    color: ${(props) => props.theme.colors.button};
    font-size: 24px;
`;