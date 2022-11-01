import { useState } from 'react';
import { Modal, StyleProp, TouchableWithoutFeedback,
    View, ViewStyle } from 'react-native';
import { AreaOptions, ContainerOptions, ContainerSelect,
    Label, LabelOptions } from './styles';

interface OptionsProps {
    name: string;
    value: string;
}

interface SelectCustomProps {
    list: Array<OptionsProps>;
    selected: (data: OptionsProps) => void;
    label?: string;
    style?: StyleProp<ViewStyle>
}

export default function SelectCustom(props: SelectCustomProps) {
    const { label, list, selected, style } = props;
    const [defaultLabel, setDefaultLabel] = useState<string>(label || 'Selecionar opção');
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const handleOptionsAction = (props: OptionsProps) => {
        selected(props);
        setDefaultLabel(props.name);
        setShowOptions(false);
    }

    const Options = (props: OptionsProps) => (
        <TouchableWithoutFeedback onPress={() => handleOptionsAction(props)}>
            <ContainerOptions>
                <LabelOptions
                    ellipsizeMode='tail'
                    numberOfLines={1}
                >
                    {props.name}
                </LabelOptions>
            </ContainerOptions>
        </TouchableWithoutFeedback>
    )

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setShowOptions(true)}>
                <View style={style}>
                    <Label
                        ellipsizeMode='tail'
                        numberOfLines={1}
                    >
                        {defaultLabel}
                    </Label>
                </View>
            </TouchableWithoutFeedback>
            <Modal
                transparent
                visible={showOptions}
            >
                <TouchableWithoutFeedback onPress={() => setShowOptions(false)}>
                    <ContainerSelect>
                        <AreaOptions>
                            {
                                list.map(
                                    (item, index) =>
                                        <Options
                                            key={index}
                                            name={item.name}
                                            value={item.value}
                                        />
                                )
                            }
                        </AreaOptions>
                    </ContainerSelect>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    )
}