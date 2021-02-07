import React, { useState, useEffect } from 'react';
// dynamic css


/*
try to setup an app where user can enter value inside all()
*/
const SingleColor = ({ rgb, weight, hexColor, index }) => {
    
    const [alert, setAlert] = useState(false)    // for to copy to clipboard

    // need to convert rgb (array) to rgb (string) for setting bg color
    const backColor = rgb.join(',')
    // console.log(backColor);
    // console.log(typeof(backColor));

    
    const actualhexValue = `#${hexColor.toUpperCase()}`
    const clickHandler = () => {
        setAlert(true);
        // navigator-object, clipboard-property, writeText-method
        navigator.clipboard.writeText(actualhexValue)
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAlert(false)
        }, 2000);

        // clean-up function
        return () => clearTimeout(timeout)
    }, [alert])

    return (
      <article
        onClick={clickHandler}
        // index>10 add color and color-light classes
        className={`color ${index > 10 && "color-light"}`}
        style={{ backgroundColor: `rgb(${backColor})` }}
      >
        <p className="percent-value">{weight}%</p>
            <p className="color-value"
            >{actualhexValue}</p>
            {alert && <p className="alert">copied to clipboard</p>
            }
      </article>
    );
}

export default SingleColor;