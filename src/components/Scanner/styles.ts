import styled from 'styled-components/native';

export const ContainerScanner = styled.View`
    flex: 0.5;
    background-color: #FFFFFF;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-top: auto;
    padding: 10px;
`;

export const BarCodeBox = styled.View`
    flex: 0.75;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin: auto 0px;
    overflow: hidden;
`;

export const BarCodeLabel = styled.View`
    height: 40%;
    width: 80%;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 2px solid ${(props) => props.theme.colors.button};
    border-radius: 25px;
    overflow: hidden;
    position: relative;
    z-index: 5;
`;

export const Message = styled.Text`
    color: #000000;
    font-size: 24px;
    margin: auto 0px;
`;