-- Create useful views for the application

-- Student dashboard view
CREATE VIEW student_dashboard AS
SELECT 
    s.student_id,
    s.student_number,
    CONCAT(s.first_name, ' ', s.last_name) as full_name,
    s.email,
    s.year_of_study,
    s.status,
    COUNT(DISTINCT ce.course_id) as enrolled_courses,
    COALESCE(SUM(sf.amount_due), 0) as total_fees_due,
    COALESCE(SUM(fp.amount_paid), 0) as total_payments_made,
    COALESCE(SUM(sf.amount_due), 0) - COALESCE(SUM(fp.amount_paid), 0) as outstanding_balance
FROM users.students s
LEFT JOIN academic.course_enrollments ce ON s.student_id = ce.student_id
LEFT JOIN financial.student_fees sf ON s.student_id = sf.student_id
LEFT JOIN financial.fee_payments fp ON sf.student_fee_id = fp.student_fee_id
GROUP BY s.student_id, s.student_number, s.first_name, s.last_name, s.email, s.year_of_study, s.status;

-- Course enrollment view
CREATE VIEW course_enrollment_details AS
SELECT 
    ce.enrollment_id,
    s.student_number,
    CONCAT(s.first_name, ' ', s.last_name) as student_name,
    c.course_code,
    c.course_name,
    c.credits,
    ce.enrollment_date,
    ce.grade,
    ce.status,
    CONCAT(l.first_name, ' ', l.last_name) as lecturer_name
FROM academic.course_enrollments ce
JOIN users.students s ON ce.student_id = s.student_id
JOIN academic.courses c ON ce.course_id = c.course_id
LEFT JOIN academic.lecturer_course_assignments lca ON c.course_id = lca.course_id
LEFT JOIN users.lecturers l ON lca.lecturer_id = l.lecturer_id;

-- Lecturer course load view
CREATE VIEW lecturer_course_load AS
SELECT 
    l.lecturer_id,
    l.staff_number,
    CONCAT(l.first_name, ' ', l.last_name) as lecturer_name,
    l.position,
    COUNT(DISTINCT lca.course_id) as courses_assigned,
    COUNT(DISTINCT lta.ta_id) as tas_supervised,
    STRING_AGG(DISTINCT c.course_code, ', ') as course_codes
FROM users.lecturers l
LEFT JOIN academic.lecturer_course_assignments lca ON l.lecturer_id = lca.lecturer_id
LEFT JOIN academic.lecturer_ta_assignments lta ON l.lecturer_id = lta.lecturer_id
LEFT JOIN academic.courses c ON lca.course_id = c.course_id
GROUP BY l.lecturer_id, l.staff_number, l.first_name, l.last_name, l.position;
