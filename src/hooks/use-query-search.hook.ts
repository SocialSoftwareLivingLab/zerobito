export interface UseQuerySearch {
    queryName: string;
    defaultValue: string;
}

export default function useQuerySearch({ queryName, defaultValue }: UseQuerySearch) {
    const query = new URLSearchParams(window.location.search);
    return query.get(queryName) ?? defaultValue;
}
