import React, { useState } from 'react';

const SomeComponent = () => {
    const [toggle, setToggle] = useState(false); // Initialize state

    const handleToggle = () => {
        setToggle(!toggle);  // Safely toggling the state
    };

    return (
        <div>
            <button onClick={handleToggle}>Toggle</button>
            <p>{toggle ? "Toggled On" : "Toggled Off"}</p>
        </div>
    );
};

export default SomeComponent;
