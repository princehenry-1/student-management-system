-- Create the main database
CREATE DATABASE ce_department_system;

-- Connect to the database
\c ce_department_system;

-- Create schemas for better organization
CREATE SCHEMA IF NOT EXISTS academic;
CREATE SCHEMA IF NOT EXISTS financial;
CREATE SCHEMA IF NOT EXISTS users;

-- Set search path to include all schemas
SET search_path TO academic, financial, users, public;
