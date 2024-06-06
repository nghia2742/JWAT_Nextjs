import { DeleteUserModal } from '@/components/DeleteUserModal';
import { Button } from '@/components/ui/button';
import UpdateUserForm from '@/components/UpdateUserForm';
import { User } from '@/types/user.type';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: '#',
        cell: ({ row }) => (
            <div className="flex gap-2">
                <span className="text-sm">{Number(row.id) + 1}</span>
            </div>
        ),
    },
    {
        accessorKey: 'username',
        header: 'Username',
    },
    {
        accessorKey: 'fullname',
        header: 'Full name',
    },
    {
        accessorKey: 'role',
        header: 'Role',
    },
    {
        accessorKey: 'project',
        header: 'Projects',
        cell: ({ row }) => {
            const joinComma: string = row.getValue<string[]>('project').join(', ');
            return (
                <div className="flex gap-2">
                    <span className="text-sm">{ joinComma }</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => (
            <div className="flex gap-2">
                <UpdateUserForm username={row.getValue('username')}/>
                <DeleteUserModal username={row.getValue('username')}/>
            </div>
        ),
    },
];
