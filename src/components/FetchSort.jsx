import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProjectTable = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch("https://674e84f1635bad45618eebc1.mockapi.io/api/v1/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchAPI();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr || isNaN(new Date(dateStr).getTime())) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-GB");
  };

  const filteredProjects = projects
    .filter((p) => p.ProjectName.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (department ? p.Department === department : true))
    .sort((a, b) => (sortOrder === "asc" ? a.ProjectName.localeCompare(b.ProjectName) : b.ProjectName.localeCompare(a.ProjectName)));

  return (
    <div className="container mt-4">
      {/* Filter Row */}
      <div className="d-flex align-items-center gap-3 mb-3 bg-light p-3 rounded shadow">
        {/* Search Input */}
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search project..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Department Filter */}
        <select className="form-select w-25" value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>

        {/* Sort Dropdown */}
        <select className="form-select w-25" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Sort: A-Z</option>
          <option value="desc">Sort: Z-A</option>
        </select>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped shadow">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Project Name</th>
            <th>Details</th>
            <th>Priority</th>
            <th>Department</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((p, index) => (
            <tr key={index}>
              <td>{p.id}</td>
              <td>{p.ProjectName}</td>
              <td>{p.Details}</td>
              <td>{p.priority}</td>
              <td>{p.Department}</td>
              <td>{p.status}</td>
              <td>{formatDate(p.startDate)}</td>
              <td>{formatDate(p.EndDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;