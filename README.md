# stylish-sheets

A better CSS-in-JS solution for React

- Super lightweight, only one dependency
- Simple API (CSS in tagged function -> classnames)
- Supports SCSS-like syntax and theming

## Installation

```
yarn add stylish-sheets
```

## Example

### Simple component

```javascript
import React, { useState } from 'react';
import useStyle from 'stylish-sheets';

export const Title = () => {
    const [toggle, setToggle] = useState(true);
    const classes = useStyle`
    .title {
        color: ${toggle ? 'red' : 'blue'};
        font-weight: bold;
        font-size: 25px;
    }
    `;

    return (
        <h1
            className={classes('title')}
            onClick={() => setToggle(t => !t)}
        >
            Hello World!
        </h1>
    );
}
```

### Themes

If you pass `useStyle` a function, it will pass it a theme object that is stored using React's Context API.

In this example, we get the color of the title from the theme that is set using `ThemeProvider`.

```javascript
import React from 'react';
import useStyle from 'stylish-sheets';

export const Title = () => {
    const classes = useStyle`
    .title {
        color: ${theme => theme.color};
        font-weight: bold;
        font-size: 25px;
    }
    `;

    return (
        <h1 className={classes('title')}>
            Hello World!
        </h1>
    );
}
```

Then in some component higher up the tree:

```javascript
import React from 'react';
import { ThemeProvider } from 'stylish-sheets';

import { Title } from './title';

export const App = () => (
    <ThemeProvider value={{ color: 'red' }}>
        <Title>
    </ThemeProvider>
)
```

[Read more about the Context API here](https://reactjs.org/docs/hooks-reference.html#usecontext)
