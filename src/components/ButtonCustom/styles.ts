import styled from 'styled-components/native';

export const TouchableButton = styled.TouchableOpacity<{ isSpace?: boolean }>`
    flex-direction: row;
    align-items: center;
    justify-content: ${(props) => props.isSpace ? 'space-between' : 'center'};
    background-color: ${(props) => props.theme.colors.button};
    border-radius: 8px;
    padding: 10px 15px;
`;

export const LabelButton = styled.Text<{ isSpace?: boolean }>`
    color: ${(props) => props.theme.colors.light};
    font-size: 18px;
    margin-right:  ${(props) => props.isSpace ? '15px' : '0px'};
`;