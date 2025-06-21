-- Insert sample lecturers
INSERT INTO users.lecturers (staff_number, first_name, last_name, email, phone, position, hire_date) VALUES
('LEC001', 'Dr. John', 'Smith', 'john.smith@university.edu', '+1234567890', 'Professor', '2015-01-15'),
('LEC002', 'Dr. Sarah', 'Johnson', 'sarah.johnson@university.edu', '+1234567891', 'Associate Professor', '2017-08-20'),
('LEC003', 'Dr. Michael', 'Brown', 'michael.brown@university.edu', '+1234567892', 'Assistant Professor', '2019-02-10'),
('LEC004', 'Dr. Emily', 'Davis', 'emily.davis@university.edu', '+1234567893', 'Professor', '2014-09-01'),
('LEC005', 'Dr. Robert', 'Wilson', 'robert.wilson@university.edu', '+1234567894', 'Associate Professor', '2016-03-15');

-- Insert sample students (using class data simulation)
INSERT INTO users.students (student_number, first_name, last_name, email, phone, date_of_birth, address, year_of_study) VALUES
('CE2021001', 'Chris', 'Celeb', 'chris.celeb@student.edu', '+1234567801', '2003-05-15', '123 Main St, City A', 3),
('CE2021002', 'Jose', 'Ansoh', 'jose.ansah@student.edu', '+2334567802', '2003-07-22', '456 Oak Ave, City B', 3),
('CE2021003', 'Carol', 'Clark', 'carol.clark@student.edu', '+2334567803', '2003-03-10', '789 Pine Rd, City C', 3),
('CE2021004', 'David', 'Davis', 'david.davis@student.edu', '+2334567804', '2003-09-18', '321 Elm St, City D', 3),
('CE2021005', 'Eva', 'Evans', 'eva.evans@student.edu', '+23334567805', '2003-11-25', '654 Maple Dr, City E', 3),
('CE2022001', 'Frank', 'Foster', 'frank.foster@student.edu', '+2334567806', '2004-01-12', '987 Cedar Ln, City F', 2),
('CE2022002', 'Grace', 'Green', 'grace.green@student.edu', '+2334567807', '2004-04-08', '147 Birch St, City G', 2),
('CE2022003', 'Henry', 'Harris', 'henry.harris@student.edu', '+2334567808', '2004-06-30', '258 Spruce Ave, City H', 2),
('CE2023001', 'Ivy', 'Jackson', 'ivy.jackson@student.edu', '+2334567809', '2005-02-14', '369 Willow Rd, City I', 1),
('CE2023002', 'Jack', 'Johnson', 'jack.johnson@student.edu', '+2334567810', '2005-08-20', '741 Poplar Dr, City J', 1);

-- Insert teaching assistants (some senior students)
INSERT INTO users.teaching_assistants (student_id, ta_number, hourly_rate, start_date) VALUES
(1, 'TA001', 15.00, '2024-01-15'),
(2, 'TA002', 15.00, '2024-01-15'),
(3, 'TA003', 16.00, '2024-01-15');

-- Insert sample courses
INSERT INTO academic.courses (course_code, course_name, description, credits, semester, year) VALUES
('CE101', 'Introduction to Computer Engineering', 'Basic concepts of computer engineering', 3, 'Fall', 2024),
('CE201', 'Data Structures and Algorithms', 'Fundamental data structures and algorithms', 4, 'Spring', 2024),
('CE301', 'Computer Architecture', 'Design and organization of computer systems', 3, 'Fall', 2024),
('CE302', 'Operating Systems', 'Principles of operating system design', 4, 'Spring', 2024),
('CE401', 'Software Engineering', 'Software development methodologies', 3, 'Fall', 2024),
('CE402', 'Database Systems', 'Database design and management', 3, 'Spring', 2024),
('CE403', 'Computer Networks', 'Network protocols and architectures', 4, 'Fall', 2024),
('CE404', 'Artificial Intelligence', 'AI concepts and applications', 3, 'Spring', 2024);

-- Insert course enrollments
INSERT INTO academic.course_enrollments (student_id, course_id) VALUES
-- Year 3 students (advanced courses)
(1, 5), (1, 6), (1, 7), (1, 8),
(2, 5), (2, 6), (2, 7),
(3, 5), (3, 6), (3, 8),
(4, 6), (4, 7), (4, 8),
(5, 5), (5, 7), (5, 8),
-- Year 2 students (intermediate courses)
(6, 2), (6, 3), (6, 4),
(7, 2), (7, 3),
(8, 2), (8, 4),
-- Year 1 students (basic courses)
(9, 1), (9, 2),
(10, 1);

-- Insert lecturer course assignments
INSERT INTO academic.lecturer_course_assignments (lecturer_id, course_id, academic_year) VALUES
(1, 1, '2024'), (1, 2, '2024'),
(2, 3, '2024'), (2, 4, '2024'),
(3, 5, '2024'), (3, 6, '2024'),
(4, 7, '2024'), (4, 8, '2024'),
(5, 1, '2024'), (5, 3, '2024');

