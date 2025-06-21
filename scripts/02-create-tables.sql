-- Users schema tables
CREATE TABLE users.students (
    student_id SERIAL PRIMARY KEY,
    student_number VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    address TEXT,
    enrollment_date DATE DEFAULT CURRENT_DATE,
    year_of_study INTEGER CHECK (year_of_study BETWEEN 1 AND 4),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated', 'suspended')),
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users.lecturers (
    lecturer_id SERIAL PRIMARY KEY,
    staff_number VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    department VARCHAR(100) DEFAULT 'Computer Engineering',
    position VARCHAR(50),
    hire_date DATE,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users.teaching_assistants (
    ta_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users.students(student_id),
    ta_number VARCHAR(20) UNIQUE NOT NULL,
    hourly_rate DECIMAL(10,2),
    max_hours_per_week INTEGER DEFAULT 20,
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Academic schema tables
CREATE TABLE academic.courses (
    course_id SERIAL PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    description TEXT,
    credits INTEGER NOT NULL,
    semester VARCHAR(20) NOT NULL,
    year INTEGER NOT NULL,
    prerequisites TEXT,
    max_enrollment INTEGER DEFAULT 50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE academic.course_enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users.students(student_id),
    course_id INTEGER REFERENCES academic.courses(course_id),
    enrollment_date DATE DEFAULT CURRENT_DATE,
    grade VARCHAR(5),
    status VARCHAR(20) DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'completed', 'dropped', 'failed')),
    UNIQUE(student_id, course_id)
);

CREATE TABLE academic.lecturer_course_assignments (
    assignment_id SERIAL PRIMARY KEY,
    lecturer_id INTEGER REFERENCES users.lecturers(lecturer_id),
    course_id INTEGER REFERENCES academic.courses(course_id),
    role VARCHAR(30) DEFAULT 'primary' CHECK (role IN ('primary', 'secondary', 'assistant')),
    assignment_date DATE DEFAULT CURRENT_DATE,
    academic_year VARCHAR(10),
    UNIQUE(lecturer_id, course_id, academic_year)
);

CREATE TABLE academic.lecturer_ta_assignments (
    assignment_id SERIAL PRIMARY KEY,
    lecturer_id INTEGER REFERENCES users.lecturers(lecturer_id),
    ta_id INTEGER REFERENCES users.teaching_assistants(ta_id),
    course_id INTEGER REFERENCES academic.courses(course_id),
    assignment_date DATE DEFAULT CURRENT_DATE,
    hours_per_week INTEGER,
    responsibilities TEXT,
    academic_year VARCHAR(10),
    UNIQUE(lecturer_id, ta_id, course_id, academic_year)
);

-- Financial schema tables
CREATE TABLE financial.fee_structure (
    fee_id SERIAL PRIMARY KEY,
    fee_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    academic_year VARCHAR(10) NOT NULL,
    semester VARCHAR(20),
    description TEXT,
    is_mandatory BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financial.student_fees (
    student_fee_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users.students(student_id),
    fee_id INTEGER REFERENCES financial.fee_structure(fee_id),
    amount_due DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'waived')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE financial.fee_payments (
    payment_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users.students(student_id),
    student_fee_id INTEGER REFERENCES financial.student_fees(student_fee_id),
    amount_paid DECIMAL(10,2) NOT NULL,
    payment_date DATE DEFAULT CURRENT_DATE,
    payment_method VARCHAR(30) CHECK (payment_method IN ('cash', 'bank_transfer', 'card', 'mobile_money')),
    reference_number VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_students_email ON users.students(email);
CREATE INDEX idx_students_student_number ON users.students(student_number);
CREATE INDEX idx_lecturers_email ON users.lecturers(email);
CREATE INDEX idx_course_enrollments_student ON academic.course_enrollments(student_id);
CREATE INDEX idx_course_enrollments_course ON academic.course_enrollments(course_id);
CREATE INDEX idx_fee_payments_student ON financial.fee_payments(student_id);
CREATE INDEX idx_student_fees_student ON financial.student_fees(student_id);
