#! /bin/bash

checkBranch () {
  branch=$(git branch | grep \* | cut -d " " -f1)
  echo ${branch}
  if [ "$branch" != "master" ]
  then 
    echo -e "\033[31m \n Only in master branch can be publish \n \033[0m"
    exit
  fi
}

# checkBranch

if [ $? -eq 0 ]
then
  pkjV=$(grep \"version\" package.json)
  version=$(echo ${pkjV} | tr -cd "[0-9].")
  name="[PEELER-JS]"
  echo ${name}
  git add -A
  git commit -m "${name}: ${version}"
  git push
  echo -e "\033[32m \ngit success: ${version}\n \033[0m"
else
  echo -e "\033[31m \ngit failed: ${version}\n \033[0m"
fi