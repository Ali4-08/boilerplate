
--*************************************
-- جدول کاربران
--*************************************
CREATE TABLE users (
id serial PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
role VARCHAR(20) DEFAULT 'user',
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


SELECT 
    u.id, 
    u.email,
    left(prt.token, 10) AS token_preview, 
    prt.used,
    prt.expires_at,
    prt.created_at
FROM users u
JOIN password_reset_tokens prt
ON u.id = prt.user_id
ORDER BY prt.created_at DESC
LIMIT 3

ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'user';

select * from users
WHERE role = 'ADMIN'

UPDATE users
SET role = 'ADMIN'
WHERE id = 5