// hooks/useRefetchUser.ts
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/apis/user.api';

const useRefetchUser = () => {
  const { refetch } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });

  return { refetch };
};

export default useRefetchUser;
