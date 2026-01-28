-- Migration to add name column to users table
-- Run this script in phpMyAdmin to update the existing users table

ALTER TABLE users ADD COLUMN name VARCHAR(255) AFTER id;

-- Update existing admin user with a default name
UPDATE users SET name = 'Admin User' WHERE email = 'admin@firesafety.com' AND name IS NULL;