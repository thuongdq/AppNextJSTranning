import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface HeaderSearchProps {}

const HeaderSearch: React.FC<HeaderSearchProps> = () => {
    const [queryStr, setQueryStr] = useState('');
    const router = useRouter();
    const handleOnChange = (evt: any) => {
        setQueryStr(evt.target.value);
    };
    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        if (queryStr) {
            router.push(`/search?q=${queryStr}`);
        }
    };
    return (
        <div className="ass1-header__search">
            <form action="#" onSubmit={handleSubmit}>
                <label>
                    <input
                        type="search"
                        name="search-text"
                        className="form-control"
                        placeholder="Nhập từ khóa ..."
                        value={queryStr}
                        onChange={handleOnChange}
                    />
                    <i className="icon-Search" />
                </label>
            </form>
        </div>
    );
};

export default HeaderSearch;
