#!/usr/bin/env python3
"""
Migration script to add user_id column to existing books table.
This script should be run once to migrate existing data.
"""

import sqlite3
import os

def migrate_database():
    db_path = 'books.db'
    
    if not os.path.exists(db_path):
        print("Database doesn't exist yet. No migration needed.")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if user_id column already exists
        cursor.execute("PRAGMA table_info(book)")
        columns = [column[1] for column in cursor.fetchall()]
        
        if 'user_id' in columns:
            print("user_id column already exists. No migration needed.")
            return
        
        # Add user_id column
        print("Adding user_id column to book table...")
        cursor.execute("ALTER TABLE book ADD COLUMN user_id INTEGER")
        
        # Get the first user ID (for existing books)
        cursor.execute("SELECT id FROM user LIMIT 1")
        first_user = cursor.fetchone()
        
        if first_user:
            # Assign all existing books to the first user
            cursor.execute("UPDATE book SET user_id = ? WHERE user_id IS NULL", (first_user[0],))
            print(f"Assigned {cursor.rowcount} existing books to user ID {first_user[0]}")
        else:
            print("No users found. Existing books will need user_id set manually.")
        
        # Make user_id NOT NULL (SQLite doesn't support adding NOT NULL constraint directly)
        # We'll handle this in the application logic
        
        conn.commit()
        print("Migration completed successfully!")
        
    except Exception as e:
        print(f"Migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_database()
