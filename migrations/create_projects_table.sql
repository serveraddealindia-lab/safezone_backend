-- Migration to add projects table
-- Run this script in phpMyAdmin to create the projects table

-- Create projects table
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  year INT,
  status ENUM('completed', 'ongoing', 'planned') DEFAULT 'completed',
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_country (country),
  INDEX idx_status (status),
  INDEX idx_category (category),
  INDEX idx_year (year)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample projects
INSERT INTO projects (title, location, country, description, image, year, status, category) VALUES
('Dubai Airport Fire Safety System', 'Dubai', 'UAE', 'Comprehensive fire safety system installation for Dubai International Airport terminals.', 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Dubai+Airport', 2023, 'completed', 'Airport'),
('Abu Dhabi Mall Fire Protection', 'Abu Dhabi', 'UAE', 'Advanced fire suppression and detection systems for premium shopping mall.', 'https://via.placeholder.com/600x400/991B1B/FFFFFF?text=Abu+Dhabi+Mall', 2023, 'completed', 'Commercial'),
('Riyadh Hospital Fire Safety', 'Riyadh', 'Saudi Arabia', 'State-of-the-art fire safety infrastructure for major hospital complex.', 'https://via.placeholder.com/600x400/B91C1C/FFFFFF?text=Riyadh+Hospital', 2022, 'completed', 'Healthcare'),
('Muscat Industrial Complex', 'Muscat', 'Oman', 'Fire protection systems for large-scale industrial manufacturing facility.', 'https://via.placeholder.com/600x400/7F1D1D/FFFFFF?text=Muscat+Industry', 2023, 'completed', 'Industrial'),
('Mumbai High-rise Residential', 'Mumbai', 'India', 'Fire safety solutions for luxury residential towers.', 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Mumbai+Residential', 2022, 'completed', 'Residential'),
('Kuwait Oil Refinery', 'Kuwait City', 'Kuwait', 'Specialized fire suppression systems for oil and gas processing facility.', 'https://via.placeholder.com/600x400/991B1B/FFFFFF?text=Kuwait+Refinery', 2023, 'ongoing', 'Industrial');