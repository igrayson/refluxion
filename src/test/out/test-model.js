"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var decorators_1 = require("./refluxion/decorators");
var hasOne = decorators_1.createHasOne();
(function (ArchivalState) {
    ArchivalState[ArchivalState["live"] = 0] = "live";
    ArchivalState[ArchivalState["pending"] = 1] = "pending";
    ArchivalState[ArchivalState["archived"] = 2] = "archived";
})(exports.ArchivalState || (exports.ArchivalState = {}));
var ArchivalState = exports.ArchivalState;
;
// Define the root of the model. This serves as the root end-point on the server and the state of the app in Redux
var MyModel = (function () {
    function MyModel() {
    }
    __decorate([
        decorators_1.queryBy(ArticlesWhere)
    ], MyModel.prototype, "articles", void 0);
    __decorate([
        decorators_1.queryBy(CommentsWhere)
    ], MyModel.prototype, "comments", void 0);
    __decorate([
        decorators_1.queryBy(UsersWhere)
    ], MyModel.prototype, "users", void 0);
    MyModel = __decorate([
        decorators_1.root
    ], MyModel);
    return MyModel;
}());
exports.MyModel = MyModel;
// Define the article class, contains a foreign key to user
var Article = (function () {
    function Article() {
    }
    Article.prototype.getComments = function (comments) {
        var _this = this;
        return comments.filter(function (com) { return _this.id === com.article_id; });
    };
    __decorate([
        decorators_1.length(255)
    ], Article.prototype, "id", void 0);
    __decorate([
        hasOne(User, function (master) { return master.users; })
    ], Article.prototype, "author_id", void 0);
    __decorate([
        decorators_1.hasMany
    ], Article.prototype, "getComments", null);
    return Article;
}());
exports.Article = Article;
var ArticlesWhere = (function () {
    function ArticlesWhere() {
    }
    __decorate([
        decorators_1.length(255)
    ], ArticlesWhere.prototype, "id", void 0);
    __decorate([
        decorators_1.length(255)
    ], ArticlesWhere.prototype, "author_id", void 0);
    return ArticlesWhere;
}());
exports.ArticlesWhere = ArticlesWhere;
var Comment = (function () {
    function Comment() {
    }
    __decorate([
        decorators_1.isIsoDate()
    ], Comment.prototype, "date", void 0);
    __decorate([
        decorators_1.length(255)
    ], Comment.prototype, "id", void 0);
    __decorate([
        hasOne(User, function (master) { return master.users; }),
        decorators_1.length(255)
    ], Comment.prototype, "author_id", void 0);
    __decorate([
        hasOne(Article, function (master) { return master.articles; }),
        decorators_1.length(255)
    ], Comment.prototype, "article_id", void 0);
    return Comment;
}());
exports.Comment = Comment;
var CommentsWhere = (function () {
    function CommentsWhere() {
    }
    return CommentsWhere;
}());
exports.CommentsWhere = CommentsWhere;
var User = (function () {
    function User() {
    }
    User.prototype.getArticles = function (articles) {
        var _this = this;
        return articles.filter(function (ts) { return _this.id === ts.author_id; });
    };
    User.prototype.getComments = function (comments) {
        var _this = this;
        return comments.filter(function (com) { return _this.id === com.author_id; });
    };
    __decorate([
        decorators_1.length(255)
    ], User.prototype, "id", void 0);
    __decorate([
        decorators_1.integer()
    ], User.prototype, "numberComments", void 0);
    __decorate([
        decorators_1.hasMany
    ], User.prototype, "getArticles", null);
    __decorate([
        decorators_1.hasMany
    ], User.prototype, "getComments", null);
    return User;
}());
exports.User = User;
var UsersWhere = (function () {
    function UsersWhere() {
    }
    return UsersWhere;
}());
exports.UsersWhere = UsersWhere;
