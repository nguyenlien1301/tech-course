# Tổng quan khóa học

## Công nghệ

- NextJs14
- Typescript
- TailwindCSS
- Shadcn
- Zustand
- React hook form
- Zod
- Lodash
- Mongoose - Mongodb
- Clerk
- Webhook
- Vercel
- Git Github
- ....

## Tài khoản và phần mềm

- NodeJS: https://nodejs.org/en
- Vercel account: https://vercel.com/signup
- Github account: https://github.com/join/
- MongoDB: https://www.mongodb.com/cloud/atlas/register
- MongoDB Compass: https://www.mongodb.com/try/download/compass
- Uploadthing: https://uploadthing.com/
- Clerk: https://dashboard.clerk.com/sign-up
- TinyMCE: https://www.tiny.cloud/auth/signup/

## Concept

- Styling
- Optimizations
- Routing
- Data Fetching
- Search and Pagination
- Mutating Data
- Error Handling
- Form Validation and Accessibility
- Authentication
- Metadata

## Kết quả

- Làm được 1 Web App E-Learning
- Và có thể làm được nhiều web app tương tự sau khi học xong
- UI UX: Để tự có thể làm 1 web app đẹp

# Cài đặt dự án

# Cấu trúc dự án

## Các chức năng

# Trang:

- Khám phá:
- Khu vực học tập:
- Quản lí khoá học:
- Quản lí thành viên:
- Quản lí đơn hàng:
- Quản lí bình luận:

# Chức năng:

- Thêm sửa xoá cập nhật khoá học.
- Trang tạo khoá học: /manage/course/new
- Trang cập nhật khoá học: /manage/course/update?slug=khoa-hoc-nextjs
- Trang xem khoá học chi tiết: /course/khoa-hoc-nextjs
- Trang cập nhật nội dung khoá học (lecture, lesson): /manage/course/update-content?slug=khoa-hoc-nextjs

- Sử lí coupon:
  Vấn đề trong việc sử lí mã giảm giá khoá học
  - Check mã code có đúng với khoá học tương ứng không.
  - Check xem mã coupon đó có đang hoạt động hay không (tức admin có kích hoạt code đó cho ng dùng sử dụng hay chưa).
  - Check xem số lượng coupon đó đc user sử dụng nếu đã lớn hơn hoặc bằng số lượng admin cho phép thì out.
  - Check ngày bắt đầu, check xem ngày bắt đầu cho phép sử dụng coupon phải lớn hơn ngày hiện tại. (VD: ngày cho phép dùng là 20/08/2025 mà hiện tại là 19/08/2025 thì sẽ ko đc dùng).
  - Check ngày kết thúc, check xem ngày kết thúc phải nhỏ hơn ngày hiện tại (VD: ngày kết thúc sử dụng coupon đó là 30/08/2025 nhưng ngày hiện tại là ngày 01/09/2025 thì ko đc vì nó đã hết hạn).
  - Trường hợp nhập mã giảm giá đã nhấn áp dụng 1 lần thì nhấn lần thữ 2 sẽ dừng chương trình, nhưng khi áp dụng một mã khác vào thì giá phải reset lại (VD: giá gốc 499,000 nhập code: NEXTJS10 <=> 100,000 => thì giảm còn 399,000. Nhưng khi gắn code khác vào NEXTJS20 <=> 200,000 thì reset giá lại phải còn 299,000. Còn 199,000 là sai).
