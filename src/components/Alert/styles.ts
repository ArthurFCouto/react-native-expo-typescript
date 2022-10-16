import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

export const ContainerAlert = styled.View`
    flex: 1;
`;

export const Details = styled.View<{ borderColor: string, bgColor: string }>`
    flex-direction: row;
    background-color: ${(props) => props.bgColor};
    border: 3px solid ${(props) => props.borderColor};
    border-radius: 10px;
    margin: auto 10px 60px 10px;
    padding: 8px;
    overflow: hidden;
`;

export const Message = styled.Text<{ color: string }>`
    width: ${width - 75 + 'px'};
    color: ${(props) => props.color};
    font-size: 18px;
    font-weight: 600;
    padding: 10px 0px;
`;