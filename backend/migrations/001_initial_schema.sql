CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE, -- 로그인 ID
    password_hash TEXT NOT NULL,
    full_name TEXT 
);

-- dining_tables 테이블: 레스토랑의 식사 테이블 정보
CREATE TABLE IF NOT EXISTS dining_tables (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_id TEXT NOT NULL UNIQUE, -- 테이블 고유 식별자 (예: 'A1', 'B2', '룸1')
    location TEXT NOT NULL, -- 테이블 위치 (예: 'windows', 'inside', 'room')
    capacity INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- reservations 테이블: 실제 예약 정보 
CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL, -- 예약자 ID (FK to users.id) [cite: 7]
    table_id INTEGER NOT NULL, -- 예약된 테이블 ID (FK to dining_tables.id) [cite: 7]
    reservation_date TEXT NOT NULL, -- 예약 날짜 (YYYY-MM-DD 형식으로 저장, 예: '2024-06-15')
    meal_type TEXT NOT NULL, -- 식사 유형 (예: 'lunch', 'dinner') [cite: 5]
    reservation_time TEXT NOT NULL, -- 예약 시간 (HH:MM 형식으로 저장, 예: '18:30')
    number_of_guests INTEGER NOT NULL, -- 손님 수
    customer_name TEXT NOT NULL, -- 예약자 이름 (user_id와 별개로, 예약 시 입력받는 이름)
    customer_phone_number TEXT NOT NULL, -- 예약자 전화번호 (user_id와 별개로, 예약 시 입력받는 번호) [cite: 8]
    credit_card_number TEXT NOT NULL, -- 신용카드 번호 
    status TEXT NOT NULL DEFAULT 'confirmed', -- 예약 상태: 'confirmed', 'cancelled' [cite: 9, 10, 11]
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (table_id) REFERENCES dining_tables(id) ON DELETE CASCADE,
    -- 예약 시간 중복 방지를 위한 UNIQUE 제약 조건 (복합 키)
    CONSTRAINT unique_table_time_reservation UNIQUE (table_id, reservation_date, reservation_time)
);

