import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MerchantManagement from 'src/shared/demo-management/merchant-management';
import * as useSearch from 'src/core/hooks/use-search';
const useSearchSpy = jest.spyOn(useSearch, 'default');

const exampleData = {
  data: [
    {
      id: 1,
      ownerId: 1,
      name: 'name1',
      province: 'province1',
      district: 'district1',
      street: 'street1',
      email: 'email1@1.com',
      phone: '1',
      status: '1',
    },
    {
      id: 2,
      ownerId: 2,
      name: 'name2',
      province: 'province2',
      district: 'district2',
      street: 'street2',
      email: 'email2@2.com',
      phone: '2',
      status: '2',
    },
    {
      id: 3,
      ownerId: 3,
      name: 'name3',
      province: 'province3',
      district: 'district3',
      street: 'street3',
      email: 'email3@3.com',
      phone: '3',
      status: '3',
    },
    {
      id: 4,
      ownerId: 4,
      name: 'name4',
      province: 'province4',
      district: 'district4',
      street: 'street4',
      email: 'email4@4.com',
      phone: '4',
      status: '4',
    },
    {
      id: 5,
      ownerId: 5,
      name: 'name5',
      province: 'province5',
      district: 'district5',
      street: 'street5',
      email: 'email5@5.com',
      phone: '5',
      status: '5',
    },
  ],
  headers: {
    get: () => 10,
  },
};

jest.mock('src/core/hooks/use-fetch', () => ({
  __esModule: true,
  default: () => ({
    data: exampleData.data[0],
    error: undefined,
  }),
}));

describe('Demo merchant management', () => {
  it('Should render merchant management component', () => {
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
    render(<MerchantManagement data-testid="merchant-management" />);
    const element = screen.getByTestId('merchant-management');
    expect(useSearchSpy).toBeCalledTimes(1);
    expect(element).toBeInTheDocument();
  });

  it('Should open merchant detail dialog when clicking add button', async () => {
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
    render(<MerchantManagement data-testid="merchant-management-test" />);
    const addButton = screen.getByRole('add-button');

    await waitFor(async () => {
      await userEvent.click(addButton);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  it('Should open merchant detail dialog when clicking edit button', async () => {
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
    render(<MerchantManagement data-testid="merchant-management-test" />);
    const editButton = screen.getAllByRole('edit-button')[0];

    await waitFor(async () => {
      await userEvent.click(editButton);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  // it('Should open member list dialog when clicking member button', async () => {
  //   useSearchSpy.mockReturnValue({
  //     handleLimitChange: () => {},
  //     handlePageChange: () => {},
  //     handleReload: jest.fn(),
  //     error: undefined,
  //     data: exampleData,
  //     handleAddSort: jest.fn(),
  //     handleDataChange: jest.fn(),
  //     handleRemoveSort: jest.fn(),
  //     handleSearch: jest.fn(),
  //     limit: 5,
  //     page: 1,
  //     loading: false,
  //   });
  //   render(<MerchantManagement />);
  //   const memberButton = screen.getAllByRole('open-member-button')[0];

  //   await waitFor(async () => {
  //     await userEvent.click(memberButton);
  //     const dialog = screen.getByRole('dialog');
  //     expect(dialog).toBeInTheDocument();
  //   });
  // });

  it('Should render Id, Name, Status columns', async () => {
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
    render(<MerchantManagement data-testid="merchant-management-test" />);
    const element = screen.getByTestId('merchant-management-test');
    const ths = element.getElementsByTagName('th');

    expect(ths).toHaveLength(4);
    expect(ths[0]).toHaveTextContent('Id');
    expect(ths[1]).toHaveTextContent('Name');
    expect(ths[2]).toHaveTextContent('Status');
    expect(ths[3]).toHaveTextContent('');
  });

  it('Should render error message when loading error', () => {
    useSearchSpy.mockReturnValue({
      handleLimitChange: () => {},
      handlePageChange: () => {},
      handleReload: jest.fn(),
      error: 'something error',
      data: undefined,
      handleAddSort: jest.fn(),
      handleDataChange: jest.fn(),
      handleRemoveSort: jest.fn(),
      handleSearch: jest.fn(),
      limit: 5,
      page: 1,
      loading: false,
    });

    render(<MerchantManagement />);
    const element = screen.getByText('something error');
    expect(element).toBeInTheDocument();
  });
});
