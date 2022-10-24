import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const width = Dimensions.get('screen').width;

export const ContainerCardSearch = styled.TouchableOpacity`
    flex-direction: row;
    background-color: #FFFFFF;
    border-radius: 8px;
    margin: 0px 5px;
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
    text-align: left;
`;

export const CardSearchFavorite = styled.TouchableOpacity`
    position: absolute;
    bottom: 8px;
    right: 8px;
`;

export const ContainerCardPrices = styled.TouchableOpacity`
    flex-direction: row;
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
    justify-content: space-between;
    padding: 0px 10px;
    width: 55%;
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
    width: 30%;
    justify-content: center;
    padding: 0px 10px;
`;

export const CardPriceLabelPrice = styled.Text<{ index: number }>`
    color: ${(props) => props.theme.colors.primary};
    font-size: ${(props) => props.index === 0 ? '20px' : '18px'};
    font-weight: bold;
    text-align: right;
`;