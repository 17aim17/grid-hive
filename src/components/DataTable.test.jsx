import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataTable } from './DataTable';

jest.mock('./DataTable.module.css', () => ({
  table: 'table-mock-class', // Add any class you are using in your component
}));

describe('DataTable Component', () => {
  const mockData = [
    { 's.no': 1, 'percentage.funded': '80%', 'amt.pledged': '$1000' },
    { 's.no': 2, 'percentage.funded': '60%', 'amt.pledged': '$800' },
  ];

  test('renders the table with correct headers', () => {
    render(<DataTable data={mockData} />);

    expect(screen.getByText('S.No.')).toBeInTheDocument();
    expect(screen.getByText('Percentage funded')).toBeInTheDocument();
    expect(screen.getByText('Amount pledged')).toBeInTheDocument();
  });

  test('renders rows with the correct data', () => {
    render(<DataTable data={mockData} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
    expect(screen.getByText('$1000')).toBeInTheDocument();

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('$800')).toBeInTheDocument();
  });
});
