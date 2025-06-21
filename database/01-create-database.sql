-- Create the main database
CREATE DATABASE student_management_system;

-- Connect to the database
\c student_management_system;

-- Create schemas for better organization
CREATE SCHEMA IF NOT EXISTS academic;
CREATE SCHEMA IF NOT EXISTS financial;
CREATE SCHEMA IF NOT EXISTS users;

-- Set search path to include all schemas
SET search_path TO academic, financial, users, public;
