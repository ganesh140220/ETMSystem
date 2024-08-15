import React, { useState, useEffect } from 'react';

export default function ViewClient() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetch('https://localhost:7018/ETMS/clients')
            .then(response => response.json())
            .then(data => setClients(data));
    }, []);

    return (
        <div style={{ marginTop: '100px', textAlign: 'center' }}>
            <h2>Client List</h2><br></br>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Email ID</th>
                        <th>Project</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.length > 0 ? (
                        clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.contactNo}</td>
                                <td>{client.emailId}</td>
                                <td>{client.projects}</td>
                              
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No clients available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}