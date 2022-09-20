// libs
import classNames from 'classnames/bind';
import { Modal } from '@mui/material';

// me
import styles from './ModelWrapper.module.scss';

const cx = classNames.bind(styles);

function ModelWrapper({ children, className, open, onClose }) {
    return (
        <Modal className={cx('wrapper', { [className]: className })} open={open} onClose={onClose}>
            {children}
        </Modal>
    );
}

export default ModelWrapper;
