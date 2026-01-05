"use client";
import DateRangeSelect from "@/components/date-range-select"; //import custom range component
// import Select from "@/components/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Range(
   { defaultView } // pass the defaultView prop for settings
) {
  const searchParams = useSearchParams(); // check the url parameters
  const pathname = usePathname(); // gives the url pathname
  const { replace } = useRouter(); // change path

  // const range = searchParams.get("range") ?? "last30days"; // get the range parameter value from url

  const range = searchParams.get('range') ?? defaultView ?? 'last30days' // expand the range with the user settings

  // set url params handler
  const handleChange = (e) => {
    const params = new URLSearchParams();
    params.set("range", e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    // <Select
    //   // defaultValue={range} // set default value
    //   value={range} // set default value
    //   onChange={handleChange}
    //   //   onChange={(e) => {
    //   //     const params = new URLSearchParams(); // create params object
    //   //     params.set("range", e.target.value); // set params range frojm the current target value
    //   //     replace(`${pathname}?${params.toString()}`); // set the new path // range=thismonth
    //   //   }}
    // >
    //   <option value="last24hours">Last 24 hours</option>
    //   <option value="last7days">Last 7 days</option>
    //   <option value="last30days">Last 30 days</option>
    //   <option value="last12months">Last 12 months</option>
    // </Select>
    <DateRangeSelect value={range} onChange={handleChange} /> // use custom range component 
  );
}
