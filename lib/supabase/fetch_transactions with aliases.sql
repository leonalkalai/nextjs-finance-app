CREATE OR REPLACE FUNCTION fetch_transactions(
    arg_range VARCHAR DEFAULT 'last30days',
    arg_limit INT DEFAULT 20,
    arg_offset INT DEFAULT 0
)
RETURNS TABLE(
    id UUID,
    user_id UUID,
    created_at TIMESTAMPTZ,
    amount BIGINT,
    type TEXT,           
    description TEXT,
    category TEXT       
)
SECURITY INVOKER
AS $$
DECLARE
    startDate TIMESTAMPTZ;
    endDate TIMESTAMPTZ := NOW();
BEGIN
    startDate := CASE arg_range
        WHEN 'last24hours' THEN NOW() - INTERVAL '24 hours'
        WHEN 'last7days' THEN NOW() - INTERVAL '7 days'
        WHEN 'last30days' THEN NOW() - INTERVAL '30 days'
        WHEN 'last12months' THEN NOW() - INTERVAL '12 months'
        ELSE NOW() - INTERVAL '30 days'
    END;

    RETURN QUERY
    SELECT t.id, t.user_id, t.created_at, t.amount, t.type, t.description, t.category
    FROM transactions t
    WHERE t.user_id = auth.uid()
      AND t.created_at BETWEEN startDate AND endDate
    ORDER BY t.created_at DESC
    LIMIT arg_limit
    OFFSET arg_offset;
END;
$$ LANGUAGE plpgsql;
