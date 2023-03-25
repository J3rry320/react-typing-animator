React Typing Animator
=====================

The React Typing Animator is a React component that animates a given text array into a looping typing animation of each word.

Installation
------------

You can install the React Typing Animator using npm:

Copy code

`npm install react-typing-animator`

Usage
-----

To use the React Typing Animator in your React app, import it and pass in an array of strings as the `textArray` prop:

jsxCopy code

`import React from 'react';
import TypingAnimator from 'react-typing-animator';

function App() {
  const textArray = ['Welcome', 'to', 'the', 'React', 'Typing', 'Animator'];

  return (
    <TypingAnimator textArray={textArray} />
  );
}

export default App;`

Props
-----

The React Typing Animator component accepts the following props:

-   `textArray` (required): An array of strings to animate.
-   `delay` (optional): The delay in milliseconds before the animation starts. Defaults to 1000.
-   `typingDelay` (optional): The delay in milliseconds between each typed character. Defaults to 100.
-   `blinkDelay` (optional): The delay in milliseconds between each blink of the cursor. Defaults to 500.

Styling
-------

You can customize the styling of the React Typing Animator by adding CSS to your app. The component has the following class names:

-   `TypingAnimator`: The outermost container of the component.
-   `TypingAnimator-word`: The container of each word in the text array.
-   `TypingAnimator-cursor`: The cursor element that blinks at the end of each word.

Hire Me
-------

If you'd like to hire me for your project or learn more about my experience, please check out my [LinkedIn profile](https://www.linkedin.com/in/jerrythejsguy/)!

License
-------

The React Typing Animator is released under the MIT License. See LICENSE.md for more information.