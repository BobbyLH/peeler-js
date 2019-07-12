#! /bin/bash

iterate=$1
name="[PEELER-JS]"

checkBranch () {
  branch=$(git branch | grep \* | cut -d " " -f2)
  if [ "$branch" != "master" ]
  then
    echo -e "\033[31m \n Only in master branch can be publish \n \033[0m"
    exit
  fi
}

checkBranch

updateVersion () {
  versionLine=$(grep \"version\" package.json)
  version=$(echo ${versionLine} | tr -cd "[0-9].")
  subVersion=$(echo ${version##*.})
  manualVersion=$(echo "$iterate" | grep [0-9]\.[0-9]\.[0-9])

  if [ "$iterate" = "i" -o "$iterate" = "ignore" ]
  then
    echo -e "\033[33m${name}: ignore version iteration\033[0m"
  elif [ -z "$iterate" ]
  then
    echo -e "\033[36m${name}: auto version iteration\033[0m"
    newSubVersion=`expr $subVersion + 1`
    newVersion=$(echo ${version/${subVersion}/${newSubVersion}})
    newVersionLine=$(echo "${versionLine/${version}/${newVersion}}")
    sed -i "" "s/${versionLine}/${newVersionLine}/g" "package.json"
  elif [ -n "$manualVersion" ]
    then
    echo -e "\033[35m${name}: manual version iteration - ${manualVersion}\033[0m"
    newVersion=$(echo ${version/${version}/${manualVersion}})
    newVersionLine=$(echo "${versionLine/${version}/${newVersion}}")
    sed -i "" "s/${versionLine}/${newVersionLine}/g" "package.json"
  else
    echo -e "\033[41;37m${name}: please input correct version number\033[0m"
    exit
  fi
}

updateVersion

if [ $? -eq 0 ]
then
  pkjV=$(grep \"version\" package.json)
  version=$(echo ${pkjV} | tr -cd "[0-9].")
  git add -A
  git commit -m "${name}: ${version}"
  git push
  echo -e "\033[32m \ngit success: ${version}\n \033[0m"
else
  echo -e "\033[31m \ngit failed: ${version}\n \033[0m"
fi