import { getUsers } from '@/apis/user.api';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Loader } from 'lucide-react';

function UserPage() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(),
    });

    if(isLoading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <Loader className='animate-spin h-10 w-10'/>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                😢 Sorry, cannot get users from server.
            </div>
        );
    }

    return (
        <div className="p-10 lg:p-20">
            <div className="mt-4">
                {data && <DataTable columns={columns} data={data.data} />}
            </div>
        </div>
    );
}

export default UserPage;
