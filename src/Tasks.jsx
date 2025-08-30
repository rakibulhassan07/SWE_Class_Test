import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

const Tasks = () => {
    const LoadTask=useLoaderData();
    console.log(LoadTask);
      const [Task, setTask] = useState(LoadTask);

    const handleDelete = (_id) => {
        fetch(`http://localhost:5000/task/${_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if (data.deletedCount > 0) {
                alert('Task deleted successfully');
                const remaining = Task.filter(task => task._id !== _id);
                setTask(remaining);
            }
        })
        .catch(err => console.error(err));
    };

    return (
        <div>
            <h2 className='text-3xl font-bold mb-4 mt-9 '>My Tasks {LoadTask.length}</h2>
            <p>Here you can see all your tasks</p>
            <ul>
                {Task.map(task => (
                    <li key={task.id} className='border mt-2 rounded-2xl py-2'>
                        <h3 className='text-xl font-bold'>{task.title}</h3>
                        <p>{task.description}</p>
                        <p className='text-sm text-gray-500'>Status: {task.status}</p>
                        <p className='text-sm text-gray-500'>Tags: {task.tags}</p>
                        <p className='text-sm text-gray-500'>Created at: {task.timestamp}</p>
                          <button className='btn text-red-500' onClick={() => handleDelete(task._id)}>Delete</button>
                          <Link to={`/updatemytasks/${task._id}`} state={{ task }}><button className='btn text-amber-50 bg-sky-500 ml-4'>Update Task</button></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;