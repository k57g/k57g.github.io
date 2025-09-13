document.addEventListener('DOMContentLoaded', function() {
    const catGifs = [
        'cat1.gif',
        'cat2.gif',
        'cat3.gif',
        'cat4.gif',
        'cat5.gif',
        'cat6.gif',
        'cat7.gif',
        'cat8.gif',
        'cat9.gif',
        'cat10.gif'
    ];

    const cats = [];
    const catWidth = 300;
    const catHeight = 150;
    const pageStart = 24700;

    function getRandomCatGif() {
        const randomIndex = Math.floor(Math.random() * catGifs.length);
        return catGifs[randomIndex];
    }

    for (let i = 0; i < 70; i++) {
        const cat = document.createElement('div');
        cat.className = 'bouncing-cat';
        cat.style.backgroundImage = `url('${getRandomCatGif()}')`;

        const startX = Math.random() * (window.innerWidth - catWidth);
        const startY = Math.random() * (window.innerHeight - catHeight);

        const speedX = (Math.random() * 4 + 1) * (Math.random() > 0.5 ? 1 : -1);
        const speedY = (Math.random() * 4 + 1) * (Math.random() > 0.5 ? 1 : -1);

        cat.style.left = startX + 'px';
        cat.style.top = startY + 'px';

        document.body.appendChild(cat);

        cats.push({
            element: cat,
            x: startX,
            y: startY + pageStart,
            speedX: speedX,
            speedY: speedY,
            width: catWidth,
            height: catHeight - pageStart,
            hasBounced: false
        });
    }

    function animate() {
        for (const cat of cats) {
            cat.x += cat.speedX;
            cat.y += cat.speedY;
            cat.hasBounced = false;

            if (cat.x <= 0) {
                cat.x = 0;
                cat.speedX = Math.abs(cat.speedX);
                cat.hasBounced = true;
            } else if (cat.x + cat.width >= window.innerWidth) {
                cat.x = window.innerWidth - cat.width;
                cat.speedX = -Math.abs(cat.speedX);
                cat.hasBounced = true;
            }

            if (cat.y <= pageStart) {
                cat.y = pageStart;
                cat.speedY = Math.abs(cat.speedY);
                cat.hasBounced = true;
            } else if (cat.y + cat.height >= window.innerHeight) {
                cat.y = window.innerHeight - cat.height;
                cat.speedY = -Math.abs(cat.speedY);
                cat.hasBounced = true;
            }

            if (cat.hasBounced) {
                cat.element.style.backgroundImage = `url('${getRandomCatGif()}')`;
            }

            cat.element.style.left = cat.x + 'px';
            cat.element.style.top = cat.y + 'px';
        }

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', function() {
        for (const cat of cats) {
            if (cat.x + cat.width > window.innerWidth) {
                cat.x = window.innerWidth - cat.width;
            }
            if (cat.y + cat.height > window.innerHeight) {
                cat.y = window.innerHeight - cat.height;
            }
        }
    });
});
