import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";

export const InputFormatCurrency = (
  props: NumericFormatProps<InputAttributes>,
) => {
  return (
    <NumericFormat
      className="focus-primary dark:border-opacity flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm font-medium outline-none transition-all focus:!border-primary disabled:cursor-not-allowed disabled:bg-gray-300 dark:bg-grayDark dark:disabled:bg-zinc-900"
      thousandSeparator
      {...props}
    />
  );
};
