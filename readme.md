
# Cài đặt

> npm i 

và 

> bower update 

# Chạy dự án 

> npm start

# Cấu hình

- Xem file `config.json`
- Xem các files trong thư mục `tasks`

# Tạo Favicon

https://www.favicon-generator.org/

# Cấu hình pug, sass, js tại folder src

# Hướng dẫn
- Chỉ cần thay đổi đường dẫn thì web sẽ tự up api lên azure
- Kết quả các Face ID sẽ được trả về trong phần ID khuôn mặt nhận được
- Để thao tác so sánh 2 khuôn mặt, hay 2 faceID với nhau:
	- Sao chép 1 trong các Face ID nhận được trong phần 2 để tự động gửi api face to face
	- Kết quả sai nếu 2 faceid đó không phải của cùng 1 người
	* Lưu ý rằng, kết quả không hoàn toàn chính xác do sự so sánh này chỉ trong 1 lần duy nhất qua faceid và không có học