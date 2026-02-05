#!/bin/bash
NEXT_VERSION="0.0.0"
CURRENT_VERSION="$(git describe --tags --abbrev=0)"
CURRENT_VERSION="${CURRENT_VERSION:1}"

function version_le() { test "$(echo "$@" | tr " " "\n" | sort -V | head -n 1)" == "$1"; }

if [ -n "$(git status --porcelain)" ]; then
  echo "Some changes are not committed. Exiting..."
  git status --short
  exit 1
fi
read -p "Enter new version in format x.y.z: " NEXT_VERSION

if version_le "$NEXT_VERSION" "$CURRENT_VERSION"; then
  echo "Version $NEXT_VERSION is not greater than $CURRENT_VERSION. Exiting..."
  exit 1
fi

echo "Updating from $CURRENT_VERSION to $NEXT_VERSION"
echo ""

cd $(dirname $(realpath "$0"))
cd ..

echo "Updating package.json"
jq --arg version "$NEXT_VERSION" '.version = $version' package.json > tmp.json && mv tmp.json package.json

echo "Updating app.json"
jq --arg version "$NEXT_VERSION" '.expo.version = $version' app.json > tmp.json && mv tmp.json app.json

echo "Updating android/app/build.gradle"
sed -i "s/versionName \".*\"/versionName \"$NEXT_VERSION\"/" android/app/build.gradle

echo ""

echo "Creating git commit"
git commit -am "Release $NEXT_VERSION"

echo "Creating git tag"
git tag -a "v$NEXT_VERSION" -m "Release $NEXT_VERSION"

read -p "Push to origin? (Y/N): " confirm && [[ $confirm == [yY] ]] || exit
git push --tags

echo ""
echo "Done!"
