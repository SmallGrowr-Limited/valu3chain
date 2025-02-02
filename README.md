# Welcome  👋
Welcome to the `Valu3Chain`repository! 
This guide provides instructions on how to collaborate effectively, 
ensuring a smooth workflow for all team members. 

## overview
`Valu3Chain` is a mobile application designed to  facilitate transactions/collaboration and also 
improve productivity between farmers, extension agents and ecosystem partners.

## To run the project for development

1. Please install `node.js` from https://nodejs.org/
2. Clone the `valu3chain` project from `https://github.com/SmallGrowr-Limited/valu3chain.git`
3. Run `npx expo install` in root folder on your terminal
4. After installation is done, run `npx expo start` to start your awesome works

## Branching
We follow a structured Git workflow where each feature, bug fix, or enhancement is developed 
in a separate branch before being merged into the main repository.

**Note**
Please follow the instructions below for a faster review process and to maintain organization.

### Creating a New Branch
1. Pull the latest changes from the master repository, use the following command:

`git checkout master`
`git pull origin master`

2. Create a new branch for your task:
`git checkout -b feature/your-feature-name`

**Branch Naming:** 
Use a descriptive branch name, e.g., `feature/login-auth` or `bugfix/fix-header-alignment`.

### Committing Changes

1. **Stage your changes:**
`git add .`

2. **Commit with a meaningful message:**
`git commit -m "[Short description of the change]"`
Adhere to the conventional commits format. More information can be found here: https://www.conventionalcommits.org/en/v1.0.0/

3. **Pushing Changes**
Push your branch to the remote repository:
`git push origin feature/your-feature-name`

## Creating a Pull Request (PR)
1. Go to the repository on GitHub.
2. Navigate to the Pull Requests tab.
3. Click **New Pull Request**.
4. Select your branch and compare it with `master`.
5. Provide a clear title and description of the changes.
6. Submit the PR for review.

## Review and Approval
- All changes must be reviewed by an admin before merging into `master`.
- A minimum of **one approval** is required before merging.
- Admins may request modifications or improvements before approving the PR.

## Merging Approved Changes
1. To ensure your branch is up to date with `master`:
`git checkout master`
`git pull origin master`

## Keeping Your Local Repository Updated
Regularly sync your local repository to avoid merge conflicts:
`git checkout master`
`git pull origin master`
`git fetch --prune`

## Additional Notes
- Follow coding standards and guidelines defined in the project.
- Keep PRs small and focused on a single feature or bug fix.
- Add relevant documentation/comments to your code.
- If you need assistance, tag the relevant team members in your PR.

Lastly, Happy Coding


