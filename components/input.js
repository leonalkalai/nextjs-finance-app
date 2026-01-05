// export default function Input(props) {
//   const styles = {
//     checkbox: `
//       w-5 h-5
//       rounded border border-gray-300
//       bg-white dark:bg-gray-950
//       shadow-sm
//       checked:bg-black dark:checked:bg-gray-200
//       checked:border-black dark:checked:border-gray-300
//       focus:outline-none
//       transition-colors duration-150
//       accent-black dark:accent-white
//       cursor-pointer
//     `,
//     default: `
//       w-full rounded-md shadow-sm border-gray-300
//       bg-white dark:border-gray-700 dark:bg-gray-950
//       focus:outline-none
//       transition-colors duration-150
//     `
//   };

//   return <input {...props} className={styles[props.type] ?? styles.default} />;
// }

// fix the ref error

import { forwardRef } from "react";

export default forwardRef(function Input(props, ref) {
  const styles = {
    checkbox: `
      w-5 h-5
      rounded border border-gray-300
      bg-white dark:bg-gray-950
      shadow-sm
      checked:bg-black dark:checked:bg-gray-200
      checked:border-black dark:checked:border-gray-300
      focus:outline-none
      transition-colors duration-150
      accent-black dark:accent-white
      cursor-pointer
      disabled:opacity-75
    `,
    file: `
      w-full
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-black dark:file:bg-gray-200
      file:text-white dark:file:text-gray-900
      hover:file:bg-gray-800 dark:hover:file:bg-white
      cursor-pointer
      disabled:opacity-75
    `,
    // 'file': 'file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:opacity-50 file:dark:text-gray-400',
    default: `
      w-full rounded-md shadow-sm border-gray-300
      bg-white dark:border-gray-700 dark:bg-gray-950
      focus:outline-none
      transition-colors duration-150
      disabled:opacity-75
    `,
  };

  return (
    <input
      ref={ref}
      {...props}
      className={`${styles[props.type] ?? styles["default"]} ${props.className}`}
    />
  );
});
