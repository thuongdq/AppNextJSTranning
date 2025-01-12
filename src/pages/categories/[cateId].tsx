import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
// import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Masonry from 'react-masonry-component';

import postServices from '../../../servies/postService';
import PostItem from '../components/PostItem';
import { PostType } from '..';
import { useGlobalState } from '../../../state';

interface CategoryProps {
    listposts: PostType[];
}

const Category: NextPage<CategoryProps> = ({ listposts }: CategoryProps) => {
    const [categories] = useGlobalState('categories');
    const router = useRouter();
    const cateId = router.query.cateId || '';
    // const cateInfo = categories.find((cate) => cate.id == cateId)[0];
    const cateInfo = useMemo(() => {
        const findObject = categories.find(
            (cate: any) => cate.id === Number(cateId)
        );
        return findObject?.text || '';
    }, [categories, cateId]);
    // const [categories] = useGlobalState('categories');
    const childElements = listposts.map(function (post) {
        return <PostItem post={post} key={post.PID} customClass="col-lg-6" />;
    });

    useEffect(() => {
        if (cateId === null) {
            router.push('/');
        }
        return () => {};
    }, []);
    return (
        <>
            <div
                className="header-Category"
                style={{
                    margin: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                }}
            >
                <h3>
                    Danh mục: <strong>{cateInfo}</strong>
                </h3>
            </div>
            {/* <Masonry className="ass1-section__wrap row ass1-section__isotope-init"> */}
            {childElements.map((child, index) => (
                <div key={index}>{child}</div>
            ))}
            {/* </Masonry> */}
            {/* <Masonry
                className={'ass1-section__wrap row ass1-section__isotope-init'} // default ''
            >
                {childElements}
            </Masonry> */}
        </>
    );
};

Category.getInitialProps = async (ctx: NextPageContext) => {
    const cateId = ctx.query?.cateId as string;
    console.log('query', cateId);
    const listposts = await postServices.getListByCategory({
        pagesize: 10,
        currPage: 1,
        categoryId: cateId,
    });

    return { listposts: listposts?.posts };
};

export default Category;
