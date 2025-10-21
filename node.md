-- duyệt đơn hàng phải refetch

CV
Frontend
-- Responsive UI với TailwindCSS, hiển thị tương thích trên mọi thiết bị.
-- React-query: cache thông minh,
-- Auth Flow login register với Clerk: + Xác thực email. + Google
-- Form an toàn, validate với React Hook Form + zod

Backend(MongoDB)
-- CRUD đầy đủ: Người dùng, đơn hàng, khoá học, mã giảm giá, đánh giá, bình luận.
-- Quản lí: Thành viên, Khoá học, Mã giảm giá, đánh giá, bình luận
-- API chuẩn REST: hỗ trợ phân trang, lọc, sort, limit, field, select.

Tech Stack:
-- Frondend: Nextjs, Shadcn, TailwindCSS, React Query, Zustand, React Hook Form, Zod.
-- Backend: MongoDB, Clerk Auth.

\*\* Flow chức năng tìm kiếm khoá học (Header)
Người dùng nhập từ khóa vào ô search:
-- Khi người dùng nhập, hệ thống sẽ hiển thị một danh sách gợi ý (dropdown) các khoá học phù hợp với từ khóa đó.
-- Người dùng chọn một khoá học từ danh sách gợi ý:
-- Tên khoá học được chọn sẽ được tự động điền vào ô input.
-- Sau đó, hệ thống sẽ chuyển hướng sang trang “Khám phá”, đồng thời hiển thị chi tiết khoá học đã được chọn.
-- Người dùng nhấn vào icon tìm kiếm (hoặc nhấn Enter):
-- Nếu nhấn mà không chọn khoá học cụ thể trong gợi ý, hệ thống sẽ chuyển hướng sang trang “Khám phá”.
-- Tại trang “Khám phá”, hệ thống sẽ hiển thị tất cả các khoá học phù hợp với từ khóa đã nhập.

“Hãy viết code cho tôi chức năng search khoá học ở header bằng Next.js + Tailwind CSS với các yêu cầu sau:
-- Khi người dùng nhập text vào input search, hiển thị dropdown gợi ý khoá học dựa trên từ khóa.
-- Dropdown hiển thị danh sách khoá học phù hợp.
-- Khi người dùng nhấn vào một khoá học trong danh sách:
-- Tên khoá học được điền vào input
-- Chuyển hướng sang trang /explore và hiển thị khoá học đã chọn
-- Khi người dùng nhấn icon search hoặc Enter:
-- Chuyển sang trang /explore
-- Hiển thị tất cả các khoá học phù hợp với từ khóa đang nhập
-- Dropdown và input cần responsive, đẹp mắt bằng Tailwind.”
