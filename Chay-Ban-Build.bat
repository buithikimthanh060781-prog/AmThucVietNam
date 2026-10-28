@echo off
chcp 65001 > nul
title Tinh Hoa Ẩm Thực Việt Nam - Bản Build Hoàn Chỉnh
cd /d "%~dp0"

echo ===================================================================
echo     ĐANG KHỞI CHẠY BẢN BUILD SẢN PHẨM HOÀN CHỈNH (PORT 4173)
echo ===================================================================
echo.
echo  Đang tự động mở trình duyệt: http://localhost:4173/
echo.

start "" "http://localhost:4173/"

call npx.cmd vite preview --port 4173
pause
