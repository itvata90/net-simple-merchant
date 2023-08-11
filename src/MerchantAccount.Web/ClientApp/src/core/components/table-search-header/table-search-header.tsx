import classNames from 'classnames';
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Button from 'src/core/components/button/button';
import Card from 'src/core/components/card/card';
import Form from 'src/core/components/form/form';
import InputGroup from 'src/core/components/input-group/input-group';

export interface TableSearchHeaderProps {
  fields?: Array<string>;
  onSearch?: (field: string, keyword: string) => void;
  searchOnChange?: boolean;
}
const TableSearchHeader = ({
  fields = [],
  onSearch,
  searchOnChange = false,
}: TableSearchHeaderProps) => {
  const [searchField, setSearchField] = useState(fields[0]);
  const [keyword, setKeyword] = useState('');

  const handleChangeTextSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchValue = event.target.value;
    setKeyword(searchValue);
    searchOnChange && onSearch && onSearch(searchField, searchValue);
  };

  const handleSearchChange = (event: any) => {
    setSearchField(event.target.value);
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    onSearch && onSearch(searchField, keyword);
  };

  return (
    <Card.Header className="d-flex justify-content-end">
      <Form onSubmit={handleSearch}>
        <InputGroup
          aria-label="search-bar"
          size="sm"
          style={{ maxWidth: '400px' }}
          className="justify-content-end"
        >
          <InputGroup.Text>Column:</InputGroup.Text>
          <Form.Select.Native onChange={handleSearchChange} size="sm">
            {fields.map((field: any) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </Form.Select.Native>
          <Form.Control
            value={keyword}
            onChange={handleChangeTextSearch}
            size="sm"
          />
          <InputGroup.Text>
            <Button
              type="submit"
              className={classNames('d-flex align-items-center p-0 border-0')}
            >
              <BsSearch />
            </Button>
          </InputGroup.Text>
        </InputGroup>
      </Form>
    </Card.Header>
  );
};

export default TableSearchHeader;
