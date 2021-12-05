import React, { useState, useEffect } from 'react'
import './carousel.css' //will be added later

const Carousel = (props) => {
    const { children, show } = props
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)

    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - show)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    console.log(`${currentIndex} ${length} ${show}`)
    return (
        <div className="carousel-wrapper">
            {/* You can alwas change the content of the button to other things */}
            <button onClick={prev} className="left-arrow" hidden={currentIndex == 0}>
                &lt;
            </button>
            <div className="carousel-content-wrapper">
                <div
                    className={`carousel-content show-${show}`}
                    style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
                >
                    {children}
                </div>
            </div>
            {/* You can alwas change the content of the button to other things */}
            <button onClick={next} className="right-arrow" hidden={currentIndex >= (length - show)}>
                &gt;
            </button>
        </div>
    )
}

export default Carousel