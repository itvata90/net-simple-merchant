import { render, screen } from '@testing-library/react';
import FormSelect from 'src/core/components/form-select/form-select';

describe('Bootstrap FormSelect', () => {
  it('Should render form select', () => {
    render(
      <FormSelect
        style={{ maxWidth: 350 }}
        data-testid="form-select-test"
        defaultValue="1"
      >
        <FormSelect.Option value="1">One</FormSelect.Option>
        <FormSelect.Option value="2">Two</FormSelect.Option>
        <FormSelect.Option value="3">Three</FormSelect.Option>
      </FormSelect>
    );
    const inputEl = screen.getByTestId('form-select-test');
    expect(inputEl).toBeInTheDocument();
  });
  // it('Should render disabled form select', () => {
  //   render(
  //     <FormSelect
  //       style={{ maxWidth: 350 }}
  //       data-testid="form-select-test-disabled"
  //       defaultValue="1"
  //       disabled
  //     >
  //       <FormSelect.Option value="1">One</FormSelect.Option>
  //       <FormSelect.Option value="2">Two</FormSelect.Option>
  //       <FormSelect.Option value="3">Three</FormSelect.Option>
  //     </FormSelect>
  //   );
  //   const inputEl = screen.getByTestId('form-select-test-disabled');
  //   expect(inputEl).toHaveAttribute('disabled');
  // });
  // it('Should render small form select', () => {
  //   render(
  //     <FormSelect
  //       style={{ maxWidth: 350 }}
  //       data-testid="form-select-test-small"
  //       defaultValue="1"
  //       size="sm"
  //     >
  //       <FormSelect.Option value="1">One</FormSelect.Option>
  //       <FormSelect.Option value="2">Two</FormSelect.Option>
  //       <FormSelect.Option value="3">Three</FormSelect.Option>
  //     </FormSelect>
  //   );
  //   const inputEl = screen.getByTestId('form-select-test-small');
  //   expect(inputEl).toHaveClass('form-select-sm');
  // });
});
