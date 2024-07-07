import React, { useContext, useEffect, useState } from 'react';
import { UilAngleLeft, UilAngleRight } from '@iconscout/react-unicons'
import Button from '../../component/button';
import { AuthContext } from '../../app/auth';
import Text from '../../component/inputs/text';
import Add from './add';
import Card from '../../component/card';
import Toast from '../../component/toast'
import axios from 'axios'
import Swal from 'sweetalert2'

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null)
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const authContext = useContext(AuthContext)

    useEffect(() => {
        fetchTasks()
    }, [search, page])

    const fetchTasks = async () => {
        try {
            let res = await axios.get(`/api/tasks?q=${search}&page=${page}`)
            setTasks(res.data.tasks)
            setTotalPage(res.data.pages - 1)
        } catch(err) {}
    }

    const deleteTask = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            html: '<h5>Task will be deleted?</h5>',
            showCancelButton: true,
            confirmButtonText: `Delete`,
            confirmButtonColor: '#D14343',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/api/tasks/${id}`)
                    fetchTasks()
                } catch(err) {
                    Toast.fire({ icon: 'error', title: err.response?.data?.error || `Failed to delete task.` })
                }
            }
        })
    }

    return (
        <div>
            <h1 className='page-title'>TODO List</h1>
            <div style={{ marginLeft: 20, marginTop: 20, marginRight: 20, display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                    <Text
                        label="Search by title..."
                        variant={`${authContext.dark?"dark":""}`}
                        value={search}
                        onChange={setSearch}
                        style={{ marginTop: 30 }}
                    />
                    {search !== "" && <Button 
                        variant={`${authContext.dark?"dark":""}`}
                        text={"X"}
                        onClick={() => setSearch("")}
                        style={{ marginTop: 15, marginLeft: 15 }}
                    />}
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <Button 
                        variant="primary"
                        text="Add New Task"
                        onClick={() => setIsModalOpen(true)}
                        style={{ marginTop: 15 }}
                    />
                </div>
            </div>
            <div style={{ padding: 20 }}>
                {tasks?.map((task, _i) => (
                    <Card 
                        key={_i}
                        style={{ marginBottom: 10 }}
                        variant={`${authContext.dark?"dark":""}`}
                        title={task.title}
                        description={task.description}
                        onEdit={() => {
                            setSelectedTask(task)
                            setIsModalOpen(true)
                        }}
                        onDelete={() => deleteTask(task._id)}
                    />
                ))}
            </div>
            {tasks?.length > 0 && <div className='pagination'>
                <div className={`prev ${page === 0 && "disable"}`} onClick={() => {
                    if(page !== 0) setPage(page - 1)
                }}>
                    <UilAngleLeft />
                </div>
                <div className='disable'>
                    Page {page+1} of {totalPage+1}
                </div>
                <div className={`next ${page === totalPage && "disable"}`} onClick={() => {
                    if(page < totalPage) setPage(page + 1)
                }}>
                    <UilAngleRight />
                </div>
            </div>}
            <Add 
                dark={authContext.dark?"dark":""}
                isModalOpen={isModalOpen}
                selected={selectedTask}
                onSave={() => {
                    fetchTasks()
                }}
                onClose={() => {
                    setIsModalOpen(false)
                    setSelectedTask(null)
                }}
            />
        </div>
    );
}

export default Dashboard;