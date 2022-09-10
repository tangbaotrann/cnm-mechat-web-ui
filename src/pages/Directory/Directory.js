// libs
import classNames from 'classnames/bind';

// me
import styles from './Directory.module.scss';
import Sidebar from '~/layouts/components/Sidebar';
import Middle from '~/layouts/components/Middle';
import Rightbar from '~/layouts/components/Rightbar';

const cx = classNames.bind(styles);

function Directory() {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <Middle directory />
            <Rightbar />
        </div>
    );
}

export default Directory;
