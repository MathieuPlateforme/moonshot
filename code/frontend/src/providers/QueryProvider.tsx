import { createContext, useRef, ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useMutation as useMutationRest,
  useQuery as useQueryRest,
} from 'react-query';

interface QueryProviderProps {
  children: ReactNode;
}

interface QueryContextValue {
  
}

const QueryContext = createContext<QueryContextValue | undefined>(undefined);

const QueryProvider = ({ children }: QueryProviderProps) => {
  const reactQueryClient = useRef(new QueryClient());

  return (
    <QueryClientProvider client={reactQueryClient.current}>
      <QueryContext.Provider value={{}}>{children}</QueryContext.Provider>
    </QueryClientProvider>
  );
};

export const useMutation = (obj: {
  query: any;
  format?: (data: any) => any;
}, opts = {}) => {
  const { data, ...result } = useMutationRest(obj.query, opts);
  return { ...result, data: obj?.format && data ? obj.format(data) : data };
};

export const useQuery = (obj: {
  query: (variables: any) => any;
  format?: (data: any) => any;
}, { key, variables, ...opts }: { key: string; variables: any; }) => {
  const {
    data,
    error,
    isError,
    isFetching,
    isLoading,
    refetch,
    status,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useQueryRest(key, () => obj.query(variables), opts);
  return {
    isLoading,
    hasError: isError,
    error,
    data: obj?.format && data ? obj.format(data) : data,
    refetch,
    status,
    isFetching,
  };
};

export default QueryProvider;