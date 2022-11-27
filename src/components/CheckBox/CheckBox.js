import { useRef } from 'react';

import classNames from 'classnames/bind';
import styles from './CheckBox.scss';

const cx = classNames.bind(styles);

function CheckBox({ label, checked, onChange }) {
    const inputRef = useRef(null);

    const handleChange = () => {
        if (onChange) {
            onChange(inputRef.current);
        }
    };
    return (
        <label className={cx('checkbox')}>
            <input type="checkbox" ref={inputRef} onChange={handleChange} checked={checked} />
            {label}
        </label>
    );
}

export default CheckBox;
