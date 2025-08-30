import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UpdateTask = () => {
     const location = useLocation();
    const navigate = useNavigate();
    const loadTask = location.state?.task;
    console.log(loadTask);
    function handleUpdateTask(e) {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const status = form.status.value;
        const tags = form.tags.value;
        const updatedTask = { title, description, status, tags };

        fetch(`http://localhost:5000/task/${loadTask._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged || data.modifiedCount > 0) {
                    alert('Task updated successfully');
                    navigate('/'); // Navigate back to My Tasks after successful update
                } else {
                    alert('No changes were made to the task');
                }
            })
            .catch(er => {
                console.error(er);
                alert('Error updating story. Please try again.');
            });
        }
    return (
         <div>
            <h2 className='text-3xl font-bold mb-4 mt-9 '>Update Task</h2>
            <p>Update Your Task</p>
            <form onSubmit={handleUpdateTask}>
                <h2 className='text-xl font-bold'>Title</h2>
                <input required name='title' className='w-80 border-2 rounded-field p-2' type="text" placeholder='Enter Title' />
                 <h2 className='text-xl font-bold'> Description</h2>
                <textarea required name='description' className='w-80 border-2 rounded-field p-2' placeholder='Enter Description'></textarea>
                 <h2 className='text-xl font-bold'>status</h2>
                <input required  name='status' className='w-80 border-2 rounded-field p-2' type="text" placeholder='Enter status' />
                <h2 className='text-xl font-bold'>Tags</h2>
                <input required  name='tags' className='w-80 border-2 rounded-field p-2' type="text" placeholder='Enter tags' />
                <br />
                <input className='btn text-amber-50 bg-sky-500' type="submit" value='Save' />
                
            </form>
            <Link to="/"><button className='btn text-amber-50 bg-sky-500 mt-4'>cencle</button></Link>

        </div>
    );
};

export default UpdateTask;