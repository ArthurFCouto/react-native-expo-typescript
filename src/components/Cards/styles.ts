import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const width = Dimensions.get('screen').width;

export const ContainerCardSearch = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 8px;
`;

export const CardSearchDetails = styled.View`
    justify-content: space-between;
    padding-left: 8px;
    overflow: hidden;
`;

export const CardSearchName = styled.Text`
    width: ${width - 140 + 'px'};
    font-size: 18px;
    font-weight: 600;
`;

export const CardSearchBrand = styled.Text`
    margin-top: 5px;
`;

export const CardSearchCode = styled.Text`
    color: ${(props) => props.theme.colors.gray};
    text-align: right;
`;

export const ContainerCardPrices = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: stretch;
    position: relative;
    background-color: ${(props) => props.theme.colors.bgTabBar};
    border-radius: 8px;
    margin: 5px 0px;
    padding: 15px 0px;
`;

export const CardPriceColumnLeft = styled.View`
    align-items: center;
    justify-content: center;
    width: 15%;
`;

export const CardPriceColumnCenter = styled.View`
    width: 60%;
    justify-content: space-between;
    padding: 0px 10px;
`;

export const CardPriceLabelNameMarket = styled.Text`
    color: ${(props) => props.theme.colors.primary};
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
`;

export const CardPriceLabelUpdate = styled(CardPriceLabelNameMarket)`
    font-size: 16px;
    margin-bottom: 0px;
`;

export const CardPriceColumnRight = styled.View`
    width: 25%;
    justify-content: center;
    padding: 0px 10px;
`;

export const CardPriceLabelPrice = styled(CardPriceLabelNameMarket)`
    font-size: 22px;
    font-weight: bold;
    text-align: right;
`;