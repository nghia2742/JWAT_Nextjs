import CreateUserForm from '@/components/CreateUserForm';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div>
                <h1 className='text-2xl mb-5'>Hello there 👋</h1>
                <Link href={'users'} className='inline-flex gap-2 text-sky-300 border border-sky-300 p-4 rounded-sm'>
                    <LinkIcon/> Go to Users
                </Link>
            </div>
        </div>
    );
}
