import { useNavigation } from '@react-navigation/native';
import InputCustom from '../../../components/InputCustom';
import { ContainerHeaderSearch, DetailsSearch, LabelSearch, LabelSearchName, TitleSearch } from './styles';

interface HeaderSearchProps {
    nameSearch: string,
    setNameSearch: (text: string) => void
}

export default function HeaderSearch(props: HeaderSearchProps) {
    const navigator = useNavigation();
    const { nameSearch, setNameSearch } = props;

    return (
        <ContainerHeaderSearch>
            <TitleSearch onPress={() => navigator.goBack()}>
                Quanto Tá?
            </TitleSearch>
            <InputCustom
                placeholder='Digite um nome'
                submit={(text) => setNameSearch(text)}
            />
            {
                nameSearch && (
                    <DetailsSearch>
                        <LabelSearch>Pesquisando por </LabelSearch>
                        <LabelSearchName>{nameSearch}</LabelSearchName>
                    </DetailsSearch>
                )
            }
        </ContainerHeaderSearch>
    )
}