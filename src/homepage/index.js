var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');

page('/', function (ctx, next) {
  title('Platzigram');
  var main = document.getElementById('main-container');

  var pictures = [
    {
      user: {
        username: 'warevalo',
        avatar: 'https://avatars3.githubusercontent.com/u/22353298?v=3&s=460'
      },
      url: 'office.jpg',
      likes: 10,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'warevalo',
        avatar: 'https://avatars3.githubusercontent.com/u/22353298?v=3&s=460'
      },
      url: 'office.jpg',
      likes: 2,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ];

  empty(main).appendChild(template(pictures));
})
