document.addEventListener('DOMContentLoaded', () => {
    const materialSelect = document.getElementById('material-select');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const resetButton = document.getElementById('reset-button');
    const surfaceFloor = document.getElementById('surface-floor');
    const pullingAssembly = document.getElementById('pulling-assembly');
    const forceFill = document.getElementById('force-fill');
    const forceOutput = document.getElementById('force-output');

    // Friction coefficients (Mu)
    const frictionData = {
        plastic: 0.12,
        metal: 0.25,
        carpet: 0.50,
        sandpaper: 0.85
    };

    const MASS = 1.0; // 1 kg box
    const GRAVITY = 9.8;

    let moveTimeout;

    function update() {
        const material = materialSelect.value;
        surfaceFloor.className = 'mat-' + material;
        
        // F = mu * m * g
        const force = frictionData[material] * MASS * GRAVITY;
        forceOutput.textContent = force.toFixed(2);
        
        reset();
    }

    function start() {
        const material = materialSelect.value;
        const mu = frictionData[material];
        
        startButton.disabled = true;
        stopButton.disabled = false;
        materialSelect.disabled = true;

        // Fill the gauge to represent tension
        forceFill.style.width = (mu * 100) + '%';

        // Wait for gauge to fill, then slide
        moveTimeout = setTimeout(() => {
            // Speed of slide depends on friction
            const duration = 2 + (mu * 3);
            pullingAssembly.style.transition = `left ${duration}s linear`;
            pullingAssembly.style.left = '450px';
        }, 500);
    }

    function stop() {
        clearTimeout(moveTimeout);
        const currentPos = window.getComputedStyle(pullingAssembly).left;
        pullingAssembly.style.transition = 'none';
        pullingAssembly.style.left = currentPos;

        startButton.disabled = false;
        stopButton.disabled = true;
    }

    function reset() {
        clearTimeout(moveTimeout);
        pullingAssembly.style.transition = 'none';
        pullingAssembly.style.left = '20px';
        forceFill.style.width = '0%';
        
        startButton.disabled = false;
        stopButton.disabled = true;
        materialSelect.disabled = false;
    }

    materialSelect.addEventListener('change', update);
    startButton.addEventListener('click', start);
    stopButton.addEventListener('click', stop);
    resetButton.addEventListener('click', reset);

    // Initial run
    update();
});
