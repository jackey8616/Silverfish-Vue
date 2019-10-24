import axios from "axios";
import qs from 'qs';


class APIUsecase {
    constructor (endpoint, version) {
        this.endpoint = endpoint;
        this.version = version;

        axios.defaults.withCredentials = false;
    }

    endpointRoute () {
        return this.endpoint + this.version;
    }

    authStatus (session) {
        return new Promise(async (resolve, reject) => {
            let res = await axios({
                url: this.endpoint + "/auth/status",
                method: "GET",
                headers: { Authorization: session },
            });
            
            if (res.data.success == true)
                return resolve(res.data.data);
            return reject(res.data.data);
        });
    }

    authRegister (recaptchaToken, authData) {
        return new Promise(async (resolve, reject) => {
            let res = await axios({
                url: this.endpoint + "/auth/register",
                method: "POST",
                data: qs.stringify({ ...{ "recaptchaToken": recaptchaToken }, ...authData }),
            });
            
            if (res.data.success === true)
                return resolve(res.data.data);
            return reject(res.data.data);
        });
    }

    authLogin (session, recaptchaToken, authData) {
        return new Promise(async (resolve, reject) => {
            let res = await axios({
                url: this.endpoint + "/auth/login",
                method: "POST",
                headers: { Authorization: session },
                data: qs.stringify({ ...{ "recaptchaToken": recaptchaToken }, ...authData }),
            });

            if (res.data.success === true)
                return resolve(res.data.data);
            return reject(res.data.data);
        });
    }

    authLogout (session) {
        return new Promise(async (resolve) => {
            await axios({
                url: this.endpoint + "/auth/logout",
                method: "GET",
                headers: { Authorization: session },
            });
            return resolve(true);
        });
    }

    fetchLatestBookmark (session) {
        return new Promise(async (resolve, reject) => {
            let res = await axios({
                url: this.endpoint + "/user/bookmark",
                method: "GET",
                headers: { Authorization: session }
            });
        
            if (res.data.success)
                return resolve(res.data.data);
            return reject(res.data.data);
        });
    }

    fetchNovels (session) {
        return new Promise(async (resolve, reject) => {
            let res = await axios({
                url: this.endpointRoute() + "/novels",
                method: "GET",
                headers: { Authorization: session },
            });

            if (res.data.success)
                return resolve(res.data.data);
            return reject(res.data.data);
        });
    }

    fetchNovelByID (session, novelID) {
        return new Promise(async (resolve, reject) => {
            let res = await axios({
                url: this.endpointRoute() + "/novel",
                method: "GET",
                headers: { Authorization: session },
                params: { novel_id: novelID },
            });

            if (res.data.success) {
                const novel = res.data.data;
                return resolve({
                    novelID: novel.novelID,
                    author: novel.author,
                    description: novel.description,
                    dns: novel.dns,
                    url: novel.url,
                    title: novel.title,
                    cover_url: novel.coverUrl,
                    chapters: novel.chapters,
                    lastCrawlTime: novel.lastCrawlTime,
                });
            }
            return reject(res.data.data);
        });
    }

    fetchNovelChapter (session, novelID, chapterIndex) {
        return new Promise(async (resolve, reject) => {
            let res = await axios({
                url: this.endpointRoute() + "/chapter",
                method: "GET",
                headers: { Authorization: session },
                params: {
                    novel_id: novelID,
                    chapter_index: chapterIndex,
                },
            });

            if (res.data.success)
                return resolve(res.data.data);
            return reject(res.data.data);
        });
    }

    fetchComics (session) {
        return new Promise(async (resolve, reject) => {
            let res = await axios({
                url: this.endpointRoute() + "/comics",
                method: "GET",
                headers: { Authorization: session },
            });
      
            if (res.data.success)
                return resolve(res.data.data);
            return reject(res.data.data);
        });
    }

    fetchComicByID (session, comicID) {
        return new Promise(async (resolve, reject) => {
            let res = await axios({
                url: this.endpointRoute() + "/comic",
                method: "GET",
                headers: { Authorization: session },
                params: { comic_id: comicID },
            });
      
            if (res.data.success) {
                const comic = res.data.data;
                return resolve({
                    comicID: comic.comicID,
                    author: comic.author,
                    description: comic.description,
                    dns: comic.dns,
                    url: comic.url,
                    title: comic.title,
                    cover_url: comic.coverUrl,
                    chapters: comic.chapters,
                    lastCrawlTime: comic.lastCrawlTime
                });
            }
            return reject(res.data.data);
        });
    }

    fetchComicChapter (session, comicID, chapterIndex) {
        return new Promise(async (resolve, reject) => {
            let res = await axios({
                url: this.endpointRoute() + "/comic/chapter",
                method: "GET",
                headers: { Authorization: session },
                params: {
                    comic_id: comicID,
                    chapter_index: chapterIndex
                },
            });

            if (res.data.success)
                return resolve(res.data.data);
            return reject(res.data.data);
        });
    }
}

export default APIUsecase;
