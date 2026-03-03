/**
 * SCRIPT MODE KIOSQUE
 * Gère le mode plein écran au clic droit, désactive le zoom et bloque les outils de développement.
 */

document.addEventListener("DOMContentLoaded", () => {
    // Désactiver le zoom par pincement (Mobile)
    document.addEventListener('touchmove', function (event) {
        if (event.scale !== 1) { event.preventDefault(); }
    }, { passive: false });

    // Désactiver le zoom par double appui (Mobile)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Désactiver le zoom Ctrl+Molette (Bureau)
    document.addEventListener('wheel', function (e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }, { passive: false });
});

// Clic droit pour basculer en plein écran
document.addEventListener("contextmenu", e => {
    e.preventDefault();
    toggleFullScreen();
}, false);

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

document.addEventListener("keydown", e => {
    // BLOQUER LES TOUCHES DE ZOOM (Ctrl + / Ctrl - / Ctrl 0)
    if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0' || e.key === '=' || e.keyCode === 187 || e.keyCode === 189)) {
        e.preventDefault();
        return;
    }

    // DÉSACTIVER F12 et les autres touches de développement (Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
    if (e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
        (e.ctrlKey && e.keyCode === 85)) {
        e.stopPropagation();
        e.preventDefault();
    }
});
