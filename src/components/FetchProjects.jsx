import React, { useEffect, useState } from 'react';

const FetchProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(''); // New state for status filtering

  // Fetch data from API
  const fetchAPI = () => {
    fetch('https://674e84f1635bad45618eebc1.mockapi.io/api/v1/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setFilteredProjects(data);
      })
      .catch(err => console.error('Error fetching projects:', err));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedStatus]); // Runs filter when search term or status changes

  const handleFilter = () => {
    let filtered = projects;

    if (searchTerm) {
      filtered = filtered.filter((project) =>
        project.ProjectName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter((project) => project.status === selectedStatus);
    }

    setFilteredProjects(filtered);
  };

  return (
    <div>
      <h2 className="mb-3 text-center">Project List</h2>

      {/* Search Input */}
      <div className="mb-3 text-center">
        <input
          type="text"
          placeholder="Search project by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <div className="mb-3 text-center">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          {selectedStatus || 'Filter by Status'}
        </button>
        <ul className="dropdown-menu">
          {['All', 'In Progress', 'Planning', 'Pending Approval', 'Active', 'Completed', 'On Hold', 'Under Review'].map((status) => (
            <li key={status}>
              <button
                className="dropdown-item"
                onClick={() => setSelectedStatus(status === 'All' ? '' : status)}
              >
                {status}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Project Table */}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Details</th>
            <th>Priority</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.ProjectName}</td>
                <td>{p.Details}</td>
                <td>{p.priority}</td>
                <td>{p.Department}</td>
                <td>{p.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No matching projects found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FetchProjects;
