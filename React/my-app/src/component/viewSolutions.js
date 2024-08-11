import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewSolution = () => {
  const { queryId } = useParams(); // Access the queryId from the URL
  const obj = useSelector(state => state.myobj.obj);

  // Find the specific query using the queryId
  const task = obj?.tasks.find(task => task.queries.some(query => query.qid === queryId));
  const query = task?.queries.find(query => query.qid === queryId);

  return (
    <div className="bg-dark text-white min-vh-100 p-4">
      <h1 style={{ marginTop: "100px" }} className="text-center mb-4">Solution for Query ID: {queryId}</h1>

      <div>
        {query ? (
          <div>
            <h2>Query Details</h2>
            <p><strong>Query ID:</strong> {query.qid}</p>
            <p><strong>Description:</strong> {query.queryText}</p>
            <p><strong>Status:</strong> {query.status}</p>
            <p><strong>Created Date:</strong> {new Date(query.createdDate).toLocaleDateString()}</p>
            <p><strong>Solution:</strong> {query.solution || 'No solution available yet'}</p>
          </div>
        ) : (
          <p>No query found for the provided ID.</p>
        )}
      </div>
    </div>
  );
};

export default ViewSolution;
