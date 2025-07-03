import React from 'react';
import { useAuth } from '../UseAuth/UseAuth';
import UseAxiosSecure from '../UseAxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const USeRole = () => {
    const { user, loading: authLoading } = useAuth()
    const useSecure = UseAxiosSecure()
    const { data: role = "user" , isLoading: roleLoading, refetch} = useQuery({
        queryKey: ["userRole", user?.email],
        queryFn: async () => {
          const data = await useSecure.get(`/users/search/${user?.email}`)
          return data.data.role
        }
    })
    return {role, roleLoading: authLoading || roleLoading, refetch}
};

export default USeRole;