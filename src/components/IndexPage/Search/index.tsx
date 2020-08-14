import React from 'react';
import { styled } from 'baseui';
import { Search as IconSearch } from 'baseui/icon';
import { Input } from 'baseui/input';

const StyledSearchContainer = styled('div', {
    width: '450px',
});

interface SearchProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const Search: React.FC<SearchProps> = ({ onChange, value }) => {
    return (
        <StyledSearchContainer>
            <Input
                endEnhancer={<IconSearch size="18px" />}
                placeholder="Enter the address"
                onChange={onChange}
                value={value}
            />
        </StyledSearchContainer>
    );
}

export default Search;