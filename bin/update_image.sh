#!/bin/bash

LIFECYCLE=$1
COMMIT_SHA=$2


if [[ $LIFECYCLE != "dev" && $LIFECYCLE != "test" && $LIFECYCLE != "stage" && $LIFECYCLE != "main" ]]; then
    echo "INPUT ERROR: First argument must be dev/test/stage/main"
    exit 1
fi

if [[ $LIFECYCLE == "main" ]]; then
    LIFECYCLE="prod"
fi

if [[ ! $COMMIT_SHA ]]; then
    echo "INPUT ERROR: Second argument must be COMMIT_SHA"
    exit 1
fi

yq -yi ".\"web-app\".api.tag = \"$COMMIT_SHA\"" ./charts/web-app/values/$LIFECYCLE.yaml
yq -yi ".\"web-app\".nginx.tag = \"$COMMIT_SHA\"" ./charts/web-app/values/$LIFECYCLE.yaml
