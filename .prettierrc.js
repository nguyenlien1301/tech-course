module.exports = {
  bracketSameLine: false, // Không đặt dấu > của JSX trên cùng một dòng với thẻ mở
  bracketSpacing: true, // Có khoảng trắng giữa dấu ngoặc nhọn {} trong Object
  trailingComma: "all", // Thêm dấu , cuối cùng trong object, array, params list,... nếu có thể
  jsxSingleQuote: false, // Không dùng dấu ' trong JSX mà phải dùng dấu ""
  tabWidth: 2, // Đặt số khoảng trắng cho một tab = 2 spaces (thay vì 4 chẳng hạn)
  semi: true, // Không thêm dấu ; cuối mỗi dòng
  singleQuote: false, // Không dùng dấu '' mà dùng dấu "" Dòng này điều chỉnh quy tắc quote trong JavaScript
  singleAttributePerline: true, // Với JSX, nếu có nhiều props, thì mỗi prop nằm trên một dòng. Mỗi thuộc tính chỉ nằm 1 hàng
  plugin: ["prettier-plugin-tailwindcss"], // Kích hoạt plugin prettier-plugin-tailwindcss để tự động sắp xếp class Tailwind theo đúng chuẩn.
};
