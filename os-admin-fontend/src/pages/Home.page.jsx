import React, { useState } from "react";
import {
  FaUsers,
  FaUserShield,
  FaClipboardList,
  FaClock,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { StatCard } from "../components/StatCard";

export const HomePage = () => {
  // Dummy statistics data

  return (
    <div className="container mt-4">
      {/* Statistics Cards */}
      <div className="row">
        <StatCard
          title="Total Customers"
          value="10"
          icon={<FaUsers />}
          className="bg-primary text-white"
        />
        <StatCard
          title="Total Users"
          value="20"
          icon={<FaUserShield />}
          className="bg-success text-white"
        />
        <StatCard
          title="Total Orders"
          value="30"
          icon={<FaClipboardList />}
          className="bg-warning text-dark"
        />
        <StatCard
          title="User Logs"
          value="Logs"
          icon={<FaClock />}
          className="bg-secondary text-white"
        />
      </div>

      {/* Pending Orders Table */}
      <div className="card mt-4">
        <div className="card-header  text-white">
          <h5 className="mb-0 title">Pending Orders</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Card Component
