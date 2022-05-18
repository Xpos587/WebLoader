from moviepy.video.io.VideoFileClip import VideoFileClip
# from moviepy.video.VideoClip import ImageClip
# from moviepy.video.compositing.CompositeVideoClip import CompositeVideoClip

import pytube, eel

import os

eel.init('App') # Путь к папке с веб приложением

@eel.expose # Вызывает Python функцию в JavaScript
def download_video(url, resolution):
    itag = choose_resolution(resolution)
    video = pytube.YouTube(url)
    stream = video.streams.get_by_itag(itag)
    stream.download()
    return stream.default_filename

@eel.expose
def download_videos(urls, resolution):
    for url in urls:
        download_video(url, resolution)

@eel.expose
def download_playlist(url, resolution):
    playlist = pytube.Playlist(url)
    download_videos(playlist.video_urls, resolution)

@eel.expose
def download_music(url):
    filename = download_video(url, 'low')
    convert_to_mp3(filename)
    os.remove(filename)

def choose_resolution(resolution):
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

def convert_to_mp3(filename):
    clip = VideoFileClip(filename)
    clip.audio.write_audiofile(filename[:-4] + '.mp3')
    clip.close()


eel.start('index.html', size=(700, 700)) # Запуск