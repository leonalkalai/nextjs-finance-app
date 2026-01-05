-- create or replace function [function name] (arguments)
-- this command is used to create a function or replace a current function

-- Create or replace the existing function, named `calculate_total`
create or replace function calculate_total (
  -- The arguments (this one is optional, but arguments can be mandatory, just skip `default null`)

  -- function header
    arg_range varchar 
	default 'lastmonth', -- argument range with default lastmonth
	arg_type varchar -- arg_type is name of argument and varchar is value type of argument
    default null -- this makes the argument optional and set to the value by default to null
) 
-- return type
-- returns numeric -- Return number
returns table(current_amount numeric, previous_amount numeric) -- Return array of objects - table with current and previous amount number
-- function body
as 
$$ -- opening without escape single quotes

declare -- declare variables

    -- name currentStart and type is date and time

	-- declare current time variables
	currentStart timestamp; -- start time from which we get the data
    currentEnd timestamp; -- current time
    
	-- declare previous time variables
	previousStart timestamp;
	previousEnd timestamp;


begin -- begin statement

  currentEnd := now(); -- assign value to variable using :=   |   now(); is getting the current time


  currentStart := 
    case -- if statement
		when arg_range = 'last24hours' then currentEnd - interval '24 hours' -- = is used for comparison |  when is used like if 
		when arg_range = 'thisweek' then currentEnd - interval '7 days' -- this is the value option set at range.js
		when arg_range = 'thismonth' then currentEnd - interval '30 days' -- this is the value option set at range.js
		when arg_range = 'thisyear' then currentEnd - interval '12 months' -- this is the value option set at range.js
		else currentEnd - interval '30 days' -- else just use last month
    end; -- end if statement

    -- if a transaction happen exactly at the current start time, it can conclude to calculate sum of transactions for current period and previous period
    previousEnd := currentStart - interval '1 second';	-- initialize previous and subtract 1 second to prevent overlap with currentEnd
   
    
	-- example 
	-- if currentEnd := now(); then is is current moment
	-- then currentStart 24 hours ago 
	-- then previousEnd 24 hours ago - 1 second
	-- then previousStart is 48 hours ago because it is 24 hours period + 24 hours before that
	previousStart := currentStart - (currentEnd - currentStart); -- selected option minus ( current time minus selected option) |  interval -> current time minus selected option
	

    -- database query for sum
	-- return ( -- return the query

	-- set current amount
	current_amount := ( -- set the current amount and calculate the object properties
		--select SUM(amount) -- Select the sum of all values from the amount column
		select COALESCE(SUM(amount), 0) -- prevent null return 0
		from transactions  -- of transactions table
		where              -- where...
			(type = arg_type or arg_type is null) -- check if type is arg_type, or if arg_type was specified
			 and -- end to add a query 
			(created_at between currentStart and currentEnd) -- created_at is between the 2 values
	);
    -- set previous amount
	previous_amount := (
		select COALESCE(SUM(amount), 0) -- Select the sum of all values from the amount column
		from transactions  -- of transactions table
		where              -- where...
			(type = type_arg or type_arg is null) -- The type is type_arg, if type_arg was specified
			and (created_at between previousStart and previousEnd)
	);
	return next; -- return the function values 
end; -- end statement
$$ -- closing without escape single quotes
language plpgsql -- The language of this funcion is plpgsql Procedural language PostgreSQL (other languages can be used)