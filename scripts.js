async function generateColors() {
    const url = 'https://www.thecolorapi.com/random?format=json';

    try {
        const colorsData = await Promise.all([fetch(url), fetch(url), fetch(url)]);
        const colors = await Promise.all(colorsData.map(response => response.json()));
        
        displayColors(colors);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayColors(colors) {
    const colorCards = document.getElementById('colorCards');
    colorCards.innerHTML = '';

    colors.forEach((data, index) => {
        const color = {
            name: `Color ${index + 1}`,
            hex: data.hex.value,
            rgb: data.rgb.value,
            cmyk: data.cmyk.value
        };

        const card = `
            <div class="card">
                <div class="color-box" style="background-color: ${color.hex};"></div>
                <div class="color-info">
                    <p>Name: ${color.name}</p>
                    <p>Hex: ${color.hex}</p>
                    <p>RGB: ${color.rgb}</p>
                    <p>CMYK: ${color.cmyk}</p>
                </div>
            </div>
        `;
        colorCards.innerHTML += card;
    });
}
