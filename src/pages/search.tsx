import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Masonry from 'react-masonry-component';

import { PostType } from '.';
import postServices from '../../servies/postService';
import PostItem from './components/PostItem';

interface SearchProps {
    listposts: PostType[];
}
const masonryOptions = {
    transitionDuration: 0,
};

const imagesLoadedOptions = { background: '.my-bg-image-el' };

const Search: NextPage<SearchProps> = ({ listposts }: SearchProps) => {
    const router = useRouter();
    const searchStr = (router.query.q || '') as string;
    console.log(listposts);
    console.log(searchStr);
    useEffect(() => {
        if (!searchStr) {
            router.push('/');
        }
        return () => {};
    }, []);

    // const childElements = listposts.map(function (post) {
    //     return <PostItem post={post} key={post.PID} customClass="" />;
    // });

    // return (
    //     <>
    //         <div
    //             className="header-search"
    //             style={{
    //                 margin: 20,
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 gap: 10,
    //             }}
    //         >
    //             <h3>
    //                 Từ khóa tìm kiếm: <strong>{searchStr}</strong>
    //             </h3>
    //             <p>
    //                 Tìm kiếm được <strong>{listposts.length}</strong> kết quả
    //             </p>
    //         </div>
    //         <ResponsiveMasonry
    //             columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
    //         >
    //             <Masonry gutter={'10px'} containerTag="div">
    //                 {childElements}
    //             </Masonry>
    //         </ResponsiveMasonry>

    //     </>
    // );

    const childElements = listposts.map(function (post) {
        return (
            <PostItem
                post={post}
                key={post.PID}
                customClass="col-lg-6"
                isHightlight={true}
                query={searchStr}
            />
        );
    });

    return (
        <>
            <div
                className="header-search"
                style={{
                    margin: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                }}
            >
                <h3>
                    Từ khóa tìm kiếm: <strong>{searchStr}</strong>
                </h3>
                <p>
                    Tìm kiếm được <strong>{listposts.length}</strong> kết quả
                </p>
            </div>
            {/* <Masonry
                className={'ass1-section__wrap row ass1-section__isotope-init'} // default ''
            > */}
            {childElements}
            {/* </Masonry> */}
        </>
    );
};

Search.getInitialProps = async (ctx: NextPageContext) => {
    const query = (ctx.query?.q || '') as string;
    const listposts = await postServices.getPostSearch({ query });

    return { listposts: listposts?.posts };
};

export default Search;
