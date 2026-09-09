
--*************************************
-- جدول کاربران
--*************************************
CREATE TABLE users (
id serial PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
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



SELECT * FROM users;

SELECT to_char(created_at, 'hh24:mi:ss') AS "Date" from users

SELECT age(now(), created_at) from users

SELECT * FROM password_reset_tokens;

SELECT * FROM password_reset_tokens
WHERE token = 'test-token-12345'

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

SELECT * FROM password_reset_tokens prt
WHERE prt.expires_at >= NOW();

DELETE FROM users WHERE id = 1

TRUNCATE TABLE users RESTART IDENTITY

DELETE FROM users

INSERT INTO password_reset_tokens(user_id, token, expires_at)
VALUES (1, 'test-token-12345', NOW() + INTERVAL '1 hour')