import api from './api';
type obj_image = {
    file: File | null;
    base64URL: string;
};
type TypePostCreate = {
    post_content: string;
    url_image: string;
    category: string[];
    obj_image: obj_image;
};
type TypePostEdit = {
    post_content: string;
    url_image: string;
    category: string[];
    obj_image: obj_image;
    postid: string;
};
const postServices = {
    createNewPost: async (
        { post_content, url_image, category, obj_image }: TypePostCreate,
        token: string
    ) => {
        const url = '/post/addNew.php';
        const data = new FormData();
        data.append('post_content', post_content);
        data.append('url_image', url_image);
        data.append('category', category.toString());
        if (obj_image.file) {
            data.append('obj_image', obj_image.file);
        }

        return api.callFormData(url, {
            data,
            token,
        });
    },
    editPost: async (
        { post_content, url_image, category, obj_image, postid }: TypePostEdit,
        token: string
    ) => {
        const url = '/post/edit.php';
        const data = new FormData();
        data.append('post_content', post_content);
        data.append('url_image', url_image);
        data.append('postid', postid);
        data.append('category', category.toString());
        if (obj_image.file) {
            data.append('obj_image', obj_image.file);
        }

        return api.callFormData(url, {
            data,
            token,
        });
    },
    getPostDetail: async ({ postId }: { postId: string }) => {
        if (!postId) {
            return {
                status: 500,
                error: '',
            };
        }
        const url = `/post/post.php?postid=${postId}`;
        return api.callJson(url);
    },
    getPostsPaging: async ({ pagesize = 3, currPage = 1 } = {}) => {
        console.log(pagesize);
        const params = `?pagesize=${pagesize}&currPage=${currPage}`;
        const url = `/post/getListPagination.php${params}`;
        // console.log(url);
        return await api.callJson(url);
    },
    getPostsByUserId: async ({
        userId,
        token,
    }: {
        userId: string | undefined;
        token: string;
    }) => {
        if (!userId || !token) {
            return {
                status: 200,
                posts: [],
            };
        }
        const url = `/post/getListPostUserID.php?userid=${userId}`;
        return await api.callJson(url, { token });
    },
    getPostSearch: async ({ query }: { query: string }) => {
        const url = `/post/search.php?query=${encodeURI(query)}`;
        return await api.callJson(url);
    },
    getCategories: async () => {
        return api.callJson(`/categories/index.php`);
    },
    getListByCategory: async ({
        pagesize = 10,
        currPage = 1,
        categoryId = '',
    }: {
        pagesize: number;
        currPage: number;
        categoryId: string;
    }) => {
        if (!categoryId) {
            return null;
        }
        const url = `/post/getListByCategory.php?pagesize=${pagesize}&currPage=${currPage}&tagIndex=${categoryId}`;
        return api.callJson(url);
    },
    getCommentsByPostId: async ({ postId }: { postId: string }) => {
        const url = `/comment/comments.php?postid=${postId}`;
        return api.callJson(url);
    },
    postComment: async ({
        postId,
        comment,
        token,
    }: {
        postId: string;
        comment: string;
        token: string;
    }) => {
        const data = {
            comment: comment,
            postid: postId,
        };
        const url = `/comment/add_new.php`;
        return api.callJson(url, { data, method: 'POST', token });
    },
};

export default postServices;
