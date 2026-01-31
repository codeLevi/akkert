@echo off
setlocal

if not exist web mkdir web

for %%f in (*.jpg *.jpeg *.JPG *.JPEG) do (
  magick "%%f" -auto-orient -resize 1600x1600^ -gravity center -extent 1600x1600 -quality 80 -strip "web\%%~nf.webp"
)

echo KESZ
pause
