import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        try {
            const responce = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _limit: limit,
                    _page: page
                }
            })
            return responce
        }
        catch (e) {
            console.log(e)
        }
    }

    static async getById(id) {
        try {
            const responce = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
            return responce
        }
        catch (e) {
            console.log(e)
        }
    }

    static async getCommentsByPostId(id) {
        try {
            const responce = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            return responce
        }
        catch (e) {
            console.log(e)
        }
    }
}