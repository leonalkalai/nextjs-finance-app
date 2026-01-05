CREATE OR REPLACE FUNCTION fetch_transactions(
    arg_range VARCHAR DEFAULT 'last30days',
    arg_limit INT DEFAULT 20,
    arg_offset INT DEFAULT 0
)
RETURNS SETOF transactions 
SECURITY INVOKER
AS $$
DECLARE
    startDate TIMESTAMP;
    endDate TIMESTAMP := NOW();
BEGIN
    CASE arg_range
        WHEN 'last24hours' THEN
            startDate := NOW() - INTERVAL '24 hours';
        WHEN 'last7days' THEN
            startDate := NOW() - INTERVAL '7 days';
        WHEN 'last30days' THEN
            startDate := NOW() - INTERVAL '30 days';
        WHEN 'last12months' THEN
            startDate := NOW() - INTERVAL '12 months';
        ELSE
            startDate := NOW() - INTERVAL '30 days';
    END CASE;

    RETURN QUERY
    SELECT *
    FROM transactions
    WHERE 
    user_id = auth.uid() AND created_at BETWEEN startDate AND endDate
    ORDER BY created_at DESC
    LIMIT arg_limit
    OFFSET arg_offset;
END;
$$ LANGUAGE plpgsql;
