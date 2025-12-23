const surfaceSelect = document.getElementById('surface-select');
const floor = document.getElementById('surface-floor');
const runBtn = document.getElementById('run-btn');
const resetBtn = document.getElementById('reset-btn');
const assembly = document.getElementById('pull-assembly');
const spring = document.getElementById('spring-balance');
const forceLabel = document.getElementById('display-force');
const surfaceLabel = document.getElementById('display-surface');
const scaleLabel = document.getElementById('scale-label');

const frictionValues = {
    wood: { force: 2.2, class: 'texture-wood' },
    metal: { force: 0.9, class: 'texture-metal' },
    carpet: { force: 4.8, class: 'texture-carpet' },
    sandpaper: { force: 7.5, class: 'texture-sandpaper' }
};

surfaceSelect.addEventListener('change', () => {
    resetSim();
    const data = frictionValues[surfaceSelect.value];
    floor.className = data.class;
    surfaceLabel.innerText = surfaceSelect.value;
});

runBtn.addEventListener('click', () => {
    const data = frictionValues[surfaceSelect.value];
    
    // Calculate new width: Base (80px) + Force-stretch
    const stretch = 80 + (data.force * 18);
    
    // Apply visual stretch
    spring.style.width = stretch + 'px';
    scaleLabel.innerText = data.force + 'N';

    // Move the whole assembly after it "tensions" up
    setTimeout(() => {
        assembly.style.transform = 'translateX(380px)';
        forceLabel.innerText = data.force;
    }, 400);
});

resetBtn.addEventListener('click', resetSim);

function resetSim() {
    assembly.style.transform = 'translateX(0px)';
    spring.style.width = '80px';
    forceLabel.innerText = '0';
    scaleLabel.innerText = '0N';
}

// Set initial view
floor.className = 'texture-wood';
