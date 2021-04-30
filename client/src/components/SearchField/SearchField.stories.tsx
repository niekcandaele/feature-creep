import { FC, useState, useEffect, useRef } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { SearchField, SearchFieldProps, Spinner } from 'components';
import { useForm, useWatch, Control } from 'react-hook-form';
import styled from 'styled';
import { useDebounce } from 'hooks';

export default {
  title: 'Components/Form/SearchField',
  component: SearchField
} as Meta;

const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchFieldComponent: Story<SearchFieldProps> = (args) => {
  const { control } = useForm<{ searchTerm: string }>();
  const name = 'search';

  return (
    <Container>
      <SearchField
        {...args}
        control={control}
        name={name}
        placeholder="Search pokemon eg. charmander"
      />
      <SearchResult control={control} name={name} />
    </Container>
  );
};

/* Notice both the useWatch and the useDebounce hook */
const SearchResult: FC<{ control: Control<any>, name: string }> = ({ control, name }) => {
  interface Pokemon {
    name: string;
    img: string;
    weight: number;
    error: string;
  }

  const searchTerm = useWatch({ control, name: name, });
  const [result, setResult] = useState<Partial<Pokemon>>({ error: '' });
  const loaded = useRef(false);
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  async function getJoke() {
    if (!searchTerm) {
      setResult({ error: '' });
      return;
    }
    setLoading(true);

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
    if (response.ok) {
      const json = await response.json();
      setResult({ name: json.name, weight: json.weight, img: json.sprites.front_default });
    }
    else {
      setResult({ error: 'Pokemon not found' });
    }
    setLoading(false);
  }

  useEffect(() => {
    // dont run on first render
    if (!loaded.current) {
      loaded.current = true;
      return;
    }
    getJoke();
  }, [debouncedSearchTerm]);

  if (loading) {
    return <div><Spinner /></div>;
  }
  if (result === '') {
    return <div></div>;
  }

  return (
    <div>{
      result.error
        ?
        result.error
        :
        (<div>
          <p>{result.name}</p>
          <img alt={result.name} src={result.img} />
        </div>
        )
    }</div>
  );
};
