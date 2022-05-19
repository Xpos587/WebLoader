const consolePy = document.getElementById('console')
const urltitlePy = document.getElementById('urltitle')
const labelsPy = document.querySelectorAll('.form-control label')
const urlPy = document.getElementById('url')
const videoPy = document.getElementById('video')
const qualityPy = document.getElementById('quality')
const playlistPy = document.getElementById('playlist')
const musicPy = document.getElementById('music')
const downloadPy = document.getElementById('download')
const buttons = document.querySelectorAll('.ripple')

labelsPy.forEach(label => {
    label.innerHTML = label.innerText.split('').map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`).join('')
})

downloadPy.addEventListener('click', () => {
    const url = urlPy.value
    const quality = qualityPy.options[qualityPy.selectedIndex].text;
    const console = consolePy.innerHTML

    if (videoPy.checked) {
        const response = eel.DownloadVideo(url, quality)();
        console = response;
    }

    if (playlistPy.checked) {
        const response = eel.DownloadPlaylist(url, quality)();
        console = response;
    }

    if (musicPy.checked) {
        const response = eel.DownloadMusic(url)();
        console = response;
    }
})

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX
        const y = e.clientY

        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
})