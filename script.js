const surfaceSelect = document.getElementById('surface-select');
const floor = document.getElementById('surface-floor');
const runBtn = document.getElementById('run-btn');
const resetBtn = document.getElementById('reset-btn');
const assembly = document.getElementById('pull-assembly');
const forceLabel = document.getElementById('display-force');
const surfaceLabel = document.getElementById('display-surface');
const scaleLabel = document.getElementById('scale-label');

// Fixed values for each surface
const frictionValues = {
    wood: { force: 2.5, class: 'texture-wood' },
    metal: { force: 1.1, class: 'texture-metal' },
    sandpaper: { force: 7.8, class: 'texture-sandpaper' },
    carpet: { force: 4.3, class: 'texture-carpet' }
};

surfaceSelect.addEventListener('change', () => {
    resetSim();
    const data = frictionValues[surfaceSelect.value];
    floor.className = data.class;
    surfaceLabel.innerText = surfaceSelect.value;
});

runBtn.addEventListener('click', () => {
    const data = frictionValues[surfaceSelect.value];
    
    // Update the label on the spring balance
    scaleLabel.innerText = data.force + "N";

    // Move the whole group across the screen
    setTimeout(() => {
        assembly.style.transform = 'translateX(400px)';
        forceLabel.innerText = data.force;
    }, 200);
});

resetBtn.addEventListener('click', resetSim);

function resetSim() {
    assembly.style.transform = 'translateX(0px)';
    forceLabel.innerText = '0';
    scaleLabel.innerText = '0N';
}

// Initial state setup
floor.className = 'texture-wood';
