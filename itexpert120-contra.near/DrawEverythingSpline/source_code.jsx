const src = `
<!DOCTYPE html>    
<html>
    <head>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"></script>
        <script type="module" src="https://unpkg.com/@splinetool/viewer@0.9.494/build/spline-viewer.js"></script>
    </head>
    <body>
        <spline-viewer loading-anim url="https://prod.spline.design/MpE5RJFHrwXFhpgQ/scene.splinecode"></spline-viewer>
    </body>
</html>
`;

return <iframe srcDoc={src} iframeResizer />;
