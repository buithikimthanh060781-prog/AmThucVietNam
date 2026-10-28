@echo off
chcp 65001 > nul
title Tinh Hoa Ẩm Thực Việt Nam
cd /d "%~dp0"

echo ===================================================================
echo     CHÀO MỪNG BẠN ĐẾN VỚI WEBSITE TINH HOA ẨM THỰC VIỆT NAM
echo ===================================================================
echo.
echo  [1/2] Đang khởi động máy chủ Web nội bộ...
echo  [2/2] Đang tự động mở trình duyệt tại: http://localhost:5173/
echo.
echo  (Lưu ý: Giữ cửa sổ này mở trong khi bạn đang xem trang web)
echo ===================================================================
echo.

start "" "http://localhost:5173/"

call npm.cmd run dev
pause
