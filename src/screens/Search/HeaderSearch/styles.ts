import styled from 'styled-components/native';
import { Title } from '../../../components/Styles';

export const ContainerHeaderSearch = styled.View`
    margin: 15px 0px;
`;

export const AreaInputSearch = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const TitleSearch = styled(Title)`
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