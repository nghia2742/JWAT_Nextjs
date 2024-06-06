import { deleteUser } from '@/apis/user.api';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import useRefetchUser from '@/hooks/useRefetchUser';

export function DeleteUserModal({ username }: Readonly<{ username: string }>) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const { refetch } = useRefetchUser();

    const handleSubmit = () => {
        setOpen(!open);
        deleteUser(username)
            .then((response) => {
                refetch();
                toast({
                    variant: 'success',
                    description: '✅ Delete successfully',
                });
            })
            .catch((err) => {
                toast({
                    variant: 'destructive',
                    description: '❌ ' + err.response.data.message,
                });
            });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete user</DialogTitle>
                    <DialogDescription>
                        This action will delete a user from database.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-2">
                    <span className="font-bold">Username:</span>{' '}
                    <span className="font-bold text-destructive ">
                        `{username}`
                    </span>
                </div>
                <DialogFooter>
                    <Button variant={'destructive'} onClick={handleSubmit}>
                        Accept
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
