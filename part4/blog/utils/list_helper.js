export const dummy = (blogs) => {
  return 1;
};

export const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return blog.likes + total;
  }, 0);
};

export const favoriteBlog = (blogs) => {
  return blogs.reduce((acc, blog) => {
    if (blog.likes > acc.likes) {
      return blog;
    }

    return acc;
  }, blogs[0]);
};

export const mostBlogs = (blogs) => {
  const authors = blogs.reduce((acc, blog) => {
    const { author } = blog;

    const existedAuthor = acc.find((b) => b.author === author);

    if (existedAuthor) {
      existedAuthor.blogs += 1;
    } else {
      acc.push({ author, blogs: 1 });
    }

    return acc;
  }, []);

  const maxBlogs = Math.max(...authors.map((a) => a.blogs));

  return authors.find((a) => a.blogs === maxBlogs);
};

export const mostLikes = (blogs) => {
  const authors = blogs.reduce((acc, blog) => {
    const { author, likes } = blog;

    const existedAuthor = acc.find((b) => b.author === author);

    if (existedAuthor) {
      existedAuthor.likes += likes;
    } else {
      acc.push({ author, likes });
    }

    return acc;
  }, []);

  const maxLikes = Math.max(...authors.map((a) => a.likes));

  return authors.find((a) => a.likes === maxLikes);
};
