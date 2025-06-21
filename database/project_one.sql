--  students table
CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20),
    enrollment_year INT
);

--fees_payments
CREATE TABLE IF NOT EXISTS fees_payments (
    payment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    amount_paid NUMERIC(10, 2),
    payment_date DATE
);

-- courses
CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE,
    course_name VARCHAR(100),
    credit_hours INT
);

--lecturers table
CREATE TABLE IF NOT EXISTS lecturers (
    lecturer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100)
);

--teaching_assistants table
CREATE TABLE IF NOT EXISTS teaching_assistants (
    ta_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100)
);

--course_enrollments table
CREATE TABLE IF NOT EXISTS course_enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    enrollment_date DATE
);

--lecturer_course_assignments table
CREATE TABLE IF NOT EXISTS lecturer_course_assignments (
    assignment_id SERIAL PRIMARY KEY,
    lecturer_id INT REFERENCES lecturers(lecturer_id),
    course_id INT REFERENCES courses(course_id)
);

-- lecturer_ta_assignments table
CREATE TABLE IF NOT EXISTS lecturer_ta_assignments (
    assignment_id SERIAL PRIMARY KEY,
    lecturer_id INT REFERENCES lecturers(lecturer_id),
    ta_id INT REFERENCES teaching_assistants(ta_id)
);





-- Insert Students
INSERT INTO students (first_name, last_name, email, phone_number, enrollment_year) VALUES
('Hakeem', 'Henry', 'hakeemhenry@gmail.com', '0541254567', 2023)


-- Insert Courses
INSERT INTO courses (course_code, course_name, credit_hours) VALUES
('CPEN102', 'Introduction to Programming', 3)


-- Insert Lecturers
INSERT INTO lecturers (full_name, email) VALUES
('Dr. Nana Aboagye', 'naboagye@gmail.com')


-- Insert Teaching Assistants
INSERT INTO teaching_assistants (full_name, email) VALUES
('Mohammad ahmad', 'mohammad11@gmail.com')


-- Insert Course Enrollments
INSERT INTO course_enrollments (student_id, course_id, enrollment_date) VALUES
(1, 1, '2024-01-10')

-- Insert Lecturer-Course Assignments
INSERT INTO lecturer_course_assignments (lecturer_id, course_id) VALUES
(1, 1)

-- Insert Lecturer-TA Assignments
INSERT INTO lecturer_ta_assignments (lecturer_id, ta_id) VALUES
(1, 1)


-- Insert Fees Payments
INSERT INTO fees_payments (student_id, amount_paid, payment_date) VALUES
(1, 1000.00, '2024-01-05')


-- FUNCTION: Outstanding Fees (JSON)


CREATE OR REPLACE FUNCTION get_outstanding_fees()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(json_build_object(
        'student_id', student_id,
        'student_name', student_name,
        'outstanding_fees', 1500 - total_paid
    ))
    INTO result
    FROM (
        SELECT
            s.student_id,
            s.first_name || ' ' || s.last_name AS student_name,
            COALESCE(SUM(f.amount_paid), 0) AS total_paid
        FROM students s
        LEFT JOIN fees_payments f ON s.student_id = f.student_id
        GROUP BY s.student_id, s.first_name, s.last_name
    ) AS student_balances;

    RETURN result;
END;
$$ LANGUAGE plpgsql;


select get_outstanding_fees();
