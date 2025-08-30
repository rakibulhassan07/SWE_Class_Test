import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Tasks = () => {
    const LoadTask=useLoaderData();
    console.log(LoadTask);
    return (
        <div>
            <h2 className='text-3xl font-bold mb-4 mt-9 '>My Tasks {LoadTask.length}</h2>
            <p>Here you can see all your tasks</p>
            <ul>
                {LoadTask.map(task => (
                    <li key={task.id} className='border mt-2 rounded-2xl py-2'>
                        <h3 className='text-xl font-bold'>{task.title}</h3>
                        <p>{task.description}</p>
                        <p className='text-sm text-gray-500'>Status: {task.status}</p>
                        <p className='text-sm text-gray-500'>Tags: {task.tags}</p>
                        <p className='text-sm text-gray-500'>Created at: {task.timestamp}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;