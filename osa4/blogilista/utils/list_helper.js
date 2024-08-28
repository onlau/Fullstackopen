const lodash = require('lodash')

const dummy = (blogs) => (
	1
)

const totalLikes = (blogs) => (
	blogs.reduce((total,blog) => (total+blog.likes),0)
)

const favoriteBlog = (blogs) => {
	let maxLikes
	let max = 0
	for (let blog of blogs) {
		if (blog.likes > max) {
			max = blog.likes
			maxLikes = blog
		}
	}
	return maxLikes
}

const mostBlogs = (blogs) => {
	let authors = lodash.countBy(blogs, 'author')
	max = Math.max(...Object.values(authors))
	for (let author in authors){
		if (authors[author] === max){
			return {
				author: author,
				blogs: max
			}
		}
	}
}

const mostLikes = (blogs) => {
	let authors = {}
	for (let blog of blogs) {
		blog.author in authors ? authors[blog.author] += blog.likes : authors[blog.author] = blog.likes
	}
	max = Math.max(...Object.values(authors))
	for (let author in authors){
		if (authors[author] === max){
			return {
				author: author,
				likes: max
			}
		}
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
