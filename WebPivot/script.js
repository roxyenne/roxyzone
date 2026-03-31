document.addEventListener("DOMContentLoaded", function() {
    let stabilizerintense = 8
    const canvas = new fabric.Canvas('animation', {
        width: 500,
        height: 500,
        isDrawingMode: true
    });

    // Initialize Brush
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.color = '#000000';
    canvas.freeDrawingBrush.width = 10;

    // --- Mode Switching Functions ---

    function setSelectionMode() {
        canvas.isDrawingMode = false;
        canvas.defaultCursor = 'default';
    }

    function setDrawingMode(stabilized = false) {
        canvas.isDrawingMode = true;
        // Decimate 0 = raw input; higher = smoother/stabilized
        canvas.freeDrawingBrush.decimate = stabilized ? stabilizerintense : 0; 
    }

    // --- Button Event Listeners ---

    document.getElementById('btn-select').addEventListener('click', setSelectionMode);
    document.getElementById('btn-draw').addEventListener('click', () => setDrawingMode(false));
    document.getElementById('btn-stabilize').addEventListener('click', () => setDrawingMode(true));

    // Keyboard Shortcuts (updated to use functions)
    window.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();
        if (key === 's') setSelectionMode();
        if (key === 'd') setDrawingMode(false);
    });

    // --- Existing Path & Download Logic ---

    canvas.on('path:created', (options) => {
        options.path.set({
            borderColor: 'blue',
            cornerColor: 'green',
            cornerSize: 10,
            transparentCorners: false,
            selectable: true
        });
    });

    document.getElementById('btn-download').addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'my-canvas.png';
        link.href = dataURL;
        link.click();
    });
    // Example: Dynamically updating background color
const colorPicker = document.getElementById("brushcolor");
colorPicker.addEventListener("input", (e) => {
    canvas.freeDrawingBrush.color = e.target.value;
});

const stabilizerPicker = document.getElementById("stabilizerintensity");
colorPicker.addEventListener("input", (e) => {
    stabilizerintense = e.target.value;
});

});
