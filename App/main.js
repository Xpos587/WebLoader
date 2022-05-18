const urltitlePy = document.getElementById('urltitle')
const labelsPy = document.querySelectorAll('.form-control label')
const urlPy = document.getElementById('url')
const togglesPy = document.querySelectorAll('.toggle')
const videoPy = document.getElementById('video')
const qualityPy = document.getElementById('quality')
const playlistPy = document.getElementById('playlist')
const musicPy = document.getElementById('music')
const downloadPy = document.getElementById('download')
const buttons = document.querySelectorAll('.ripple')

labelsPy.forEach(label => {
    label.innerHTML = label.innerText.split('').map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`).join('')
})

togglesPy.forEach(toggle => toggle.addEventListener('change', (e) => doTheTrick(e.target)))

function doTheTrick(theClickedOne) {
    if (videoPy.checked && playlistPy.checked || playlistPy.checked && musicPy.checked || videoPy.checked && musicPy.checked) {
        if (videoPy === theClickedOne) {
            videoPy.checked = false
        }

        if (playlistPy === theClickedOne) {
            playlistPy.checked = false
        }

        if (musicPy === theClickedOne) {
            musicPy.checked = false
        }
    }
}

downloadPy.addEventListener('click', () => {
    const url = urlPy.value
    const quality = qualityPy.options[qualityPy.selectedIndex].text;

    if (videoPy.checked) {
        eel.download_video(url, quality)();
    }

    if (playlistPy.checked) {
        eel.download_playlist(url, quality)();
    }

    if (musicPy.checked) {
        eel.download_music(url)();
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