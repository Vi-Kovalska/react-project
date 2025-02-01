import { useRef, useState } from 'react'
// Щоб запустити та зупинити програвання необхідно викликати методи HTMLMediaElement.play() та HTMLMediaElement.pause(), де HTMLMediaElement це елемент <video>. Використовуємо реф для отримання доступу до DOM-елементу та його методам.
const Player = ({ source }) => {
  const [isPlay, setIsPlay] = useState(false);
    const videoREF = useRef();
  const play = () => { videoREF.current.play(); setIsPlay(true)};
  const pause = () => { videoREF.current.pause();  setIsPlay(false)};
  return (
    <>
      <video ref={videoREF} src={source}>Video with ref</video>
      <button onClick={isPlay ? pause : play}>{isPlay ? 'Pause' : 'Play'}</button>
      </>
  )
}

export default Player