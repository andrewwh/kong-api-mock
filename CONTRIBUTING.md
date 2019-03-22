# Contributing
We only take contributions from Developers at Lotto. This guide is for those developers, testers and release manager.

In order to contribute you must:

1. be a Lotto staff member or recognised contractor
2. have JIRA access

## Contents
- [Issue Management](#issue-management)
- [Getting Started](#getting-started)
- [Commit Messages](#commit-messages)
- [Versioning](#versioning)
- [Code Standards](#code-standards)
- [Pull Requests](#pull-requests)

## Issue Management
All changes __must__ be accompanied by a JIRA story or bug ticket. Work may not start unless a ticket has been created and is tracked by the product owner and release manager.

See [Lotto JIRA](https://lottonz.catchsoftware.net/jira) for more information.

## Getting started
### Create a feature branch
To start developing, create a feature branch from the _develop_ or _release-*_ branch. Name this branch after the JIRA ticket number + a description. E.g.:
```
OP-1234-adding-new-feature
```

> [Github flow](https://guides.github.com/introduction/flow/) is a lightweight, branch-based workflow that supports teams and projects where deployments are made regularly.

### Test driven development
We require that all code must have accompanying unit tests and where applicable BDD and integration tests. Code will not be accepted if it does not meet the minimum testing standard.

## Commit messages
The final commit message must be in the format:

```
<ticket number>: <Subject or headline>

<Change body>
```

### Rebase before you push
Feel free to commit often an regularly to you local branch. Before pushing to the remote they should be tidied to meet our standard:

```
git rebase -i HEAD~3 // where three is the number of previous commits to edit
```

## Versioning
This application is versioned using SemVer versioning.

See:
* [SemVer](http://semver.org/)
* [Semantic Release](https://github.com/semantic-release/semantic-release/)

## Code standards
_Outline basic code standards_

## Pull requests
Before a pull request can be merged it must have:

1. Unit tests
2. Conform to code style
3. Conform to development standards
4. Have a JIRA ticket number

The pull request must have as its title the name of the JIRA ticket number and subject. Add further notes that to the pull request where applicable.