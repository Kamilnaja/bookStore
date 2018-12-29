export default class Book {
    constructor(nTitle, nAuthor) {
        this.title = nTitle;
        this.author = nAuthor;
    }

    setTtle(nTitle) {
        this.title = nTitle;
    }

    getTitle() {
        return this.title;
    }

    setAuthor(nAuthor) {
        this.author = nAuthor;
    }

    getAuthor() {
        return this.nAuthor;
    }
}