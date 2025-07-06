import {api} from "./api.js";

export const getBlogLikes = async (auth, blogId) => {

    try {
        const response = await api.get(`/api/get_likes_on_blog/${blogId}`, {

            headers: {
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            }
        })
        // console.log(response)
        return response.data;
    }
    catch (error) {
        console.error('Error getting Likes:', error);
        return false;
    }
}

export const likeBlog = async (auth, blog_id, user_id) => {

        try {
            const response = await api.post(`/api/create_like`, {blog_id, user_id}, {

                headers: {
                    hash_str: auth.hash_str,
                    data_check_string: auth.data_check_string,
                }
            })
            // console.log(response)
            return response.data;
        }
        catch (error) {
            console.error('Error liking Blog:', error);
            return false;
        }
}

export const unlikeBlog = async (auth, blog_id, user_id) => {

        try {
            const response = await api.delete(`/api/delete_like`, {
                params:{
                    blog_id,
                    user_id
                },

                headers: {
                    hash_str: auth.hash_str,
                    data_check_string: auth.data_check_string,
                }
            })
            // console.log(response)
            return response.data;
        }
        catch (error) {
            console.error('Error unliking Blog:', error);
            return false;
        }
}


// get all posts
export const getPosts = async (auth, user_id) => {

    try {
        // console.log('fetching posts')
        const response = await api.get(`/api/get_all_blogs`, {
            params: {
                user_id
            },
            headers: {
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            }
        })
        console.log(response)
        return response.data;
    }
    catch (error) {
        console.error('Error getting Posts:', error);
        return false;
    }
}

// get comments on a post
export const getBlogComments = async (auth, blog_id) => {

    try {
        const response = await api.get(`/api/get_comments_on_blog/${blog_id}`, {

            headers: {
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            }
        })
        // console.log(response)
        return response.data;
    }
    catch (error) {
        console.error('Error getting Comments:', error);
        return false;
    }
}


// add a comment on a post
export const addBlogComment = async (auth, blog_id, user_id, comment) => {

    try {
        const response = await api.post(`/api/create_comment`, {blog_id, user_id, comment}, {

            headers: {
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            }
        })
        // console.log(response)
        return response.data;
    }
    catch (error) {
        console.error('Error adding Comment:', error);
        return false;
    }
}

// get all questions

export const getQuestions = async (auth, user_id) => {
    try {
        const response = await api.get(`/api/all_questions`, {
            params: {
                user_id
            },
            headers: {
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            }
        })
        // console.log(response)
        return response.data;
    }
    catch (error) {
        console.error('Error getting Questions:', error);
        return false;
    }
}


// post a question
export const postQuestion = async (auth, question) => {

    try {
        const response = await api.post(`/api/create_question`, question, {

            headers: {
                hash_str: auth.hash_str,
                data_check_string: auth.data_check_string,
            }
        })
        // console.log(response)
        return response.data;
    }
    catch (error) {
        console.error('Error posting Question:', error);
        return false;
    }
}


// delete a question

export const deleteQuestion = async (auth, question_id, user_id, chat_id) => {

        try {
            const response = await api.delete(`/api/delete_question`, {
                params: {
                    question_id,
                    user_id,
                    chat_id
                },
                headers: {
                    hash_str: auth.hash_str,
                    data_check_string: auth.data_check_string,
                }
            })
            // console.log(response)
            return response.data;
        }
        catch (error) {
            console.error('Error deleting Question:', error);
            return false;
        }
}

// delete a blog

export const deleteBlog = async (auth, blog_id, user_id, chat_id) => {

            try {
                const response = await api.delete(`/api/delete_blog`, {
                    params: {
                        blog_id,
                        user_id,
                        chat_id
                    },
                    headers: {
                        hash_str: auth.hash_str,
                        data_check_string: auth.data_check_string,
                    }
                })
                // console.log(response)
                return response.data;
            }
            catch (error) {
                console.error('Error deleting Blog:', error);
                return false;
            }
}

// delete a comment

export const deleteComment = async (auth, comment_id, user_id, chat_id) => {

            try {
                const response = await api.delete(`/api/delete_comment`, {
                    params: {
                        comment_id,
                        user_id,
                        chat_id
                    },
                    headers: {
                        hash_str: auth.hash_str,
                        data_check_string: auth.data_check_string,
                    }
                })
                // console.log(response)
                return response.data;
            }
            catch (error) {
                console.error('Error deleting Comment:', error);
                return false;
            }
}