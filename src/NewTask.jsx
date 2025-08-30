import React from 'react';
import { Link } from 'react-router-dom';

const NewTask = () => {
   
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const status = form.status.value;
        const tags=form.tags.value;
        const timestamp = new Date().toISOString();

        const task = { title, description, status,tags, timestamp };
           fetch("http://localhost:5000/task",{
            method :'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(task)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged){
                alert('Story added successfully')
            }
        })
        .catch(er=>console.error(er))
    };

    return (
         <div>
            <h2 className='text-3xl font-bold mb-4 mt-9 '>New Task</h2>
            <p>Assign A new Task</p>
            <form onSubmit={ handleSubmit}>
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
            <Link to="/mystask"><button className='btn text-amber-50 bg-sky-500 mt-4'>My Task</button></Link>

        </div>
    );
};

export default NewTask;