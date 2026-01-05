-- create or replace function [function name] (arguments)
-- this command is used to create a function or replace a current function

-- Create or replace the existing function, named `calculate_total`
create or replace function calculate_total (
  -- The arguments (this one is optional, but arguments can be mandatory, just skip `default null`)

  -- function header
	arg_type varchar -- arg_type is name of argument and varchar is value type of argument
    default null -- this makes the argument optional and set to the value by default to null
) 
-- return type
returns numeric -- Returns number
-- function body
as 
$$ -- opening without escape single quotes
begin -- begin statement
    -- database query for sum
	return ( -- return the query
		select SUM(amount) -- Select the sum of all values from the amount column
		from transactions  -- of transactions table
		where              -- where...
			(type = arg_type or arg_type is null) -- check if type is arg_type, or if arg_type was specified
	);
end; -- end statement
$$ -- closing without escape single quotes
language plpgsql -- The language of this funcion is plpgsql Procedural language PostgreSQL (other languages can be used)