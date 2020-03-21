# stylish-sheets

A better CSS-in-JS solution for React

- Super lightweight, only one dependency
- Simple API (CSS to classnames via a React hook)

## Installation

```
yarn add stylish-sheets
```

## Example

```javascript
import React, { useState } from 'react';
import useStyle from 'stylish-sheets';

const Title = () => {
    const [toggle, setToggle] = useState(true);
    const classes = useStyle`
    .title {
        color: ${toggle ? 'red' : 'blue'};
        font-weight: bold;
        font-size: 25px;
    }
    `;

    return (
        <p
            className={classes('title')}
            onClick={() => setToggle(t => !t)}
        >
            Hello World!
        </p>
    );
}
```