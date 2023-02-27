import Tippy from '@tippyjs/react/headless';
import MenuItem from './MenuItem';
import icons from '~/assets/icons';
import classNames from 'classnames/bind';
import styles from './Menu.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);

function Menu({ children }) {
    return (
        <div className={cx('menu')}>
            <Tippy
                interactive
                delay={[0, 700]}
                placement="bottom-end"
                render={(attrs) => (
                    <div className={cx('menu__list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {children.map((item, index) => (
                                <MenuItem data={item} key={index} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
            >
                <img src={icons.menu} alt="menu" />
            </Tippy>
        </div>
    );
}

export default Menu;
