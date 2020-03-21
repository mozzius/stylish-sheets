import { useState, useLayoutEffect, useRef } from 'react';
import stylis from 'stylis';

const createId = () => {
    const randLetter = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    // first 2 must be letters to be a valid CSS class name
    const first2 = randLetter() + randLetter();
    return first2 + Math.random().toString(36).slice(-4);
}

const useStyle = (styles, ...funcs) => {
    const [id, setId] = useState();
    const sheetRef = useRef();

    useLayoutEffect(() => {
        // set the id
        setId(createId());

        // create the stylesheet
        const head = document.head;
        const sheet = document.createElement('style');
        sheet.type = 'text/css';
        sheetRef.current = sheet;

        // append stylesheet to head
        head.appendChild(sheetRef.current);

        return () => {
            // remove the stylesheet
            head.removeChild(sheetRef.current)
        }
    }, []);

    useLayoutEffect(() => {
        if (id) {
            const styleStr = styles.reduce((complete, line) => {
                if (funcs.length) {
                    let interp = funcs.shift();
                    // could just be a normal element
                    if (typeof interp === 'function') {
                        // TODO: themes using context
                        return complete + line + interp(/* theme obj goes here */);
                    } else {
                        return complete + line + interp;
                    }
                } else {
                    return complete + line;
                }
            }, '');

            // use stylis for preprocessing (allows SCSS-like syntax)
            let stylisOutput = stylis('', styleStr);

            // move to stylis plugin?
            stylisOutput
                .match(/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*/g)
                .forEach(name => {
                    const newName = `.${id}-${name.slice(1)}`;
                    stylisOutput = stylisOutput.replace(name, newName);
                });

            if (sheetRef.current.styleSheet) {
                // IE8 & down
                sheetRef.current.styleSheet.cssText = stylisOutput;
            } else {
                sheetRef.current.innerHTML = '';
                sheetRef.current.appendChild(document.createTextNode(stylisOutput));
            }
        }
    }, [styles, funcs, id])

    return (...names) => names.filter(Boolean).map(name => `${id}-${name}`).join(' ');
}

export default useStyle;