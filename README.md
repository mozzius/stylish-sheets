# stylish-sheets

A better CSS-in-JS solution for React

- Super lightweight (492b gzipped!)
- Simple API (CSS -> classnames via a hook)

## Installation

> Not an npm package yet

## Example

```javascript
import React, { useState } from 'react';
import useStyle from 'stylish-sheets';

const App = () => {
    const [toggle, setToggle] = useState(true);
    const classes = useStyle`
    p {
        color: ${toggle ? 'red' : 'blue'};
        font-family: sans-serif;
    }

    .big {
        font-weight: bold;
        font-size: 25px;
    }
    `;

    return (
        <p
            className={classes('big')}
            onClick={() => setToggle(t => !t)}
        >
            Hello World!
        </p>
    );
}
```