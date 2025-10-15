export const formatNumberToK = (views: number) => {
  // kiếm tra nếu views truyền vào nhỏ hơn 1000 thì trả về số view truyền vào đó
  if (views < 1000) return views;

  // trả về số views và / 1000 dùng toFixed(1z) làm trong 1 chữ số thập phân phía sau số thực VD:
  return `${(views / 1000).toFixed(1)}k`;
};

export const formatMinutesToHour = (minutes: number) => {
  // hours: dùng  Math.floor để làm tròn xuống lấy tổng thời gian / 60 thì sẽ ra giờ
  const hours = Math.floor(minutes / 60);
  // remainMinutes: lấy phút phần trăm cho 60 sẽ ra phút (% là chia lấy dư)
  const remainMinutes = minutes % 60;

  // ${hours}h${remainMinutes}p: Nối giờ với phút lại sẽ ra 00h0p
  return `${hours}h${remainMinutes}p`;
};
