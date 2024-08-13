import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const TaskProgress = () => {
    const [progressData, setProgressData] = useState([]);
    const location = useLocation();
    const proj = useSelector(state => state.myobj.projobj);
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('id');

    useEffect(() => {
        // Find the task by taskId
        const task = proj.tasks.find(task => task.id === parseInt(taskId));
        if (task) {
            setProgressData(task.taskProgresses);
        }
    }, [taskId, proj.tasks]);

    return (
        <div style={{marginTop:"70px"}}>
            <h2>Task Progress</h2>
            {progressData.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Update Date</th>
                            <th>Description</th>
                            <th>Work Done (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {progressData.map(progress => (
                            <tr key={progress.id}>
                                <td>{progress.updateDate}</td>
                                <td>{progress.description}</td>
                                <td>{progress.workDonePercent}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No progress updates available for this task.</p>
            )}
        </div>
    );
};

export default TaskProgress;
