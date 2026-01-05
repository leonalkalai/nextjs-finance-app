CREATE OR REPLACE FUNCTION fetch_transactions(
    arg_range VARCHAR default 'last30days',
    arg_limit INT default 20, -- pagination limit 20 first records
    arg_offset INT default 0 -- pagination offset
)
RETURNS SETOF transactions 
SECURITY INVOKER -- RLS
AS $$ -- function return is same as transactions table it returns the transactions table
DECLARE
    startDate TIMESTAMP;
    endDate TIMESTAMP := NOW();
BEGIN
    CASE arg_range -- dropdown selection filter range value
        WHEN 'last24hours' THEN
            startDate := NOW() - INTERVAL '24 hours'; -- subtract 24 hours from now
        WHEN 'last7days' THEN
            startDate := NOW() - INTERVAL '7 days'; -- subtract 7 days from now
        WHEN 'last30days' THEN
            startDate := NOW() - INTERVAL '30 days'; -- subtract 30 days from now
        WHEN 'last12months' THEN
            startDate := NOW() - INTERVAL '12 months'; -- subtract 12 months from now
        ELSE
            startDate := NOW() - INTERVAL '30 days'; -- Default case -- subtract 30 days from now
    END CASE;

    -- RETURN SELECT -- this is for a single value of query
    -- RETURN QUERY SELECT to return multiple rows 
    RETURN QUERY SELECT * FROM transactions  -- select all columns from transactions table
    WHERE 
    user_id = auth.uid() -- 🔑 user auth
    AND created_at BETWEEN startDate AND endDate -- when created_at is between the 2 dates
    ORDER BY created_at DESC -- order by most recent created_at
    LIMIT arg_limit -- limit result records to 20
    OFFSET arg_offset;  -- get next page with offset
END; -- end function
$$ LANGUAGE plpgsql; -- set the language to plpgsql