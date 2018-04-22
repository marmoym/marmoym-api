#!/bin/bash

get_config() {
  marmoym_config_repo="git@gitlab.com:marmoym/marmoym-config.git"
  parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
  config_path="${parent_path}/../../src/config"

  if [ -d "${config_path}/marmoym-config/.git" ]; then
    echo "Rebasing marmoym-config";
    cd ${config_path}/marmoym-config;
    git checkout dev;
    git pull origin dev --rebase;
  else
    echo "Configuration is missing. It is either you are not permitted
to access the source or have not installed it yet.";
    cd ${config_path}; 
    git clone "${marmoym_config_repo}";
  fi
}

get_config