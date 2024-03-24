#!/usr/bin/env bash
set -euo pipefail
# set -x

JOB_ID=$1


###
### Requirements
###

NVM_VERSION=0.39.7
NODE18_VERSION=18.19.1

echo "::group::Init github for $JOB_ID"

# Make sure package lists are up to date
sudo apt-get update && sudo apt-get --no-install-recommends --yes install curl git

# Define a TMP_DIR to operate with temp files
TMP_DIR="$RUNNER_TEMP"  # RUNNER_TEMP is Github Action specific
mkdir -p "$TMP_DIR/dl" # dl = downloaded files

# Install nvm
# NOTE: also define 'yarn' as a default package, ie. it'll be automatically
mkdir -p "$TMP_DIR/dl/nvm" && cd "$TMP_DIR/dl/nvm"
curl -OLsS https://raw.githubusercontent.com/nvm-sh/nvm/v${NVM_VERSION}/install.sh
bash ./install.sh
# define 'yarn' as a default package
# cf. https://github.com/nvm-sh/nvm?tab=readme-ov-file#default-global-packages-from-file-while-installing
bash -i -c 'echo yarn >> $NVM_DIR/default-packages'
cd ~-
# Make nvm available to script
. "$HOME/.nvm/nvm.sh"
# Install node18
bash -i -c "nvm install ${NODE18_VERSION}"

echo "::endgroup::"


###
### Init workspace
###

echo "::group::Setting up workspace ..."

WORKSPACE_DIR="/home/runner/work/passwise"
REPO_ROOT="/home/runner/work/passwise/passwise"
APP=$(node -p -e "require(\"$REPO_ROOT/package.json\").name")
VERSION=$(node -p -e "require(\"$REPO_ROOT/package.json\").version")
GIT_TAG=$(git tag --points-at)
GIT_BRANCH=$(git tag --points-at)
PROD_REGEX="^prod-v"
TEST_REGEX="^test-|-test$"
if [[ "$GIT_TAG" =~ $PROD_REGEX ]]; then
    APP_FLAVOR="prod"
else
  if [[ "$GIT_BRANCH" =~ $TEST_REGEX ]]; then
    APP_FLAVOR="test"
  else
    APP_FLAVOR="dev"
  fi
fi

echo "::endgroup::"


###
### Build container
###

IMAGE_NAME="codask/$APP"
IMAGE_TAG="$VERSION-$APP_FLAVOR"

echo "::group::Building container ..."

docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
# DOCKER_BUILDKIT is here to be able to use Dockerfile specific dockerginore (app.Dockerfile.dockerignore)
DOCKER_BUILDKIT=1 docker build \
  --build-arg APP="$APP" \
  --build-arg FLAVOR="$APP_FLAVOR" \
  -f app.Dockerfile \
  -t "$IMAGE_NAME:$IMAGE_TAG" \
  "$WORKSPACE_DIR"
docker tag "$IMAGE_NAME:$IMAGE_TAG" "$IMAGE_NAME:$APP_FLAVOR"

docker push "$IMAGE_NAME:$IMAGE_TAG"
docker push "$IMAGE_NAME:$FLAVOR"

docker logout

echo "::endgroup::"
