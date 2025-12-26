Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('D:\Projects\portfolio\src\assets\Telos_moon2_white.png')
$newImg = New-Object System.Drawing.Bitmap 32, 32
$graphics = [System.Drawing.Graphics]::FromImage($newImg)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.DrawImage($img, 0, 0, 32, 32)
$newImg.Save('D:\Projects\TELOS\cursor.png', [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$newImg.Dispose()
$img.Dispose()
Write-Host "Cursor resized to 32x32"
