import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemberManagement from 'src/shared/demo-management/member-management';
import * as useSearch from 'src/core/hooks/use-search';

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

jest.mock('src/core/hooks/use-fetch', () => ({
  __esModule: true,
  default: () => ({
    data: exampleData.data[0],
    error: undefined,
  }),
}));

describe('Demo member management', () => {
  it('Should render member management component', () => {
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
    render(<MemberManagement data-testid="member-management" />);
    const element = screen.getByTestId('member-management');
    expect(useSearchSpy).toBeCalledTimes(1);
    expect(element).toBeInTheDocument();
  });

  it('Should open member detail dialog when clicking add button', async () => {
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
    render(<MemberManagement data-testid="member-management-test" />);
    const addButton = screen.getByRole('add-button');

    await waitFor(async () => {
      await userEvent.click(addButton);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  it('Should open member detail dialog when clicking edit button', async () => {
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
    render(<MemberManagement data-testid="member-management-test" />);
    const editButton = screen.getAllByRole('edit-button')[0];

    await waitFor(async () => {
      await userEvent.click(editButton);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
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
    render(<MemberManagement data-testid="member-management-test" />);
    const element = screen.getByTestId('member-management-test');
    const ths = element.getElementsByTagName('th');

    expect(ths).toHaveLength(5);
    expect(ths[0]).toHaveTextContent('Id');
    expect(ths[1]).toHaveTextContent('Username');
    expect(ths[2]).toHaveTextContent('First Name');
    expect(ths[3]).toHaveTextContent('Last Name');
    expect(ths[4]).toHaveTextContent('');
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

    render(<MemberManagement />);
    const element = screen.getByText('something error');
    expect(element).toBeInTheDocument();
  });

  // it('Should call handleReload after adding form submitted successfully', async () => {
  //   render(<MemberManagement />);

  // });
  // it('Should call handleDataChange after adding form submitted successfully', async () => {
  //   render(<MemberManagement />);

  // });
});
