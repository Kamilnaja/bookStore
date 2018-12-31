import Author from './Author';

export default class Book {
    constructor(nTitle, firstName, lastName, pseudo) {
        this.title = nTitle;
        this.author = new Author(firstName, lastName, pseudo);
    }
}