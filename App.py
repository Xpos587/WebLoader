from moviepy.video.io.VideoFileClip import VideoFileClip

import eel, os, threading, pytube, logging

logging.basicConfig(level = logging.INFO)

eel.init('WebApp')

@eel.expose
def DownloadVideo(url, resolution):
    try:
        itag = QualityResolution(resolution)
        video = pytube.YouTube(url)
        stream = video.streams.get_by_itag(itag)
        stream.download(filename = stream.default_filename.replace('.mp4', f' - {resolution}.mp4'))
        return stream.default_filename
    except Exception as err:
        print(err)
        return 'Видео не поддерживает данное качество видео'

@eel.expose
def DownloadVideos(urls, resolution):
    try:
        for url in urls:
            DownloadVideo(url, resolution)
    except Exception as err:
        print(err)

@eel.expose
def DownloadPlaylist(url, resolution):
    try:
        playlist = pytube.Playlist(url)
        DownloadVideos(playlist.video_urls, resolution)
    except Exception as err:
        print(err)

@eel.expose
def DownloadMusic(url):
    try:
        mp4 = DownloadVideo(url, 'low')
        Convertion(mp4)
        os.remove(mp4)
    except Exception as err:
        print(err)

def QualityResolution(resolution):
    try:
        if resolution in '360p':
            itag = 18
        elif resolution in '720p':
            itag = 22
        elif resolution in '1080p':
            itag = 137
        elif resolution in '2160p':
            itag = 313
        else:
            itag = 18
        return itag
    except Exception as err:
        print(err)

def Convertion(mp4):
    try:
        clip = VideoFileClip(mp4)
        clip.audio.write_audiofile(mp4[:-4] + '.mp3')
        clip.close()
    except Exception as err:
        print(err)

def main():
    try:
        eel.start('index.html', size=(700, 700))
    except Exception as err:
        print(err)

Process = threading.Thread(target = main(), daemon = True)

Process.start()