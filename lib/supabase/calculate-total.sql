create or replace function calculate_total (
    arg_range varchar default 'last30days',
    arg_type varchar default null
) 
returns table(current_amount numeric, previous_amount numeric)
as 
$$
declare
	currentStart timestamp;
    currentEnd timestamp;
	previousStart timestamp;
	previousEnd timestamp;
begin
  currentEnd := now();

  currentStart := 
    case
		when arg_range = 'last24hours' then currentEnd - interval '24 hours'
		when arg_range = 'last7days' then currentEnd - interval '7 days'
		when arg_range = 'last30days' then currentEnd - interval '30 days'
		when arg_range = 'last12months' then currentEnd - interval '12 months'
		else currentEnd - interval '30 days'
    end;

    previousEnd := currentStart - interval '1 second';
	previousStart := currentStart - (currentEnd - currentStart);

	current_amount := (
		select COALESCE(SUM(amount), 0)
		from transactions
		where (type = arg_type or arg_type is null)
		  and (created_at between currentStart and currentEnd)
	);

	previous_amount := (
		select COALESCE(SUM(amount), 0)
		from transactions
		where (type = arg_type or arg_type is null)
		  and (created_at between previousStart and previousEnd)
	);

	return next;
end;
$$
language plpgsql;
