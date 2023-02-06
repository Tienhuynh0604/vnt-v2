import React, {useState, useCallback} from "react";
import {Button} from "react-bootstrap";

const InputNumberPlusMinus = ({value = 0, onChange, product}) => {
    let [count, setCount] = useState(value);
    const incrementCount = () => {
        setCount(count + 1);
        if (onChange) {
            onChange(product, count + 1);
        }
    };

    const decrementCount = () => {
        if (count === 0) return;
        setCount(count - 1);
        if (onChange) {
            onChange(product, count - 1);
        }
    };

    return <div className="d-flex justify-content-start input-number">
        <Button type="button" disabled={count === 0} onClick={decrementCount}>-</Button>
        <span>{count}</span>
        <Button type="button" onClick={incrementCount}>+</Button>
    </div>
};


export default InputNumberPlusMinus;