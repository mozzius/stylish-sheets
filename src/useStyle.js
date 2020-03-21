import { useState, useEffect, useRef } from 'react';
import stylis from 'stylis';

const useStyle = (styles, ...funcs) => {
    const [id, setId] = useState();
    const [classes, setClasses] = useState({});
    const sheetRef = useRef();

    useEffect(() => {
        // set the id
        setId(Math.random().toString().slice(2, 7).toString(16))

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

    useEffect(() => {
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

        // renaming the class names
        const classNames = {};

        // INFINITE RERENDERS REGION

        // move to stylis plugin?
        // also, will fuck up if a class name is a subset of another class name
        // let's just home that doesn't happen
        stylisOutput.match(/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*/g)
            .filter((v, i, a) => a.indexOf(v) === i)
            .forEach(name => {
                const newName = `${name.slice(1)}-${id}`;
                classNames[name.slice(1)] = newName;
                stylisOutput = stylisOutput.replace(new RegExp(name, 'g'), `.${newName}`);
            });

        setClasses(classNames);

        console.log(stylisOutput);

        if (sheetRef.current.styleSheet) {
            // IE8 & down
            sheetRef.current.styleSheet.cssText = stylisOutput;
        } else {
            sheetRef.current.innerHTML = '';
            sheetRef.current.appendChild(document.createTextNode(stylisOutput));
        }
    }, [styles, funcs, id])

    return (...names) => names.reduce((prev, next) => `${prev} ${classes[next]}`, '');
}

export default useStyle;