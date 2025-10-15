export const formatCurrency = (data: number, type = "en-US") => {
  if (!data || Number.isNaN(data)) return 0;

  return data.toLocaleString(type);
};
