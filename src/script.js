// src/script.js
function goToPreviousTest() {
    const urlParams = new URLSearchParams(window.location.search);
    let testId = parseInt(urlParams.get('test-id'));
    if(testId == 1 ) {
        return;
    }
    testId -= 1;
    window.location.href = `test.html?test-id=${testId}`;
}

function goToNextTest() {
    const urlParams = new URLSearchParams(window.location.search);
    let testId = parseInt(urlParams.get('test-id'));
    if(testId == 15 ) {
        return;
    }
    testId += 1
    window.location.href = `test.html?test-id=${testId}`;
}


function loadTest(testId) {
    console.log(`Loading test with ID: ${testId}`);
    document.querySelector('.audio-player h3').textContent = `Test ${testId}`;
    const audioSource = document.querySelector('.audio-player audio source');
    audioSource.src = `../audio/part_1_2/ActualTest${testId.toString()}.mp3`;
    document.querySelector('.audio-player audio').load();

    const listImages = document.querySelectorAll('img[id^="img"]');
    listImages.forEach((img, index) => {
        const imageIndex = index + 1;
        img.src = `../images/test_${testId}/p${imageIndex}.png`;
        img.alt = `Hình ảnh câu ${imageIndex}`;
        img.id = `img${imageIndex}-id`;
    })
}