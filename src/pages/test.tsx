import React from 'react';
import { useQuery } from '@tanstack/react-query';

function TestPage() {
    const { data } = useQuery({
        queryKey: ['count'],
        queryFn: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const data = await res.json();
            return data;
        }
    })
    
    return <div>😎 Data: {JSON.stringify(data)}</div>;
}

export default TestPage;
