import { DataTable } from './data-table';
import { columns } from './columns';
import { getUsers } from '@/apis/user.api';
export default function DemoPage() {
    const data = getUsers();
    return (
        <div className="container mx-auto py-10">
            
            <div> 
                { data && <DataTable columns={columns} data={data}/>}
            </div>
        </div>
    );
}
