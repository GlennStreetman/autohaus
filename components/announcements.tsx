import {useState, useEffect, useRef} from 'react'

function Announcements(p) {
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([])
  const timeoutRef = useRef(null);

    const delay = 3250;

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    const slideText = p.text.split(',')
    setSlides(slideText)
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className='text-center'  key={`${index}-slide`}>
      {slides[index]} 
    </div>
  );
}

export default Announcements
