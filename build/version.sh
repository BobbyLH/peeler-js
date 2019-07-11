iterate=$1

updateVersion () {
  versionLine=$(grep \"version\" package.json)
  version=$(echo ${versionLine} | tr -cd "[0-9].")
  subVersion=$(echo ${version##*.})
  manualVersion=$(echo "$iterate" | grep [0-9]\.[0-9]\.[0-9])

  if [ "$iterate" = "i" -o "$iterate" = "ignore" ]
  then
    echo "ignore version iteration"
  elif [ -z "$iterate" ]
  then
    echo "auto version iteration"
    newSubVersion=`expr $subVersion + 1`
    newVersion=$(echo ${version/${subVersion}/${newSubVersion}})
    newVersionLine=$(echo "${versionLine/${version}/${newVersion}}")
    sed -i "" "s/${versionLine}/${newVersionLine}/g" "package.json"
  elif [ -n "$manualVersion" ]
    then
    echo "manual version iteration"
    newVersion=$(echo ${version/${version}/${manualVersion}})
    newVersionLine=$(echo "${versionLine/${version}/${newVersion}}")
    sed -i "" "s/${versionLine}/${newVersionLine}/g" "package.json"
  else
    echo "please input correct version number"
  fi
}

updateVersion