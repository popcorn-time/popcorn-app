@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\tiny-lr\bin\tiny-lr" %*
) ELSE (
  node  "%~dp0\..\tiny-lr\bin\tiny-lr" %*
)