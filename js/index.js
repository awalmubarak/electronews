const NewsAPI = require('newsapi')
const $ = require('jquery')
const newsapi = new NewsAPI('7b4ca702fb474bd7b05d4f8e3666a8e1')
let articles = null
let category = 'business'
let navItems = $('.nav-group-item')


getNews()

function getNews(){
    newsapi.v2.topHeadlines({
        category: category,
        language: 'en',
        country: 'us'
    }).then((results)=>{
        articles = results.articles
        showNews(articles)
    }).catch((err)=>{
        console.log(err)
    })
}

function showNews(allNews){
    console.log(allNews);
    $('#news-list').html('')
    $('#news-list').append(
        `
        <li class="list-group-header">
            <input class="form-control" type="text" value="" placeholder="Search for news" onchange="search(this)">
        </li>
        `
    )
    allNews.forEach(news => {
        let newsObject = `
        <li class="list-group-item">
            <img class="img-circle media-object pull-left" src="${news.urlToImage}" width="50" height="50">
            <div class="media-body">
                <strong><a href="${news.url}" onclick="openArticle(event)">${news.title} </a></strong>
                <div>
                    <span class="">${news.publishedAt}</span>
                    <span class="pull-right">Author: ${news.author}</span>
                </div>
                <p>${news.description}</p>
            </div>
        </li>
        `
        $('#news-list').append(newsObject)
    });
}


function openArticle(event){
    event.preventDefault()
    let link = event.target.href
    window.open(link)
}

function search(input){
    $query = $(input).val()
    let sortedArticles = articles.filter((item)=>item.title.toLowerCase().includes($query.toLowerCase()))
    showNews(sortedArticles)
}

navItems.click((event)=>{
    category = event.target.id
    navItems.removeClass('active')
    $(event.target).addClass('active')
    console.log(category)
    getNews()
})