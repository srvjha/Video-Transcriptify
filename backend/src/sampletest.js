import youtubedl from 'youtube-dl-exec';

youtubedl('https://www.youtube.com/watch?v=dQw4w9WgXcQ', {
  extractAudio: true,
  audioFormat: 'mp3',
  output: './output.mp3',
  
})
.then(output => console.log('Downloaded:', output))
.catch(err => console.error(err));
