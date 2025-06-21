-- Function to calculate outstanding fees for each student
CREATE OR REPLACE FUNCTION calculate_outstanding_fees()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(
        json_build_object(
            'student_id', student_data.student_id,
            'student_number', student_data.student_number,
            'student_name', student_data.student_name,
            'email', student_data.email,
            'year_of_study', student_data.year_of_study,
            'total_fees_due', student_data.total_fees_due,
            'total_payments_made', student_data.total_payments_made,
            'outstanding_balance', student_data.outstanding_balance,
            'fee_details', student_data.fee_details
        )
    ) INTO result
    FROM (
        SELECT 
            s.student_id,
            s.student_number,
            CONCAT(s.first_name, ' ', s.last_name) as student_name,
            s.email,
            s.year_of_study,
            COALESCE(SUM(sf.amount_due), 0) as total_fees_due,
            COALESCE(SUM(fp.amount_paid), 0) as total_payments_made,
            COALESCE(SUM(sf.amount_due), 0) - COALESCE(SUM(fp.amount_paid), 0) as outstanding_balance,
            json_agg(
                json_build_object(
                    'fee_type', fs.fee_type,
                    'amount_due', sf.amount_due,
                    'amount_paid', COALESCE(fp.amount_paid, 0),
                    'balance', sf.amount_due - COALESCE(fp.amount_paid, 0),
                    'due_date', sf.due_date,
                    'status', sf.status,
                    'semester', fs.semester,
                    'academic_year', fs.academic_year
                )
            ) as fee_details
        FROM users.students s
        LEFT JOIN financial.student_fees sf ON s.student_id = sf.student_id
        LEFT JOIN financial.fee_structure fs ON sf.fee_id = fs.fee_id
        LEFT JOIN financial.fee_payments fp ON sf.student_fee_id = fp.student_fee_id
        GROUP BY s.student_id, s.student_number, s.first_name, s.last_name, s.email, s.year_of_study
        ORDER BY s.student_number
    ) as student_data;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to get student outstanding fees by student ID
CREATE OR REPLACE FUNCTION get_student_outstanding_fees(p_student_id INTEGER)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'student_id', s.student_id,
        'student_number', s.student_number,
        'student_name', CONCAT(s.first_name, ' ', s.last_name),
        'email', s.email,
        'year_of_study', s.year_of_study,
        'total_fees_due', COALESCE(SUM(sf.amount_due), 0),
        'total_payments_made', COALESCE(SUM(fp.amount_paid), 0),
        'outstanding_balance', COALESCE(SUM(sf.amount_due), 0) - COALESCE(SUM(fp.amount_paid), 0),
        'fee_details', json_agg(
            json_build_object(
                'fee_type', fs.fee_type,
                'amount_due', sf.amount_due,
                'amount_paid', COALESCE(fp.amount_paid, 0),
                'balance', sf.amount_due - COALESCE(fp.amount_paid, 0),
                'due_date', sf.due_date,
                'status', sf.status,
                'semester', fs.semester,
                'academic_year', fs.academic_year
            )
        )
    ) INTO result
    FROM users.students s
    LEFT JOIN financial.student_fees sf ON s.student_id = sf.student_id
    LEFT JOIN financial.fee_structure fs ON sf.fee_id = fs.fee_id
    LEFT JOIN financial.fee_payments fp ON sf.student_fee_id = fp.student_fee_id
    WHERE s.student_id = p_student_id
    GROUP BY s.student_id, s.student_number, s.first_name, s.last_name, s.email, s.year_of_study;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Test the function
SELECT calculate_outstanding_fees();
