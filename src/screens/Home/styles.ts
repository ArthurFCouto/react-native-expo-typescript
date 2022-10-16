import styled from 'styled-components/native';

export const Title = styled.Text`
    color: ${(props) => props.theme.colors.primary};
    font-size: 36px;
    font-weight: bold;
    margin: 5px;
`;

export const SubTitle = styled(Title)`
    font-size: 24px;
    font-weight: 400;
    text-align: center;
`;

export const ViewInput = styled.View`
    width: 80%;
    margin-top: 30px;
    margin-bottom: 20px;
`;