#!/bin/bash

# parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

# repos=( 
#   "${parent_path}/../../projects/project-1"
#   "/c/projects/project-2"
#   "/c/projects/project-3"
# )

# echo ""
# echo "Getting latest for" ${#repos[@]} "repositories using pull --rebase"

# for repo in "${repos[@]}"
# do
#   echo ""
#   echo "****** Getting latest for" ${repo} "******"
#   cd "${repo}"
#   git pull --rebase
#   echo "******************************************"
# done