
--*************************************
-- جدول کاربران
--*************************************
CREATE TABLE users (
id serial PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
role VARCHAR(20) DEFAULT 'USER',
created_at TIMESTAMPTZ DEFAULT NOW()
);

--*************************************
-- جدول ریست پسورد
--*************************************
CREATE TABLE password_reset_tokens(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

--*************************************
-- ایندکس ها
--*************************************
CREATE INDEX idx_password_reset_tokens_token 
ON password_reset_tokens(token);
