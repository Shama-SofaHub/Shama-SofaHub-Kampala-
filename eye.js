/* =========================================================
   REALISTIC EYE INTERACTION & BLINK ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const eyeSocket = document.getElementById("eyeSocket");
    const iris = document.getElementById("iris");

    let tapTimer = null;
    let tapCount = 0;
    let isOpen = true;
    let isBlinking = false;

    /* --------------------------------------------------
       1. TAP DETECTION (Single vs Double Tap Handler)
    -------------------------------------------------- */
    eyeSocket.addEventListener("click", (e) => {
        tapCount++;

        if (tapCount === 1) {
            tapTimer = setTimeout(() => {
                // SINGLE TAP DETECTED -> TOGGLE OPEN / CLOSE
                if (!isBlinking) {
                    toggleEye();
                }
                tapCount = 0;
            }, 250); // Delay allows double-tap window
        } else if (tapCount === 2) {
            // DOUBLE TAP DETECTED -> BLINK
            clearTimeout(tapTimer);
            tapCount = 0;
            triggerBlink();
        }
    });

    /* --------------------------------------------------
       2. EYE STATE TOGGLE (Open / Close)
    -------------------------------------------------- */
    function toggleEye() {
        isOpen = !isOpen;
        if (isOpen) {
            eyeSocket.classList.remove("is-closed");
        } else {
            eyeSocket.classList.add("is-closed");
        }
    }

    /* --------------------------------------------------
       3. BLINK ANIMATION
    -------------------------------------------------- */
    function triggerBlink() {
        if (isBlinking) return;
        isBlinking = true;

        const wasClosed = eyeSocket.classList.contains("is-closed");

        if (wasClosed) {
            // If closed: Quickly open and shut
            eyeSocket.classList.remove("is-closed");
            setTimeout(() => {
                eyeSocket.classList.add("is-closed");
                isBlinking = false;
            }, 180);
        } else {
            // If open: Quickly shut and open
            eyeSocket.classList.add("is-closed");
            setTimeout(() => {
                eyeSocket.classList.remove("is-closed");
                isBlinking = false;
            }, 180);
        }
    }

    /* --------------------------------------------------
       4. CURSOR & TOUCH TRACKING (Pupil Saccade)
    -------------------------------------------------- */
    function trackTarget(clientX, clientY) {
        if (!isOpen) return;

        const rect = eyeSocket.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const deltaX = clientX - eyeCenterX;
        const deltaY = clientY - eyeCenterY;

        // Calculate distance offset (constrained range)
        const distance = Math.min(25, Math.hypot(deltaX, deltaY) / 12);
        const angle = Math.atan2(deltaY, deltaX);

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        iris.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }

    window.addEventListener("mousemove", (e) => {
        trackTarget(e.clientX, e.clientY);
    });

    window.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            trackTarget(e.touches[0].clientX, e.touches[0].clientY);
        }
    });
});