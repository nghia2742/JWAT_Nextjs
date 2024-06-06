import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { getUserByUsername, patchUser } from '@/apis/user.api';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import useRefetchUser from '@/hooks/useRefetchUser';

const formSchema = z.object({
    username: z.string().min(1, { message: 'Username is required' }),
    fullname: z.string().min(1, { message: 'Full name is required' }),
    role: z.string().min(1, { message: 'Role is required' }),
    project: z
        .array(z.string().min(1, { message: 'Project name is required' }))
        .min(1, { message: 'At least one project is required' }),
});
export default function UpdateUserForm({
    username,
}: Readonly<{ username: string }>) {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<z.infer<typeof formSchema> | null>(null);
    const { toast } = useToast();
    const { refetch } = useRefetchUser();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            fullname: '',
            role: '',
            project: [],
        },
    });
    const { control, register, handleSubmit, formState, reset } = form;

    useEffect(() => {
        if (user) {
            reset(user);
        }
    }, [user, reset]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'project' as never,
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setOpen((prev) => !prev);
        patchUser(username, values)
            .then((response) => {
                refetch();
                toast({
                    variant: 'success',
                    description: '✅ Update successfully',
                });
            })
            .catch((err) => {
                toast({
                    variant: 'destructive',
                    description: '❌ ' + err.response.data.message,
                });
            });
    }

    function handleGetUserByUsername(username: string) {
        getUserByUsername(username)
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err));
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={'outline'}
                    onClick={() => handleGetUserByUsername(username)}
                >
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add new user</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="tony123"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="fullname"
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Tony Stark"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Manager">
                                                Manager
                                            </SelectItem>
                                            <SelectItem value="Developer">
                                                Developer
                                            </SelectItem>
                                            <SelectItem value="Staff">
                                                Staff
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <FormLabel>Projects</FormLabel>
                                <Button
                                    type="button"
                                    onClick={() => append('')}
                                >
                                    Add
                                </Button>
                            </div>

                            {fields.map((field, index) => (
                                <div key={field.id}>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FormControl>
                                            <Input
                                                placeholder="Project name"
                                                {...register(
                                                    `project.${index}` as const
                                                )}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            onClick={() => remove(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                    {formState.errors.project?.[index] && (
                                        <FormMessage>
                                            {
                                                formState.errors.project[index]
                                                    ?.message
                                            }
                                        </FormMessage>
                                    )}
                                </div>
                            ))}

                            {formState.errors.project && (
                                <FormMessage>
                                    {formState.errors.project.message}
                                </FormMessage>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="submit">Submit</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
