export const dummy = (blogs) => {
  return 1;
};

export const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return blog.likes + total;
  }, 0);
};

export const favoriteBlog = (blogs) => {
  return blogs.reduce((total, blog) => {
    if (blog.likes > total.likes) {
      return blog;
    }

    return total;
  }, blogs[0]);
};
