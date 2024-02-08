# Exercise 1

When setting up a CI/CD pipeline for a React application with a team of six, it is crucial to select appropriate tools for each part of the process. For linting, ESLint is widely used within the React community to identify problematic patterns in JavaScript/JSX code. It helps maintain clean code that adheres to best practices.

Regarding testing, Jest, combined with React Testing Library, is favored for testing React applications. Jest offers a straightforward setup for testing JavaScript, while React Testing Library allows for testing React components in a way that is more faithful to how they are used in a browser, focusing on their behavior rather than their implementation details.

For bundling, Webpack is often chosen for its robust capabilities and flexibility. It prepares the application's bundles, optimizing resources like JavaScript, CSS, and images for production.

Beyond Jenkins and GitHub Actions, there are several alternatives for setting up CI. GitLab CI/CD offers an integrated solution within GitLab, with easy configuration through a .gitlab-ci.yml file. CircleCI is another popular option, appreciated for its speed and customization capabilities. Travis CI is also a reliable choice, especially for open-source projects.

Choosing between a self-hosted or cloud-based environment for CI/CD depends on various factors. A cloud environment, such as AWS CodeBuild or Google Cloud Build, can provide greater scalability and flexibility, ideal for rapidly developing teams. However, a self-hosted environment might be preferred for compliance, security reasons, or for full control over resources. This decision requires assessing the team's specific needs in terms of privacy, costs, and infrastructure complexity.
