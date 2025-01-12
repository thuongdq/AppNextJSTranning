import Link from 'next/link';
import { useGlobalState } from '../../../../state';

interface HeaderMenuProps {}

const HeaderMenu: React.FC<HeaderMenuProps> = () => {
    const [categories] = useGlobalState('categories');

    return (
        <nav>
            <ul className="ass1-header__menu">
                <li>
                    <a>Danh mục</a>
                    <div className="ass1-header__nav">
                        <div className="container">
                            <ul>
                                {categories.map((cate) => {
                                    return (
                                        <li key={cate.id}>
                                            <Link
                                                href="/categories/[cateId]"
                                                as={`/categories/${cate.id}`}
                                            >
                                                {cate.text}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderMenu;
