import { render, screen, waitFor } from '@testing-library/react';
import * as useSearch from 'src/core/hooks/use-search';
import MerchantMemberListDialog from 'src/shared/demo-management/merchant-member-list-dialog';

const useSearchSpy = jest.spyOn(useSearch, 'default');

const exampleData = {
  data: [
    {
      id: 1,
      username: 'username1',
      firstName: 'firstname1',
      lastName: 'lastname1',
    },
    {
      id: 2,
      username: 'username2',
      firstName: 'firstname2',
      lastName: 'lastname2',
    },
    {
      id: 3,
      username: 'username3',
      firstName: 'firstname3',
      lastName: 'lastname3',
    },
    {
      id: 4,
      username: 'username4',
      firstName: 'firstname4',
      lastName: 'lastname4',
    },
    {
      id: 5,
      username: 'username5',
      firstName: 'firstname5',
      lastName: 'lastname5',
    },
  ],
  headers: {
    get: () => 10,
  },
};

describe('Merchant form dialog', () => {
  it('Should render merchant member list dialog component', () => {
    useSearchSpy.mockReturnValue({
      handleLimitChange: jest.fn(),
      handlePageChange: jest.fn(),
      handleReload: jest.fn(),
      error: undefined,
      data: exampleData,
      handleAddSort: jest.fn(),
      handleDataChange: jest.fn(),
      handleRemoveSort: jest.fn(),
      handleSearch: jest.fn(),
      limit: 5,
      page: 1,
      loading: false,
    });
    render(<MerchantMemberListDialog openDialog={true} onClose={jest.fn()} merchantId={1} />);
    const element = screen.getByText('Members list');
    expect(useSearchSpy).toBeCalledTimes(1);
    expect(element).toBeInTheDocument();
  });

  it('Should show when open prop is true component', async () => {
    useSearchSpy.mockReturnValue({
      handleLimitChange: jest.fn(),
      handlePageChange: jest.fn(),
      handleReload: jest.fn(),
      error: undefined,
      data: exampleData,
      handleAddSort: jest.fn(),
      handleDataChange: jest.fn(),
      handleRemoveSort: jest.fn(),
      handleSearch: jest.fn(),
      limit: 5,
      page: 1,
      loading: false,
    });

    render(<MerchantMemberListDialog openDialog={true} onClose={jest.fn()} merchantId={1} />);
    waitFor(() => {
      const element = screen.getByRole('dialog');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('show');
    });
  });

  it('Should render Id, username, first name, last name columns', async () => {
    useSearchSpy.mockReturnValue({
      handleLimitChange: () => {},
      handlePageChange: () => {},
      handleReload: jest.fn(),
      error: undefined,
      data: exampleData,
      handleAddSort: jest.fn(),
      handleDataChange: jest.fn(),
      handleRemoveSort: jest.fn(),
      handleSearch: jest.fn(),
      limit: 5,
      page: 1,
      loading: false,
    });
    render(<MerchantMemberListDialog openDialog={true} onClose={jest.fn()} merchantId={1} />);
    const element = screen.getByTestId('merchant-member-list');
    const ths = element.getElementsByTagName('th');

    expect(ths).toHaveLength(5);
    expect(ths[0]).toHaveTextContent('Id');
    expect(ths[1]).toHaveTextContent('Username');
    expect(ths[2]).toHaveTextContent('First Name');
    expect(ths[3]).toHaveTextContent('Last Name');
    expect(ths[4]).toHaveTextContent('');
  });
});
