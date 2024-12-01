import { renderHook, act } from '@testing-library/react-hooks';
import useFetchData from './useFetchData';
import { FETCH_DATA_API } from '../constants';

const mockFetchData = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

global.fetch = jest.fn();

describe('useFetchData Hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch data automatically when autoFetch is true', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFetchData,
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchData(true));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockFetchData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(FETCH_DATA_API);
  });

  test('should not fetch data automatically when autoFetch is false', () => {
    const { result } = renderHook(() => useFetchData(false));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('should fetch data manually using fetchData function', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFetchData,
    });

    const { result, waitForNextUpdate } = renderHook(() => useFetchData(false));

    act(() => {
      result.current.fetchData();
    });

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual(mockFetchData);
  });

  test('should handle fetch errors correctly', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result, waitForNextUpdate } = renderHook(() => useFetchData(true));

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Network error');
    expect(result.current.data).toEqual([]);
  });
});
