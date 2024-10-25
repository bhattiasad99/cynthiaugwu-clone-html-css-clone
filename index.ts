const cursor = document.getElementById('cursor') as HTMLElement;

// current cursor position
const mouse = {
    x: 0,
    y: 0
}

// previous cursor position on each frame
const previousMousePosition = {
    x: 0,
    y: 0
}

// Current circle position
const circle = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (e: MouseEvent) => {
    mouse.x = e.x;
    mouse.y = e.y;
})

const cursorSpeed = 0.17;
let currentScale = 0;

const moveCursor = () => {
    circle.x = circle.x + ((mouse.x - circle.x) * cursorSpeed);
    circle.y = circle.y + ((mouse.y - circle.y) * cursorSpeed);

    const mouseXDistanceCovered = mouse.x - previousMousePosition.x;
    const mouseYDistanceCovered = mouse.y - previousMousePosition.y;

    // pythagoras theorem
    const distanceBetweenXAndY = (Math.sqrt((mouseXDistanceCovered ** 2) + (mouseYDistanceCovered ** 2)) * 4);
    const maxMouseVelocity = 150;
    let mouseVelocity = 0;
    if (distanceBetweenXAndY <= maxMouseVelocity) {
        mouseVelocity = distanceBetweenXAndY;
    } else {
        mouseVelocity = maxMouseVelocity;
    }

    // convert the velocity into range 0, 0.5 (we need this because 0.5 is maximum bend and 0 is minimum bend. The more velocity the more bend)

    const maxRange = 0.5;

    // use ratio proportion
    // lets say our mouseVelocity is 75. Our max velocity is 150. Now we know that max velocity will be mapped to 0 and its direct proportion so:
    // 150 -> 0.5
    // 75 -> x
    const scaleValue = (mouseVelocity * maxRange) / maxMouseVelocity;

    // to SMOOTHEN this, we use the currentScale variable. We want the acceleration to take place. 
    currentScale += (scaleValue - currentScale) * cursorSpeed;

    // ROTATE
    const angle = Math.atan2(mouseYDistanceCovered, mouseXDistanceCovered) * 180 / Math.PI;

    previousMousePosition.x = mouse.x;
    previousMousePosition.y = mouse.y;

    const translation = `translateX(${circle.x}px) translateY(${circle.y}px)`
    const scale = `scale(${1 + currentScale}, ${1 - currentScale})`;
    const rotate = `rotate(${angle}deg)`

    const transformationString = `${translation} ${rotate} ${scale}`

    cursor.style.transform = transformationString;
    window.requestAnimationFrame(moveCursor);
}

moveCursor();