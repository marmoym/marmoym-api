# Contributing to Marmoym-Api
We appreciate all the various types of contributions from anyone who may have 
interest in the project. There are, however, a few things of note we advise to 
be respected.

## Language
Project `Marmoym` is maintained with officially the two languages: _English_, 
and _Korean_. It is a must, however, that the summary of Issue, Pull Request, 
and Commit log be written in _English_. Check the example, if you want to let 
this clearly understood.

## Issues
Acitivities with regards to Issues of github is our primary means of 
communication. You can add, comment, or with due care, close the issue. 
Just like any social network service onnline, feel free to talk in *Issue* 
whenever you like. Of course, Code of Conduct (document being created) is 
expected to be met in every circumstance possible.

## Pull Requests
Pull request when you are done communication with the contributors. Be sure to 
check the *Merge Guideline*, however.

## Commit Messages
Here in Marmoym, most of the commits are considered to be come from Pull Request
in advance. Commits done locally are rather allowed to have personal styles, 
though the general guideline persists. 
See https://chris.beams.io/posts/git-commit/, as reference. 

For one thing, commit message title (first line) is 72 character long and the 
message body should be 80 characters in width.

When PR is approved by reviewers, however, following rules are expected to be 
respected.

1. Squash all your commits into one. This can either be done by github's 
`Squash and Merge` feature or in your local git.

2. A squahsed commit will have a commit message of a set of parts and rules

- The first line (Title)
  - is in English and starts with present tense verb.
  - is followed by blank line
   
- Message body
  - is in any language you prefer, 
  - is with concise information on what things have changed and what should 
  be taken care of in the future.

- PR-URL
  - is at the bottom of the message body, preceded by blank line. 
  - contains the full URL of the pull request page, **not** the `#N`. 
  Note that this will be shown as `#N` in github which automatically parses 
  and stylize the words. If `PR-URL` is more than one, write each in a 
  separate line.
  `PR-URL: https://github.com/tymsai/marmoym-dev-support/pulls/1`

- Fixes
  - describes issues that have been handled by this commit. Related issues, 
  however, are expected to be written in Pull Request message thus not 
  obligated to be referred in the commit message. Multiple `Fixes` are 
  written in a separate line.
  - is preceded by `PR-URL`
  `Fixes: https://github.com/tymsai/marmoym-dev-support/issues/1`.

- Refs
  - can also be added optionally. This contains reference that could help 
  others understand your commits. Multiple `Refs` are all written in a 
  separate line.
  `Refs: http://eslint.org/docs/rules/space-in-parens.html`

3.  Merge by `Squash and Merge`. This is to merge your local branch into 
develop branch then rebase that develop branch in order not to allow `merge` 
commit. When using `Squash and Merge`, please remove the Pull Request number 
in the bracket at the end of automatically generated commit message title.
```
Commit Message Title (#N) // Delete (#N) in the title
```

See the sample commit message below.
```
Refactor components so that app now behaves in this way

Components are now partitioned in this way. This way, we can expect something
to improve.
- Delete FooComponent
- Add some functionalities into BarCompoennt so that something does this way.
- Even more details can follow.
- The test code resides in here.
- Something needs to be done in the future

This commit does not guarantee something so please be cautioned.
More details will be added in following related PRs.

PR-URL: https://github.com/tymsai/marmoym-dev-support/pulls/1
Fixes: https://github.com/tymsai/marmoym-dev-support/issues/1
Fixes: https://github.com/tymsai/marmoym-dev-support/issues/2
Refs: https://chris.beams.io/posts/git-commit/
```