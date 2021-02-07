// import './App.css';
import React, { useState } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";

// problems I faced: passing hex property as prop
// ṣolution: passing it as seperate prop rather than passing it with everything through spread operator 
// props:rgb, weight are coming from color

// optimisations: in shades, the text color was not visible, so I passed another prop index, since after index 11 shades start, so now I can dynamically add a different class

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  // if user submits a color value that is invalid

  const [list, setList] = useState(new Values("#228B22").all(10));

  const SubmitHandler = (e) => {
    e.preventDefault();

    try {
      // colors will be array of shades and tints 
      let colors = new Values(color).all(10)
      setList(colors)
      // console.log(colors);
    } catch (error) {
      setError(true)
      console.log(error);
    }
  };

  return (
    <>
      <section className="container">
        {/* form goes here */}
        <h3>Reactive Color Generator</h3>
        <form onSubmit={SubmitHandler}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="ColorName or ColorCode"

            // conditionally adding the input class
            // if error state = true, add error class
            className={`${error?'error':null}`}
          />

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </section>

      <section className="colors">{/* iterate and display colors */}
        
        {/* color object :
        {
          rgb:Array of size 3, 
          alpha: 1
          type: 'tint/shade'
          weight : precentage
        }

        */}
        {
          list.map((color, index) => {
            // console.log(color);
            // for some reason, we were not able to pass hex attribute of color object in spread operator 
            
            return (
              <SingleColor key={index} {...color} index={index} hexColor={color.hex}/>
            )
          })  
        }
      </section>
    </>
  );
}

export default App;
