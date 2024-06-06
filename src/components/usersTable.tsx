import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/apis/user.api';

function UsersTable() {
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(),
    });

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Full name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            <p>Loading ...</p>
                        </TableCell>
                    </TableRow>
                )}
                {isError && (
                    <TableRow className="text-center">
                        <TableCell colSpan={6}>No data</TableCell>
                    </TableRow>
                )}
                {data?.data.map((user, index) => (
                    <TableRow key={user.username}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.fullname}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.project.join(', ')}</TableCell>
                        <TableCell className="flex gap-2">
                            <Button variant={'outline'}>Edit</Button>
                            <Button variant={'destructive'}>Delete</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default UsersTable;
