document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('surface-selector');
    const startBtn = document.getElementById('btn-start');
    const stopBtn = document.getElementById('btn-stop');
    const resetBtn = document.getElementById('btn-reset');
    const ground = document.getElementById('ground-surface');
    const assembly = document.getElementById('moving-parts');
    const gauge = document.getElementById('red-gauge');
    const display = document.getElementById('force-display');

    const frictionMap = {
        plastic: 0.2,
        metal: 0.3,
        carpet: 0.6,
        sandpaper: 0.9
    };

    function refresh() {
        const mat = selector.value;
        ground.className = 'bg-' + mat;
        
        // Calculation
        const force = frictionMap[mat] * 10; 
        display.textContent = force.toFixed(2);
        
        // Reset position
        assembly.style.transition = "none";
        assembly.style.left = "20px";
        gauge.style.width = "0%";
        
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }

    startBtn.onclick = () => {
        const mu = frictionMap[selector.value];
        startBtn.disabled = true;
        stopBtn.disabled = false;

        // 1. Pull the gauge
        gauge.style.width = (mu * 100) + "%";

        // 2. Slide
        setTimeout(() => {
            const time = 2 + (mu * 2);
            assembly.style.transition = `left ${time}s linear`;
            assembly.style.left = "350px";
        }, 500);
    };

    stopBtn.onclick = () => {
        const currentLeft = window.getComputedStyle(assembly).left;
        assembly.style.transition = "none";
        assembly.style.left = currentLeft;
        stopBtn.disabled = true;
        startBtn.disabled = false;
    };

    resetBtn.onclick = refresh;
    selector.onchange = refresh;

    refresh(); // Run once on load
});
