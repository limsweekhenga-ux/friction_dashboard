document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const surfaceSelect = document.getElementById('surface-select');
    const surfaceDisplay = document.getElementById('surface-display');
    const muDisplay = document.getElementById('mu-display');
    const forceDisplay = document.getElementById('force-display');
    const forceCalcDisplay = document.getElementById('force-calc-display');

    // Physics Constants and Variables
    const MASS_BLOCK = 0.5; // kg
    const GRAVITY = 9.81; // m/s^2 (approximates Normal Force N = mg)
    
    // F_pull = F_friction = mu_k * N
    // F_pull = mu_k * m * g
    
    // Friction Coefficients (Example/Approximate values for kinetic friction mu_k)
    // Source: Common physics textbook examples
    const frictionCoefficients = {
        plastic: 0.1,    // Low friction
        metal: 0.25,     // Medium-low friction
        sandpaper: 0.5,  // Medium-high friction
        carpet: 0.8      // High friction
    };

    /**
     * Calculates the required pulling force and updates the dashboard displays.
     * @param {string} surfaceKey - The key corresponding to the selected surface.
     */
    function updateSimulation(surfaceKey) {
        // 1. Get the coefficient of kinetic friction (mu_k)
        const mu_k = frictionCoefficients[surfaceKey];

        // 2. Calculate the required pulling force (F_pull) to overcome friction
        // We assume constant velocity (F_pull = F_friction)
        const forcePull = mu_k * MASS_BLOCK * GRAVITY;

        // 3. Update Visuals
        // Clear existing surface classes and add the new one
        surfaceDisplay.className = '';
        surfaceDisplay.classList.add(surfaceKey);

        // 4. Update Data Output
        muDisplay.textContent = mu_k.toFixed(2);
        
        // Update Spring Balance Reading (simulated reading)
        forceDisplay.textContent = forcePull.toFixed(2);
        
        // Update Calculated Force Display
        forceCalcDisplay.textContent = forcePull.toFixed(2) + ' N';
    }

    // Event Listener for the surface selection dropdown
    surfaceSelect.addEventListener('change', (event) => {
        updateSimulation(event.target.value);
    });

    // Initialize the simulation with the default surface (plastic)
    updateSimulation(surfaceSelect.value);
});