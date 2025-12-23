const surfaceSelect = document.getElementById('surface-select');
const floor = document.getElementById('surface-floor');
const runBtn = document.getElementById('run-btn');
const resetBtn = document.getElementById('reset-btn');
const animationBox = document.getElementById('animation-container');
const spring = document.getElementById('spring');
const forceLabel = document.getElementById('display-force');
const surfaceLabel = document.getElementById('display-surface');
const scaleLabel = document.getElementById('scale-label');

// Friction data (Force in Newtons)
const frictionData = {
    wood: { force: 2.5, class: 'texture-wood', name: 'Wood' },
    metal: { force: 1.2, class: 'texture-metal', name: 'Metal' },
    sandpaper: { force: 5.8, class: 'texture-sandpaper', name: 'Sandpaper' },
    carpet: { force: 4.2, class: 'texture-carpet', name: 'Carpet' }
};

// Update visual when surface changes
surfaceSelect.addEventListener('change', () => {
    resetSim();
    const selection = frictionData[surfaceSelect.value];
    floor.className = selection.class;
    surfaceLabel.innerText = selection.name;
});

runBtn.addEventListener('click', () => {
    const selection = frictionData[surfaceSelect.value];
    const forceValue = selection.force;

    // 1. Stretch the spring relative to force
    const stretchWidth = 100 + (forceValue * 15); 
    spring.style.width = stretchWidth + 'px';
    scaleLabel.innerText = forceValue + 'N';

    // 2. Move the whole assembly
    setTimeout(() => {
        animationBox.style.transform = 'translateX(400px)';
        forceLabel.innerText = forceValue;
    }, 300);
});

resetBtn.addEventListener('click', resetSim);

function resetSim() {
    animationBox.style.transform = 'translateX(0px)';
    spring.style.width = '100px';
    forceLabel.innerText = '0';
    scaleLabel.innerText = '0N';
}

// Set initial state
floor.className = 'texture-wood';