-- Insert lecturer TA assignments
INSERT INTO academic.lecturer_ta_assignments (lecturer_id, ta_id, course_id, hours_per_week, responsibilities, academic_year) VALUES
(1, 1, 1, 10, 'Lab assistance and grading', '2024'),
(1, 2, 2, 12, 'Tutorial sessions and assignment help', '2024'),
(2, 3, 3, 15, 'Lab supervision and project guidance', '2024'),
(3, 1, 5, 8, 'Code review and student mentoring', '2024'),
(4, 2, 7, 10, 'Network lab assistance', '2024');

-- Insert fee structure
INSERT INTO financial.fee_structure (fee_type, amount, academic_year, semester, description, is_mandatory) VALUES
('Tuition Fee', 5000.00, '2024', 'Fall', 'Semester tuition fee', true),
('Tuition Fee', 5000.00, '2024', 'Spring', 'Semester tuition fee', true),
('Lab Fee', 300.00, '2024', 'Fall', 'Laboratory usage fee', true),
('Lab Fee', 300.00, '2024', 'Spring', 'Laboratory usage fee', true),
('Library Fee', 150.00, '2024', 'Fall', 'Library access fee', true),
('Library Fee', 150.00, '2024', 'Spring', 'Library access fee', true),
('Student Activity Fee', 100.00, '2024', 'Fall', 'Student activities and events', false),
('Student Activity Fee', 100.00, '2024', 'Spring', 'Student activities and events', false);

-- Insert student fees (assign fees to students)
INSERT INTO financial.student_fees (student_id, fee_id, amount_due, due_date) VALUES
-- Fall 2024 fees for all students
(1, 1, 5000.00, '2024-09-15'), (1, 3, 300.00, '2024-09-15'), (1, 5, 150.00, '2024-09-15'), (1, 7, 100.00, '2024-09-15'),
(2, 1, 5000.00, '2024-09-15'), (2, 3, 300.00, '2024-09-15'), (2, 5, 150.00, '2024-09-15'), (2, 7, 100.00, '2024-09-15'),
(3, 1, 5000.00, '2024-09-15'), (3, 3, 300.00, '2024-09-15'), (3, 5, 150.00, '2024-09-15'),
(4, 1, 5000.00, '2024-09-15'), (4, 3, 300.00, '2024-09-15'), (4, 5, 150.00, '2024-09-15'), (4, 7, 100.00, '2024-09-15'),
(5, 1, 5000.00, '2024-09-15'), (5, 3, 300.00, '2024-09-15'), (5, 5, 150.00, '2024-09-15'),
(6, 1, 5000.00, '2024-09-15'), (6, 3, 300.00, '2024-09-15'), (6, 5, 150.00, '2024-09-15'), (6, 7, 100.00, '2024-09-15'),
(7, 1, 5000.00, '2024-09-15'), (7, 3, 300.00, '2024-09-15'), (7, 5, 150.00, '2024-09-15'),
(8, 1, 5000.00, '2024-09-15'), (8, 3, 300.00, '2024-09-15'), (8, 5, 150.00, '2024-09-15'), (8, 7, 100.00, '2024-09-15'),
(9, 1, 5000.00, '2024-09-15'), (9, 3, 300.00, '2024-09-15'), (9, 5, 150.00, '2024-09-15'),
(10, 1, 5000.00, '2024-09-15'), (10, 3, 300.00, '2024-09-15'), (10, 5, 150.00, '2024-09-15'), (10, 7, 100.00, '2024-09-15');

-- Insert some sample payments (partial payments for some students)
INSERT INTO financial.fee_payments (student_id, student_fee_id, amount_paid, payment_method, reference_number) VALUES
(1, 1, 5000.00, 'bank_transfer', 'TXN001'), -- Full tuition payment
(1, 2, 300.00, 'bank_transfer', 'TXN002'), -- Full lab fee payment
(1, 3, 150.00, 'card', 'TXN003'), -- Full library fee payment
(2, 5, 3000.00, 'bank_transfer', 'TXN004'), -- Partial tuition payment
(2, 6, 300.00, 'mobile_money', 'TXN005'), -- Full lab fee payment
(3, 9, 2500.00, 'bank_transfer', 'TXN006'), -- Partial tuition payment
(4, 13, 5000.00, 'bank_transfer', 'TXN007'), -- Full tuition payment
(4, 14, 200.00, 'card', 'TXN008'), -- Partial lab fee payment
(5, 17, 1000.00, 'mobile_money', 'TXN009'), -- Partial tuition payment
(6, 21, 5000.00, 'bank_transfer', 'TXN010'), -- Full tuition payment
(6, 22, 300.00, 'bank_transfer', 'TXN011'), -- Full lab fee payment
(6, 23, 150.00, 'card', 'TXN012'); -- Full library fee payment
