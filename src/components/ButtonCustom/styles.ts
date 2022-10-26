import styled from 'styled-components/native';

export const TouchableButton = styled.TouchableOpacity<{ isSpace?: boolean, transparent?: boolean}>`
    flex-direction: row;
    align-items: center;
    justify-content: ${(props) => props.isSpace ? 'space-between' : 'center'};
    background-color: ${(props) => props.transparent ? 'transparent' : props.theme.colors.button};
    border-radius: 8px;
    padding: 10px 15px;
`;

export const LabelButton = styled.Text<{ isSpace?: boolean, transparent?: boolean }>`
    color: ${(props) => props.transparent ? props.theme.colors.primary : props.theme.colors.light};
    font-size: 18px;
    margin-right:  ${(props) => props.isSpace ? '15px' : '0px'};
`;