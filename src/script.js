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
    audioSource.src = `../audio/part_3_4/ActualTest${testId.toString()}.mp3`;
    document.querySelector('.audio-player audio').load();

    const listImages = document.querySelectorAll('img[id^="img"]');
    listImages.forEach((img, index) => {
        const imageIndex = index + 1;
        img.src = `../images/test_${testId}/p${imageIndex}.png`;
        img.alt = `Hình ảnh câu ${imageIndex}`;
        img.id = `img${imageIndex}-id`;
    })
}

async function loadPdf() {
   // const data = testData[];
    //if (!data || !data.pdfUrl) return;
    //pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';


    const container = document.getElementById('pdf-viewer-container');
    container.innerHTML = ''; 
    const pdfUrl =  '../book/tomato.pdf' ;//data.pdfUrl;
    const startPage = 10; //data.pdfPages.start;
    const endPage = 20; //data.pdfPages.end;

    try {
        const pdf = await pdfjsLib.getDocument({url: pdfUrl, password: 'toeicbookstore'}).promise;
        for (let i = startPage; i <= endPage; i++) {
            const page = await pdf.getPage(i);
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            container.appendChild(canvas);
            await page.render({ canvasContext: context, viewport }).promise;
        }
    } catch (error) {
        console.error('Error: ', error);
        container.textContent = 'Error loading PDF document.';
    }
}
