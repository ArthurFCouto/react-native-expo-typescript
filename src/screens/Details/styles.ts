import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const height = Dimensions.get('screen').height;

export const ContainerDetails = styled.ScrollView`
    flex: 1;
    position: relative;
    background-color: ${(props) => props.theme.colors.bgSecondary};
`;

export const ButtonBack = styled.TouchableOpacity`
    position: absolute;
    left: 15px;
    top: 30px;
    z-index: 5;
`;

export const ButtonLike = styled(ButtonBack)`
    left: auto;
    right: 15px;
`;

export const ButtonImageViewer = styled(ButtonLike)`
    z-index: 10;
`;

export const AreaImage = styled.TouchableOpacity`
    position: relative;
    height: ${height / 2 + 'px'};
    background-color: #FFFFFF;
    padding-top: 15px;
    overflow: hidden;
`;

export const Brand = styled.Text`
    position: absolute;
    bottom: 5px;
    right: 15px;
    color: ${(props) => props.theme.colors.gray};
    font-size: 24px;
    font-weight: 600;
`;

export const AreaDetails = styled.View`
    padding: 8px;
`;

export const Name = styled.Text`
    color: ${(props) => props.theme.colors.primary};
    font-size: 24px;
    font-weight: 600;
    margin: 10px 0px;
`;

export const LineRowBetween = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;

export const LabelUpdate = styled.Text`
    color: ${(props) => props.theme.colors.gray};
    margin-bottom: 10px;
`;

export const HeaderPrices = styled.View`
    background-color: ${(props)=> props.theme.colors.bgTabBar};
    border-radius: 8px;
    padding: 20px 5px;
    margin: 5px 0px;
`;

export const ContainerButtonPrice = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.button};
    border-radius: 8px;
    margin: 10px 0px;
    padding: 15px;
`;

export const LabelListPrice = styled.Text`
    color: ${(props) => props.theme.colors.primary};
    font-size: 18px;
`;

export const LabelButtonPrice = styled.Text`
    color: ${(props) => props.theme.colors.light};
    font-weight: bold;
`;