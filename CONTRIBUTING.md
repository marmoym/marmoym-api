# Contributing to Marmoym
We appreciate any type of contributions from those who have interest 
in the project. There are, however, a few things of note we urge to respect.

## Language
Project `Marmoym` is maintained with officially the two languages: _English_, 
and _Korean_. It is a must, however, that the summary (first line) of issue, 
pull request, and commit log be written in _English_. Check the example, if you want to make sure.

## Issues
Acitivities with regards to _issues_ of github is our primary means of 
communication. You can add, comment, or even thoughtfully close the issue. 
Just like any social network service online, feel free to talk in _issue_
whenever you like. Checkout our code of conduct. (Doc being constructed)

## Pull Requests
Pull requests are awesome. Be sure to check the *Merge Guideline*.

## Commit Messages
Here in Marmoym, most of the commits are expected to be preceded by pull 
request. You can commit as many as you want in your forked repo, but when you
make a pull request, you may want to amend those commits to follow the
guideline. For bare minimum, see https://chris.beams.io/posts/git-commit/ as reference. 

For one thing, commit message title (first line) is 72 character long and the 
message body should be 80 characters in width.

When PR is approved by reviewers, however, following rules are expected to be 
respected.

1. Squash all your commits into one. This can either be done by github's 
`Squash and Merge` feature or in your local git. The former is encouraged
since otherwise the communication history is ruined.

2. A squahsed commit will have a commit message with the followings in it,

- **The first line (title)**
  - is in English and starts with present tense verb.
  - is followed by blank line
   
- **Body**
  - is in any language you prefer, 
  - is with concise information on what things have changed and what should 
  be taken care of in the future.

- **Meta information**  
  Meta information is written after a blank line below message _Body_. All the
  links should be in its full URL, not with hash symbol.
  - Fixes (optional)  
  `Fixes: https://github.com/tymsai/marmoym-dev-support/issues/1`
  - Refs (optianal)  
  `Refs: http://eslint.org/docs/rules/space-in-parens.html`
  - PR-URL (mandatory, last line)  
  `PR-URL: https://github.com/tymsai/marmoym-dev-support/pulls/1`
  
3.  Merge by `Squash and Merge`. This is to merge your local branch into 
develop branch then rebase that develop branch in order not to allow `merge` 
commit. When using `Squash and Merge`, please remove the Pull Request number 
in the bracket at the end of automatically generated commit message title.  
`
Commit Message Title (#N) // Delete (#N) in the title
`

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

Fixes: https://github.com/tymsai/marmoym-dev-support/issues/1
Fixes: https://github.com/tymsai/marmoym-dev-support/issues/2
Refs: https://chris.beams.io/posts/git-commit/
PR-URL: https://github.com/tymsai/marmoym-dev-support/pulls/1
```