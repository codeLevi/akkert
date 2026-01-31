@echo off
setlocal EnableDelayedExpansion

set i=1

for %%f in (*.jpg) do (
  set num=0!i!
  ren "%%f" "!num:~-2!.jpg"
  set /a i+=1
)

echo.
echo Kesz. %i% fajl ujraszamozva.
pause
