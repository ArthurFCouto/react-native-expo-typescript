import styled from 'styled-components/native';

export const ContainerHeaderSearch = styled.View`
    margin: 15px 0px;
`;

export const TitleSearch = styled.Text`
    color: ${(props) => props.theme.colors.primary};
    font-size: 36px;
    font-weight: bold;
    margin: 15px 0px;
`;

export const DetailsSearch = styled.View`
    flex-direction: row;
    margin-top: 15px;
`;

export const LabelSearch = styled.Text`
    color: ${(props) => props.theme.colors.primary};
`;

export const LabelSearchName = styled(LabelSearch)`
    font-weight: bold;
    text-transform: uppercase;
`;