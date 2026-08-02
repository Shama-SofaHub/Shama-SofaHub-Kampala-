/* =========================================================
   LUXURY WATCH ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // DOM Elements
    const hourHand = document.getElementById("hourHand");
    const minuteHand = document.getElementById("minuteHand");
    const secondHand = document.getElementById("secondHand");
    const subdialSecondHand = document.getElementById("subdialSecondHand");
    
    const lcdMain = document.getElementById("lcdMain");
    const lcdDay = document.getElementById("lcdDay");
    const lcdDate = document.getElementById("lcdDate");
    const modeIndicator = document.getElementById("modeIndicator");
    const formatIndicator = document.getElementById("formatIndicator");
    const digitalWindow = document.getElementById("digitalWindow");
    const watchCase = document.getElementById("watchCase");

    // Controls
    const topPusher = document.getElementById("topPusher");
    const mainCrown = document.getElementById("mainCrown");
    const bottomPusher = document.getElementById("bottomPusher");

    const btnTheme = document.getElementById("btnTheme");
    const btnBacklight = document.getElementById("btnBacklight");
    const btnMode = document.getElementById("btnMode");
    const btnFormat = document.getElementById("btnFormat");

    // State Variables
    let is24Hour = true;
    let currentMode = 0; // 0: TIME, 1: DATE, 2: STOPWATCH
    let isBacklightOn = false;
    let currentTheme = 0;

    // Stopwatch State
    let swInterval = null;
    let swElapsedTime = 0;
    let swIsRunning = false;

    const themes = ["", "theme-steel", "theme-emerald"];
    const modes = ["TIME", "DATE", "STOPWATCH"];
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    /* Real-Time Clock Engine */
    function updateClock() {
        const now = new Date();

        const ms = now.getMilliseconds();
        const seconds = now.getSeconds() + ms / 1000;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = (now.getHours() % 12) + minutes / 60;

        // Rotation angles
        const secondDeg = seconds * 6;
        const minuteDeg = minutes * 6;
        const hourDeg = hours * 30;

        secondHand.style.transform = `rotate(${secondDeg}deg)`;
        subdialSecondHand.style.transform = `rotate(${secondDeg}deg)`;
        minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
        hourHand.style.transform = `rotate(${hourDeg}deg)`;

        // Digital Readout
        if (currentMode === 0) { // TIME
            let h = now.getHours();
            let m = now.getMinutes();
            let s = Math.floor(seconds);

            let period = "";
            if (!is24Hour) {
                period = h >= 12 ? " PM" : " AM";
                h = h % 12 || 12;
            }

            lcdMain.textContent = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}${period}`;
            formatIndicator.textContent = is24Hour ? "24H" : "12H";
        } else if (currentMode === 1) { // DATE
            lcdMain.textContent = `${String(now.getDate()).padStart(2, "0")} ${months[now.getMonth()]}`;
            formatIndicator.textContent = String(now.getFullYear());
        }

        lcdDay.textContent = days[now.getDay()];
        lcdDate.textContent = `${String(now.getDate()).padStart(2, "0")} ${months[now.getMonth()]} ${now.getFullYear()}`;

        requestAnimationFrame(updateClock);
    }

    /* Stopwatch Functions */
    function updateStopwatchDisplay() {
        const totalMs = swElapsedTime;
        const mins = Math.floor(totalMs / 60000);
        const secs = Math.floor((totalMs % 60000) / 1000);
        const hundredths = Math.floor((totalMs % 1000) / 10);

        lcdMain.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(hundredths).padStart(2, "0")}`;
    }

    function toggleStopwatch() {
        if (!swIsRunning) {
            swIsRunning = true;
            formatIndicator.textContent = "RUN";
            const startTime = Date.now() - swElapsedTime;
            swInterval = setInterval(() => {
                swElapsedTime = Date.now() - startTime;
                updateStopwatchDisplay();
            }, 10);
        } else {
            swIsRunning = false;
            formatIndicator.textContent = "PAUSE";
            clearInterval(swInterval);
        }
    }

    function resetStopwatch() {
        swIsRunning = false;
        clearInterval(swInterval);
        swElapsedTime = 0;
        formatIndicator.textContent = "RST";
        updateStopwatchDisplay();
    }

    /* Event Actions */
    function cycleTheme() {
        currentTheme = (currentTheme + 1) % themes.length;
        watchCase.className = "watch-case " + themes[currentTheme];
    }

    function toggleBacklight() {
        isBacklightOn = !isBacklightOn;
        digitalWindow.classList.toggle("backlight-active", isBacklightOn);
    }

    function cycleMode() {
        currentMode = (currentMode + 1) % modes.length;
        modeIndicator.textContent = modes[currentMode];

        if (currentMode === 2) {
            formatIndicator.textContent = swIsRunning ? "RUN" : (swElapsedTime > 0 ? "PAUSE" : "STW");
            updateStopwatchDisplay();
        }
    }

    function toggleFormat() {
        if (currentMode === 2) {
            resetStopwatch();
        } else {
            is24Hour = !is24Hour;
        }
    }

    // Attach Listeners
    topPusher.addEventListener("click", toggleBacklight);
    mainCrown.addEventListener("click", cycleTheme);
    bottomPusher.addEventListener("click", () => {
        if (currentMode === 2) toggleStopwatch();
        else cycleMode();
    });

    btnTheme.addEventListener("click", cycleTheme);
    btnBacklight.addEventListener("click", toggleBacklight);
    btnMode.addEventListener("click", cycleMode);
    btnFormat.addEventListener("click", toggleFormat);

    requestAnimationFrame(updateClock);
});