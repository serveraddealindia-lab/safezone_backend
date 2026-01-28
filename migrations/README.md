# Database Migration Instructions

## Adding Name Field to Users Table

To add the name field to the users table, you need to run the following SQL migration script:

### Using phpMyAdmin:
1. Open phpMyAdmin
2. Select your database (`fire_safety_db`)
3. Go to the "SQL" tab
4. Copy and paste the contents of `backend/migrations/add_name_to_users.sql` into the SQL query box
5. Click "Go" to execute the script

### Using MySQL Command Line:
1. Open a terminal/command prompt
2. Navigate to the project root directory
3. Run the following command:
   ```bash
   mysql -u your_username -p fire_safety_db < backend/migrations/add_name_to_users.sql
   ```
   Replace `your_username` with your MySQL username

### Migration Script Contents:
```sql
-- Migration to add name column to users table
-- Run this script in phpMyAdmin to update the existing users table

ALTER TABLE users ADD COLUMN name VARCHAR(255) AFTER id;

-- Update existing admin user with a default name
UPDATE users SET name = 'Admin User' WHERE email = 'admin@firesafety.com' AND name IS NULL;
```

### After Running the Migration:
1. Restart the backend server
2. Test the users admin page to ensure the name field is working correctly
3. The users admin page should now display a "Name" column and allow editing of user names